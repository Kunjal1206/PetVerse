const petService = require('../services/petService');
const authService = require('../services/authService');

// Get all pets
async function getPets(req, res, next) {
  try {
    const filters = {
      species: req.query.species,
      breed: req.query.breed,
      age: req.query.age,
      gender: req.query.gender,
      size: req.query.size,
      location: req.query.location,
      status: req.query.status || 'available', // Default to available pets only
      search: req.query.search
    };
    const pets = await petService.getPets(filters);
    res.json(pets);
  } catch (error) {
    next(error);
  }
}

// Get single pet
async function getPetById(req, res, next) {
  try {
    const pet = await petService.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }
    res.json(pet);
  } catch (error) {
    next(error);
  }
}

// Create pet listing (shelter only)
async function createPet(req, res, next) {
  try {
    const shelter = await authService.getShelterByUserId(req.user.id);
    if (!shelter) {
      return res.status(403).json({ message: 'Only registered shelters can list pets.' });
    }

    const { name, species, breed, age, gender, size, temperament, healthStatus, vaccinationStatus, about, personality, idealHome, careRequirements, imageUrl } = req.body;

    if (!name || !species || !breed || !age || !gender || !size || !temperament) {
      return res.status(400).json({ message: 'Required fields: name, species, breed, age, gender, size, temperament.' });
    }

    const newPet = await petService.createPet({
      shelterId: shelter.id,
      name,
      species,
      breed,
      age,
      gender,
      size,
      temperament,
      healthStatus,
      vaccinationStatus,
      about,
      personality,
      idealHome,
      careRequirements,
      imageUrl
    });

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
}

// Update pet (shelter/admin only)
async function updatePet(req, res, next) {
  try {
    const pet = await petService.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }

    // Verify ownership
    if (req.user.role === 'shelter') {
      const shelter = await authService.getShelterByUserId(req.user.id);
      if (!shelter || pet.shelter_id !== shelter.id) {
        return res.status(403).json({ message: 'You do not own this pet listing.' });
      }
    }

    const updatedPet = await petService.updatePet(req.params.id, req.body);
    res.json(updatedPet);
  } catch (error) {
    next(error);
  }
}

// Delete pet (shelter/admin only)
async function deletePet(req, res, next) {
  try {
    const pet = await petService.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }

    // Verify ownership
    if (req.user.role === 'shelter') {
      const shelter = await authService.getShelterByUserId(req.user.id);
      if (!shelter || pet.shelter_id !== shelter.id) {
        return res.status(403).json({ message: 'You do not own this pet listing.' });
      }
    }

    const success = await petService.deletePet(req.params.id);
    if (success) {
      res.json({ message: 'Pet listing deleted successfully.' });
    } else {
      res.status(500).json({ message: 'Failed to delete pet.' });
    }
  } catch (error) {
    next(error);
  }
}

// Favorites
async function getFavorites(req, res, next) {
  try {
    const list = await petService.getFavorites(req.user.id);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function addFavorite(req, res, next) {
  try {
    const success = await petService.addFavorite(req.user.id, req.params.petId);
    if (success) {
      res.json({ message: 'Pet added to favorites.' });
    } else {
      res.status(400).json({ message: 'Failed to add pet to favorites.' });
    }
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const success = await petService.removeFavorite(req.user.id, req.params.petId);
    if (success) {
      res.json({ message: 'Pet removed from favorites.' });
    } else {
      res.status(400).json({ message: 'Failed to remove pet from favorites.' });
    }
  } catch (error) {
    next(error);
  }
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
