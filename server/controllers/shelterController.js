const authService = require('../services/authService');
const petService = require('../services/petService');
const adoptionService = require('../services/adoptionService');
const mockData = require('../seed/mockData');
const db = require('../config/db');

// Get Shelter Dashboard (Stats + Recent Applications)
async function getDashboard(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    const shelterId = shelter ? shelter.id : '20000000-0000-0000-0000-000000000001';

    const allPets = await petService.getPets({ status: null });
    const shelterPets = allPets.filter(p => p.shelter_id === shelterId);

    const totalPets = shelterPets.length;
    const availablePets = shelterPets.filter(p => p.adoption_status === 'available').length;
    const pendingPets = shelterPets.filter(p => p.adoption_status === 'pending').length;
    const completedAdoptions = shelterPets.filter(p => p.adoption_status === 'adopted').length;

    const allApps = await adoptionService.getApplications({ shelterId });
    const pendingReviews = allApps.filter(a => a.status === 'pending' || a.status === 'under_review').length;

    res.json({
      shelter,
      stats: {
        totalPets,
        availablePets,
        pendingPets,
        totalApplications: allApps.length,
        pendingReviews,
        completedAdoptions
      },
      recentApplications: allApps.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
}

// Get Shelter Pets
async function getMyPets(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    const shelterId = shelter ? shelter.id : '20000000-0000-0000-0000-000000000001';

    const allPets = await petService.getPets({ status: null });
    const shelterPets = allPets.filter(p => p.shelter_id === shelterId);

    res.json(shelterPets);
  } catch (error) {
    next(error);
  }
}

// Get Shelter Applications
async function getApplications(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    const shelterId = shelter ? shelter.id : '20000000-0000-0000-0000-000000000001';

    const apps = await adoptionService.getApplications({
      shelterId,
      status: req.query.status || null
    });

    res.json(apps);
  } catch (error) {
    next(error);
  }
}

// Update Application Status
async function updateAppStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await adoptionService.updateApplicationStatus(id, status);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// Update Profile
async function updateProfile(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found.' });
    }

    const { name, description, address, city, phone, email, website } = req.body;
    const fieldsToUpdate = { name, description, address, city, phone, email, website };
    let updatedShelter;

    if (db.getIsFallback()) {
      const idx = mockData.shelters.findIndex(s => s.id === shelter.id);
      if (idx !== -1) {
        mockData.shelters[idx] = { ...mockData.shelters[idx], ...fieldsToUpdate };
        updatedShelter = mockData.shelters[idx];
      }
    } else {
      const setClauses = [];
      const queryParams = [];
      let paramCount = 1;

      for (const [key, val] of Object.entries(fieldsToUpdate)) {
        if (val !== undefined) {
          setClauses.push(`${key} = $${paramCount++}`);
          queryParams.push(val);
        }
      }
      
      if (setClauses.length > 0) {
        queryParams.push(shelter.id);
        const queryText = `UPDATE shelters SET ${setClauses.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        const result = await db.pool.query(queryText, queryParams);
        updatedShelter = result.rows[0];
      } else {
        updatedShelter = shelter;
      }
    }

    res.json(updatedShelter);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboard,
  getMyPets,
  getApplications,
  updateAppStatus,
  updateProfile
};
