const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

async function createApplication({ petId, userId, answers }) {
  const id = crypto.randomUUID();
  const newApplication = {
    id,
    pet_id: petId,
    user_id: userId,
    status: 'pending',
    answers,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.adoptionApplications.push(newApplication);
    
    // Auto add notification to shelter
    const pet = mockData.pets.find(p => p.id === petId);
    if (pet) {
      const shelter = mockData.shelters.find(s => s.id === pet.shelter_id);
      if (shelter) {
        mockData.notifications.push({
          id: crypto.randomUUID(),
          user_id: shelter.user_id,
          title: 'New Application Received',
          message: `You have received a new adoption application for ${pet.name}.`,
          read: false,
          created_at: new Date().toISOString()
        });
      }
    }

    return newApplication;
  }

  const queryText = `
    INSERT INTO adoption_applications (id, pet_id, user_id, answers)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, petId, userId, JSON.stringify(answers)]);

  // Notify Shelter via Database
  try {
    const shelterRes = await db.pool.query(`
      SELECT s.user_id, p.name FROM pets p 
      JOIN shelters s ON p.shelter_id = s.id 
      WHERE p.id = $1
    `, [petId]);
    
    if (shelterRes.rowCount > 0) {
      const shelterUser = shelterRes.rows[0].user_id;
      const petName = shelterRes.rows[0].name;
      await db.pool.query(
        'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
        [shelterUser, 'New Application Received', `You have received a new adoption application for ${petName}.`]
      );
    }
  } catch (err) {
    console.error('Failed to create notification:', err);
  }

  return result.rows[0];
}

async function getApplications(filters = {}) {
  const { userId, shelterId } = filters;

  if (db.getIsFallback()) {
    let list = [...mockData.adoptionApplications];
    if (userId) {
      list = list.filter(a => a.user_id === userId);
    }
    if (shelterId) {
      // Get all pets in the shelter
      const petIds = mockData.pets.filter(p => p.shelter_id === shelterId).map(p => p.id);
      list = list.filter(a => petIds.includes(a.pet_id));
    }
    
    // Populate pet details and user details
    return list.map(a => {
      const pet = mockData.pets.find(p => p.id === a.pet_id);
      const user = mockData.users.find(u => u.id === a.user_id);
      return {
        ...a,
        pet_name: pet ? pet.name : 'Unknown Pet',
        pet_breed: pet ? pet.breed : '',
        pet_image: pet ? pet.image_url : '',
        user_name: user ? user.name : 'Unknown User',
        user_email: user ? user.email : ''
      };
    });
  }

  let queryText = `
    SELECT a.*, p.name as pet_name, p.breed as pet_breed, u.name as user_name, u.email as user_email
    FROM adoption_applications a
    JOIN pets p ON a.pet_id = p.id
    JOIN users u ON a.user_id = u.id
  `;
  const queryParams = [];

  if (userId) {
    queryText += ` WHERE a.user_id = $1`;
    queryParams.push(userId);
  } else if (shelterId) {
    queryText += ` WHERE p.shelter_id = $1`;
    queryParams.push(shelterId);
  }

  queryText += ' ORDER BY a.created_at DESC';

  const result = await db.pool.query(queryText, queryParams);
  return result.rows;
}

async function getApplicationById(id) {
  if (db.getIsFallback()) {
    const a = mockData.adoptionApplications.find(app => app.id === id);
    if (!a) return null;
    const pet = mockData.pets.find(p => p.id === a.pet_id);
    const user = mockData.users.find(u => u.id === a.user_id);
    return {
      ...a,
      pet_name: pet ? pet.name : 'Unknown Pet',
      pet_breed: pet ? pet.breed : '',
      user_name: user ? user.name : 'Unknown User',
      user_email: user ? user.email : '',
      user_phone: user ? user.phone : ''
    };
  }

  const queryText = `
    SELECT a.*, p.name as pet_name, p.breed as pet_breed, u.name as user_name, u.email as user_email, u.phone as user_phone
    FROM adoption_applications a
    JOIN pets p ON a.pet_id = p.id
    JOIN users u ON a.user_id = u.id
    WHERE a.id = $1
  `;
  const result = await db.pool.query(queryText, [id]);
  return result.rows[0] || null;
}

async function updateApplicationStatus(id, status) {
  if (db.getIsFallback()) {
    const index = mockData.adoptionApplications.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    mockData.adoptionApplications[index].status = status;
    mockData.adoptionApplications[index].updated_at = new Date().toISOString();
    
    const app = mockData.adoptionApplications[index];
    const pet = mockData.pets.find(p => p.id === app.pet_id);
    
    // Auto trigger pet status updates on completion/approval
    if (pet) {
      if (status === 'completed') {
        pet.adoption_status = 'adopted';
      } else if (status === 'approved') {
        pet.adoption_status = 'pending';
      } else if (status === 'rejected') {
        pet.adoption_status = 'available';
      }
    }

    // Notify User
    mockData.notifications.push({
      id: crypto.randomUUID(),
      user_id: app.user_id,
      title: `Adoption Status Updated`,
      message: `Your application for ${pet ? pet.name : 'your chosen pet'} has been marked as ${status.replace('_', ' ')}.`,
      read: false,
      created_at: new Date().toISOString()
    });

    return app;
  }

  const result = await db.pool.query(
    'UPDATE adoption_applications SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, id]
  );

  if (result.rowCount > 0) {
    const app = result.rows[0];
    
    // Update pet status
    if (status === 'completed') {
      await db.pool.query("UPDATE pets SET adoption_status = 'adopted' WHERE id = $1", [app.pet_id]);
    } else if (status === 'approved') {
      await db.pool.query("UPDATE pets SET adoption_status = 'pending' WHERE id = $1", [app.pet_id]);
    }

    // Create Notification
    try {
      const petRes = await db.pool.query('SELECT name FROM pets WHERE id = $1', [app.pet_id]);
      const petName = petRes.rowCount > 0 ? petRes.rows[0].name : 'pet';
      await db.pool.query(
        'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
        [app.user_id, 'Adoption Status Updated', `Your application for ${petName} is marked as ${status.replace('_', ' ')}.`]
      );
    } catch (err) {
      console.error(err);
    }
  }

  return result.rows[0] || null;
}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus
};
