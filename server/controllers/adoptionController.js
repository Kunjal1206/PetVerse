const adoptionService = require('../services/adoptionService');
const authService = require('../services/authService');
const petService = require('../services/petService');

// Submit an application
async function apply(req, res, next) {
  try {
    const { petId, answers } = req.body;

    if (!petId || !answers) {
      return res.status(400).json({ message: 'Pet ID and questionnaire answers are required.' });
    }

    // Verify pet exists and is available
    const pet = await petService.getPetById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }
    if (pet.adoption_status !== 'available') {
      return res.status(400).json({ message: 'This pet is not currently available for adoption.' });
    }

    const application = await adoptionService.createApplication({
      petId,
      userId: req.user.id,
      answers
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
}

// Get user or shelter applications
async function getApplications(req, res, next) {
  try {
    let applications;

    if (req.user.role === 'adopter') {
      applications = await adoptionService.getApplications({ userId: req.user.id });
    } else if (req.user.role === 'shelter') {
      const shelter = await authService.getShelterByUserId(req.user.id);
      if (!shelter) {
        return res.status(404).json({ message: 'Shelter profile not found.' });
      }
      applications = await adoptionService.getApplications({ shelterId: shelter.id });
    } else if (req.user.role === 'admin') {
      applications = await adoptionService.getApplications(); // All applications
    }

    res.json(applications);
  } catch (error) {
    next(error);
  }
}

// Get single application details
async function getApplicationById(req, res, next) {
  try {
    const application = await adoptionService.getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    // Access control: only owner, shelter of pet, or admin can view
    if (req.user.role === 'adopter' && application.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    if (req.user.role === 'shelter') {
      const shelter = await authService.getShelterByUserId(req.user.id);
      const pet = await petService.getPetById(application.pet_id);
      if (!shelter || !pet || pet.shelter_id !== shelter.id) {
        return res.status(403).json({ message: 'Access denied.' });
      }
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
}

// Update status (shelter/admin only)
async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }

    const application = await adoptionService.getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    // Verify shelter owns the pet
    if (req.user.role === 'shelter') {
      const shelter = await authService.getShelterByUserId(req.user.id);
      const pet = await petService.getPetById(application.pet_id);
      if (!shelter || !pet || pet.shelter_id !== shelter.id) {
        return res.status(403).json({ message: 'You do not have permission to manage this application.' });
      }
    }

    const updatedApp = await adoptionService.updateApplicationStatus(req.params.id, status);
    res.json(updatedApp);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  apply,
  getApplications,
  getApplicationById,
  updateStatus
};
