const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);

// Protected routes (favorites)
router.get('/favorites/all', authMiddleware, petController.getFavorites);
router.post('/favorites/:petId', authMiddleware, petController.addFavorite);
router.delete('/favorites/:petId', authMiddleware, petController.removeFavorite);

// Protected listings (Shelter/Admin only)
router.post('/', authMiddleware, roleMiddleware(['shelter', 'admin']), petController.createPet);
router.put('/:id', authMiddleware, roleMiddleware(['shelter', 'admin']), petController.updatePet);
router.delete('/:id', authMiddleware, roleMiddleware(['shelter', 'admin']), petController.deletePet);

module.exports = router;
