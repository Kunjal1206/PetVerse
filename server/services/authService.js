const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

// Get user by email
async function getUserByEmail(email) {
  if (db.getIsFallback()) {
    return mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  const result = await db.pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

// Get user by ID
async function getUserById(id) {
  if (db.getIsFallback()) {
    return mockData.users.find(u => u.id === id) || null;
  }

  const result = await db.pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Create user
async function createUser({ email, passwordHash, role, name, phone, location }) {
  const id = crypto.randomUUID();
  const newUser = { id, email, password_hash: passwordHash, role, name, phone, location, created_at: new Date().toISOString() };

  if (db.getIsFallback()) {
    mockData.users.push(newUser);
    return newUser;
  }

  const queryText = `
    INSERT INTO users (id, email, password_hash, role, name, phone, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, email, passwordHash, role, name, phone, location]);
  return result.rows[0];
}

// Get shelter by user ID
async function getShelterByUserId(userId) {
  if (db.getIsFallback()) {
    return mockData.shelters.find(s => s.user_id === userId) || null;
  }

  const result = await db.pool.query('SELECT * FROM shelters WHERE user_id = $1', [userId]);
  return result.rows[0] || null;
}

// Get shelter by ID
async function getShelterById(shelterId) {
  if (db.getIsFallback()) {
    return mockData.shelters.find(s => s.id === shelterId) || null;
  }

  const result = await db.pool.query('SELECT * FROM shelters WHERE id = $1', [shelterId]);
  return result.rows[0] || null;
}

// Get all shelters
async function getAllShelters() {
  if (db.getIsFallback()) {
    return mockData.shelters;
  }

  const result = await db.pool.query('SELECT * FROM shelters');
  return result.rows;
}

// Create shelter
async function createShelter({ userId, name, description, address, city, phone, email, website }) {
  const id = crypto.randomUUID();
  const newShelter = {
    id,
    user_id: userId,
    name,
    description,
    address,
    city,
    phone,
    email,
    website,
    verified: false,
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.shelters.push(newShelter);
    return newShelter;
  }

  const queryText = `
    INSERT INTO shelters (id, user_id, name, description, address, city, phone, email, website)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, userId, name, description, address, city, phone, email, website]);
  return result.rows[0];
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getShelterByUserId,
  getShelterById,
  getAllShelters,
  createShelter
};
