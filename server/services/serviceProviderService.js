const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

// Get all service providers filtered
async function getProviders(filters = {}) {
  const { type, location } = filters;

  if (db.getIsFallback()) {
    let list = [...mockData.serviceProviders];
    if (type) list = list.filter(p => p.type === type);
    if (location) list = list.filter(p => p.location.toLowerCase() === location.toLowerCase());
    return list;
  }

  let queryText = 'SELECT * FROM service_providers WHERE 1=1';
  const queryParams = [];
  let paramCount = 1;

  if (type) {
    queryText += ` AND type = $${paramCount++}`;
    queryParams.push(type);
  }
  if (location) {
    queryText += ` AND location ILIKE $${paramCount++}`;
    queryParams.push(location);
  }

  const result = await db.pool.query(queryText, queryParams);
  return result.rows;
}

// Get single provider
async function getProviderById(id) {
  if (db.getIsFallback()) {
    const provider = mockData.serviceProviders.find(p => p.id === id);
    if (!provider) return null;
    const providerReviews = mockData.reviews.filter(r => r.provider_id === id);
    return { ...provider, reviews: providerReviews };
  }

  const providerRes = await db.pool.query('SELECT * FROM service_providers WHERE id = $1', [id]);
  const provider = providerRes.rows[0];
  if (!provider) return null;

  const reviewsRes = await db.pool.query(`
    SELECT r.*, u.name as user_name FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.provider_id = $1
    ORDER BY r.created_at DESC
  `, [id]);
  
  return { ...provider, reviews: reviewsRes.rows };
}

// Create Booking
async function createBooking(userId, { providerId, petType, serviceType, startDate, endDate, totalPrice }) {
  const id = crypto.randomUUID();
  const newBooking = {
    id,
    provider_id: providerId,
    user_id: userId,
    pet_type: petType,
    service_type: serviceType,
    start_date: startDate,
    end_date: endDate,
    status: 'pending',
    total_price: parseFloat(totalPrice),
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.serviceBookings.push(newBooking);

    // Auto-create notification for provider/adopter
    mockData.notifications.push({
      id: crypto.randomUUID(),
      user_id: userId,
      title: 'Booking Request Received',
      message: `Your booking request for ${serviceType} has been submitted. Status: Pending.`,
      read: false,
      created_at: new Date().toISOString()
    });

    return newBooking;
  }

  const queryText = `
    INSERT INTO service_bookings (id, provider_id, user_id, pet_type, service_type, start_date, end_date, total_price)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [
    id, providerId, userId, petType, serviceType, startDate, endDate, parseFloat(totalPrice)
  ]);

  // Create notifications
  try {
    await db.pool.query(
      'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
      [userId, 'Booking Request Received', `Your booking request for ${serviceType} has been submitted. Status: Pending.`]
    );
  } catch (err) {
    console.error(err);
  }

  return result.rows[0];
}

// Get Bookings
async function getBookings(userId) {
  if (db.getIsFallback()) {
    const userBookings = mockData.serviceBookings.filter(b => b.user_id === userId);
    return userBookings.map(b => {
      const provider = mockData.serviceProviders.find(p => p.id === b.provider_id);
      return {
        ...b,
        provider_name: provider ? provider.name : 'Unknown Caregiver',
        provider_image: provider ? provider.image_url : ''
      };
    });
  }

  const queryText = `
    SELECT b.*, p.name as provider_name, p.image_url as provider_image
    FROM service_bookings b
    JOIN service_providers p ON b.provider_id = p.id
    WHERE b.user_id = $1
    ORDER BY b.created_at DESC
  `;
  const result = await db.pool.query(queryText, [userId]);
  return result.rows;
}

// Create Review
async function createReview(userId, { providerId, rating, comment }) {
  const id = crypto.randomUUID();
  const newReview = {
    id,
    provider_id: providerId,
    user_id: userId,
    rating: parseInt(rating),
    comment,
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.reviews.push(newReview);
    
    // Update provider average rating
    const provider = mockData.serviceProviders.find(p => p.id === providerId);
    if (provider) {
      const providerReviews = mockData.reviews.filter(r => r.provider_id === providerId);
      const sum = providerReviews.reduce((acc, curr) => acc + curr.rating, 0);
      provider.rating = parseFloat((sum / providerReviews.length).toFixed(2));
    }

    return newReview;
  }

  const queryText = `
    INSERT INTO reviews (id, provider_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, providerId, userId, parseInt(rating), comment]);

  // Recalculate provider rating in DB
  try {
    const avgRes = await db.pool.query('SELECT AVG(rating) as avg_rating FROM reviews WHERE provider_id = $1', [providerId]);
    const avgRating = parseFloat(avgRes.rows[0].avg_rating || 0).toFixed(2);
    await db.pool.query('UPDATE service_providers SET rating = $1 WHERE id = $2', [avgRating, providerId]);
  } catch (err) {
    console.error(err);
  }

  return result.rows[0];
}

module.exports = {
  getProviders,
  getProviderById,
  createBooking,
  getBookings,
  createReview
};
