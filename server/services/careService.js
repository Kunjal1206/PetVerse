const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

// User Pets (My Pet Manager)
async function getUserPets(userId) {
  if (db.getIsFallback()) {
    return mockData.userPets.filter(p => p.user_id === userId);
  }

  const result = await db.pool.query('SELECT * FROM user_pets WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
}

async function addUserPet(userId, { name, species, breed, dob, gender, weight, photoUrl, medicalNotes, vaccinationStatus }) {
  const id = crypto.randomUUID();
  const newPet = {
    id,
    user_id: userId,
    name,
    species,
    breed,
    dob: dob || null,
    gender,
    weight: weight ? parseFloat(weight) : null,
    photo_url: photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300',
    medical_notes: medicalNotes || '',
    vaccination_status: vaccinationStatus || '',
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.userPets.push(newPet);
    return newPet;
  }

  const queryText = `
    INSERT INTO user_pets (id, user_id, name, species, breed, dob, gender, weight, photo_url, medical_notes, vaccination_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [
    id, userId, name, species, breed, dob || null, gender, weight ? parseFloat(weight) : null, photoUrl || null, medicalNotes || '', vaccinationStatus || ''
  ]);
  return result.rows[0];
}

async function deleteUserPet(id) {
  if (db.getIsFallback()) {
    const index = mockData.userPets.findIndex(p => p.id === id);
    if (index === -1) return false;
    mockData.userPets.splice(index, 1);
    // Remove linked reminders
    mockData.healthReminders = mockData.healthReminders.filter(r => r.user_pet_id !== id);
    return true;
  }

  const result = await db.pool.query('DELETE FROM user_pets WHERE id = $1', [id]);
  return result.rowCount > 0;
}

// Reminders
async function getReminders(userId) {
  if (db.getIsFallback()) {
    const list = mockData.healthReminders.filter(r => r.user_id === userId);
    return list.map(r => {
      const pet = mockData.userPets.find(p => p.id === r.user_pet_id);
      return { ...r, pet_name: pet ? pet.name : 'All Pets' };
    });
  }

  const queryText = `
    SELECT r.*, p.name as pet_name 
    FROM health_reminders r
    LEFT JOIN user_pets p ON r.user_pet_id = p.id
    WHERE r.user_id = $1
    ORDER BY r.due_date ASC
  `;
  const result = await db.pool.query(queryText, [userId]);
  return result.rows;
}

async function addReminder({ userPetId, userId, type, title, notes, dueDate }) {
  const id = crypto.randomUUID();
  const newReminder = {
    id,
    user_pet_id: userPetId || null,
    user_id: userId,
    type,
    title,
    notes,
    due_date: new Date(dueDate).toISOString(),
    completed: false,
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.healthReminders.push(newReminder);
    return newReminder;
  }

  const queryText = `
    INSERT INTO health_reminders (id, user_pet_id, user_id, type, title, notes, due_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [id, userPetId || null, userId, type, title, notes, dueDate]);
  return result.rows[0];
}

async function updateReminder(id, fields) {
  if (db.getIsFallback()) {
    const index = mockData.healthReminders.findIndex(r => r.id === id);
    if (index === -1) return null;
    mockData.healthReminders[index] = { ...mockData.healthReminders[index], ...fields };
    return mockData.healthReminders[index];
  }

  const setClauses = [];
  const queryParams = [];
  let paramCount = 1;

  for (const [key, val] of Object.entries(fields)) {
    setClauses.push(`${key} = $${paramCount++}`);
    queryParams.push(val);
  }

  if (setClauses.length === 0) return null;

  queryParams.push(id);
  const queryText = `UPDATE health_reminders SET ${setClauses.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await db.pool.query(queryText, queryParams);
  return result.rows[0];
}

async function deleteReminder(id) {
  if (db.getIsFallback()) {
    const index = mockData.healthReminders.findIndex(r => r.id === id);
    if (index === -1) return false;
    mockData.healthReminders.splice(index, 1);
    return true;
  }

  const result = await db.pool.query('DELETE FROM health_reminders WHERE id = $1', [id]);
  return result.rowCount > 0;
}

module.exports = {
  getUserPets,
  addUserPet,
  deleteUserPet,
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder
};
