const db = require('../config/db');
const mockData = require('../seed/mockData');
const crypto = require('crypto');

// Get all pets with advanced filtering
async function getPets(filters = {}) {
  const { species, breed, age, gender, size, location, status, search } = filters;

  if (db.getIsFallback()) {
    let filteredPets = [...mockData.pets];

    if (species) filteredPets = filteredPets.filter(p => p.species.toLowerCase() === species.toLowerCase());
    if (breed) filteredPets = filteredPets.filter(p => p.breed.toLowerCase().includes(breed.toLowerCase()));
    if (age) filteredPets = filteredPets.filter(p => p.age.toLowerCase().includes(age.toLowerCase()));
    if (gender) filteredPets = filteredPets.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    if (size) filteredPets = filteredPets.filter(p => p.size.toLowerCase() === size.toLowerCase());
    if (status) filteredPets = filteredPets.filter(p => p.adoption_status.toLowerCase() === status.toLowerCase());
    
    if (location) {
      // Find shelters in this location
      const matchingShelters = mockData.shelters.filter(s => s.city.toLowerCase() === location.toLowerCase());
      const shelterIds = matchingShelters.map(s => s.id);
      filteredPets = filteredPets.filter(p => shelterIds.includes(p.shelter_id));
    }

    if (search) {
      const q = search.toLowerCase();
      filteredPets = filteredPets.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.breed.toLowerCase().includes(q) ||
        p.temperament.toLowerCase().includes(q)
      );
    }

    return filteredPets;
  }

  // PG Query Builder
  let queryText = 'SELECT p.*, s.name as shelter_name, s.city as shelter_city FROM pets p JOIN shelters s ON p.shelter_id = s.id WHERE 1=1';
  const queryParams = [];
  let paramCount = 1;

  if (species) {
    queryText += ` AND p.species = $${paramCount++}`;
    queryParams.push(species);
  }
  if (breed) {
    queryText += ` AND p.breed ILIKE $${paramCount++}`;
    queryParams.push(`%${breed}%`);
  }
  if (age) {
    queryText += ` AND p.age ILIKE $${paramCount++}`;
    queryParams.push(`%${age}%`);
  }
  if (gender) {
    queryText += ` AND p.gender = $${paramCount++}`;
    queryParams.push(gender);
  }
  if (size) {
    queryText += ` AND p.size = $${paramCount++}`;
    queryParams.push(size);
  }
  if (status) {
    queryText += ` AND p.adoption_status = $${paramCount++}`;
    queryParams.push(status);
  }
  if (location) {
    queryText += ` AND s.city ILIKE $${paramCount++}`;
    queryParams.push(location);
  }
  if (search) {
    queryText += ` AND (p.name ILIKE $${paramCount} OR p.breed ILIKE $${paramCount} OR p.temperament ILIKE $${paramCount})`;
    queryParams.push(`%${search}%`);
    paramCount++;
  }

  const result = await db.pool.query(queryText, queryParams);
  return result.rows;
}

// Get single pet details
async function getPetById(id) {
  if (db.getIsFallback()) {
    const pet = mockData.pets.find(p => p.id === id);
    if (!pet) return null;
    const shelter = mockData.shelters.find(s => s.id === pet.shelter_id);
    return { ...pet, shelter_name: shelter ? shelter.name : 'Unknown Shelter', shelter_city: shelter ? shelter.city : '' };
  }

  const queryText = `
    SELECT p.*, s.name as shelter_name, s.city as shelter_city, s.phone as shelter_phone, s.email as shelter_email
    FROM pets p 
    JOIN shelters s ON p.shelter_id = s.id 
    WHERE p.id = $1
  `;
  const result = await db.pool.query(queryText, [id]);
  return result.rows[0] || null;
}

