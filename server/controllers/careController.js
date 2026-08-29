const careService = require('../services/careService');

// User Pets
async function getPets(req, res, next) {
  try {
    const list = await careService.getUserPets(req.user.id);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function addPet(req, res, next) {
  try {
    const newPet = await careService.addUserPet(req.user.id, req.body);
    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
}

async function deletePet(req, res, next) {
  try {
    const success = await careService.deleteUserPet(req.params.id);
    if (success) {
      res.json({ message: 'Pet removed successfully.' });
    } else {
      res.status(404).json({ message: 'Pet not found.' });
    }
  } catch (error) {
    next(error);
  }
}

// Reminders
async function getReminders(req, res, next) {
  try {
    const list = await careService.getReminders(req.user.id);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function addReminder(req, res, next) {
  try {
    const { userPetId, type, title, notes, dueDate } = req.body;
    if (!type || !title || !dueDate) {
      return res.status(400).json({ message: 'Type, title, and due date are required.' });
    }

    const reminder = await careService.addReminder({
      userPetId,
      userId: req.user.id,
      type,
      title,
      notes,
      dueDate
    });
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
}

async function updateReminder(req, res, next) {
  try {
    const reminder = await careService.updateReminder(req.params.id, req.body);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found.' });
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
}

async function deleteReminder(req, res, next) {
  try {
    const success = await careService.deleteReminder(req.params.id);
    if (success) {
      res.json({ message: 'Reminder deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Reminder not found.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPets,
  addPet,
  deletePet,
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder
};
