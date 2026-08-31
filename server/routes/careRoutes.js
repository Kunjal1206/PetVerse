const express = require('express');
const router = express.Router();
const careController = require('../controllers/careController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/pets', authMiddleware, careController.getPets);
router.post('/pets', authMiddleware, careController.addPet);
router.delete('/pets/:id', authMiddleware, careController.deletePet);

router.get('/reminders', authMiddleware, careController.getReminders);
router.post('/reminders', authMiddleware, careController.addReminder);
router.put('/reminders/:id', authMiddleware, careController.updateReminder);
router.delete('/reminders/:id', authMiddleware, careController.deleteReminder);

module.exports = router;
