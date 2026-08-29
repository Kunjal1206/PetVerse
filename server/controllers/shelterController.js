const authService = require('../services/authService');
const petService = require('../services/petService');
const adoptionService = require('../services/adoptionService');

async function getDashboardStats(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found.' });
    }

    const pets = await petService.getPets({ status: null }); // Get all status pets
    const shelterPets = pets.filter(p => p.shelter_id === shelter.id);

    const totalPets = shelterPets.length;
    const availablePets = shelterPets.filter(p => p.adoption_status === 'available').length;
    const pendingPets = shelterPets.filter(p => p.adoption_status === 'pending').length;
    const adoptedPets = shelterPets.filter(p => p.adoption_status === 'adopted').length;

    const applications = await adoptionService.getApplications({ shelterId: shelter.id });
    const pendingApplications = applications.filter(a => a.status === 'pending' || a.status === 'under_review').length;

    res.json({
      shelter,
      stats: {
        totalPets,
        availablePets,
        pendingPets,
        adoptedPets,
        totalApplications: applications.length,
        pendingApplications
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found.' });
    }

    // In fallback mode, we update the object directly. In PG mode, we write an update query.
    // For simplicity, let's write standard JS updater that handles fallback.
    const { name, description, address, city, phone, email, website } = req.body;
    
    // We'll update properties
    const fieldsToUpdate = { name, description, address, city, phone, email, website };
    
    const db = require('../config/db');
    let updatedShelter;

    if (db.getIsFallback()) {
      const mockData = require('../seed/mockData');
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
  getDashboardStats,
  updateProfile
};
