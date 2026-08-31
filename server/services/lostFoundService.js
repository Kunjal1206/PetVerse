const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

async function getReports(filters = {}) {
  const { type, species, location } = filters;

  if (db.getIsFallback()) {
    let list = [...mockData.lostFoundReports];
    if (type) list = list.filter(r => r.type === type);
    if (species) list = list.filter(r => r.species === species);
    if (location) list = list.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));
    
    // Sort by newest
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  let queryText = 'SELECT * FROM lost_found_reports WHERE 1=1';
  const queryParams = [];
  let paramCount = 1;

  if (type) {
    queryText += ` AND type = $${paramCount++}`;
    queryParams.push(type);
  }
  if (species) {
    queryText += ` AND species = $${paramCount++}`;
    queryParams.push(species);
  }
  if (location) {
    queryText += ` AND location ILIKE $${paramCount++}`;
    queryParams.push(`%${location}%`);
  }

  queryText += ' ORDER BY created_at DESC';

  const result = await db.pool.query(queryText, queryParams);
  return result.rows;
}

async function createReport(userId, { type, petName, species, breed, color, location, latitude, longitude, date, description, contactInfo, imageUrl }) {
  const id = crypto.randomUUID();
  const newReport = {
    id,
    user_id: userId,
    type,
    pet_name: petName || null,
    species,
    breed: breed || '',
    color: color || '',
    location,
    latitude: latitude ? parseFloat(latitude) : null,
    longitude: longitude ? parseFloat(longitude) : null,
    date,
    description: description || '',
    contact_info: contactInfo,
    image_url: imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300',
    status: 'active',
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.lostFoundReports.push(newReport);
    return newReport;
  }

  const queryText = `
    INSERT INTO lost_found_reports (id, user_id, type, pet_name, species, breed, color, location, latitude, longitude, date, description, contact_info, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [
    id, userId, type, petName || null, species, breed || null, color || null, location,
    latitude ? parseFloat(latitude) : null, longitude ? parseFloat(longitude) : null,
    date, description || '', contactInfo, imageUrl || null
  ]);
  return result.rows[0];
}

async function resolveReport(id) {
  if (db.getIsFallback()) {
    const report = mockData.lostFoundReports.find(r => r.id === id);
    if (report) {
      report.status = 'resolved';
      return report;
    }
    return null;
  }

  const result = await db.pool.query(
    "UPDATE lost_found_reports SET status = 'resolved' WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
  getReports,
  createReport,
  resolveReport
};