// Create pet listing
async function createPet({ shelterId, name, species, breed, age, gender, size, temperament, healthStatus, vaccinationStatus, about, personality, idealHome, careRequirements, imageUrl }) {
  const id = crypto.randomUUID();
  const newPet = {
    id,
    shelter_id: shelterId,
    name,
    species,
    breed,
    age,
    gender,
    size,
    temperament,
    health_status: healthStatus,
    vaccination_status: vaccinationStatus,
    about,
    personality,
    ideal_home: idealHome,
    care_requirements: careRequirements,
    adoption_status: 'available',
    image_url: imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    created_at: new Date().toISOString()
  };

  if (db.getIsFallback()) {
    mockData.pets.push(newPet);
    return newPet;
  }

  const queryText = `
    INSERT INTO pets (id, shelter_id, name, species, breed, age, gender, size, temperament, health_status, vaccination_status, about, personality, ideal_home, care_requirements, adoption_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *
  `;
  const result = await db.pool.query(queryText, [
    id, shelterId, name, species, breed, age, gender, size, temperament, healthStatus, vaccinationStatus, about, personality, idealHome, careRequirements, 'available'
  ]);
  
  // Create primary pet image
  await db.pool.query('INSERT INTO pet_images (pet_id, url, is_primary) VALUES ($1, $2, true)', [id, imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1']);

  return { ...result.rows[0], image_url: imageUrl };
}

// Update pet listing
async function updatePet(id, fields) {
  if (db.getIsFallback()) {
    const index = mockData.pets.findIndex(p => p.id === id);
    if (index === -1) return null;
    mockData.pets[index] = { ...mockData.pets[index], ...fields };
    return mockData.pets[index];
  }

  // Build SQL set fields dynamic query
  const setClauses = [];
  const queryParams = [];
  let paramCount = 1;

  for (const [key, val] of Object.entries(fields)) {
    // Map camelCase to snake_case if necessary
    const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    setClauses.push(`${dbKey} = $${paramCount++}`);
    queryParams.push(val);
  }

  if (setClauses.length === 0) return getPetById(id);

  queryParams.push(id);
  const queryText = `UPDATE pets SET ${setClauses.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await db.pool.query(queryText, queryParams);
  return result.rows[0];
}

// Delete pet listing
async function deletePet(id) {
  if (db.getIsFallback()) {
    const index = mockData.pets.findIndex(p => p.id === id);
    if (index === -1) return false;
    mockData.pets.splice(index, 1);
    return true;
  }

  const result = await db.pool.query('DELETE FROM pets WHERE id = $1', [id]);
  return result.rowCount > 0;
}

// Get user favorites
async function getFavorites(userId) {
  if (db.getIsFallback()) {
    const favPetIds = mockData.favorites.filter(f => f.user_id === userId).map(f => f.pet_id);
    return mockData.pets.filter(p => favPetIds.includes(p.id));
  }

  const result = await db.pool.query(`
    SELECT p.* FROM pets p
    JOIN favorites f ON p.id = f.pet_id
    WHERE f.user_id = $1
  `, [userId]);
  return result.rows;
}

// Add favorite
async function addFavorite(userId, petId) {
  if (db.getIsFallback()) {
    const exists = mockData.favorites.some(f => f.user_id === userId && f.pet_id === petId);
    if (!exists) {
      mockData.favorites.push({ user_id: userId, pet_id: petId });
    }
    return true;
  }

  try {
    await db.pool.query('INSERT INTO favorites (user_id, pet_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [userId, petId]);
    return true;
  } catch (error) {
    return false;
  }
}

// Remove favorite
async function removeFavorite(userId, petId) {
  if (db.getIsFallback()) {
    mockData.favorites = mockData.favorites.filter(f => !(f.user_id === userId && f.pet_id === petId));
    return true;
  }

  const result = await db.pool.query('DELETE FROM favorites WHERE user_id = $1 AND pet_id = $2', [userId, petId]);
  return result.rowCount > 0;
}

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getFavorites,
  addFavorite,
  removeFavorite
};
