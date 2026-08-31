const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/apply', authMiddleware, roleMiddleware(['adopter', 'admin']), adoptionController.apply);
router.get('/applications', authMiddleware, adoptionController.getApplications);
router.get('/applications/:id', authMiddleware, adoptionController.getApplicationById);
router.put('/applications/:id', authMiddleware, roleMiddleware(['shelter', 'admin']), adoptionController.updateStatus);

module.exports = router;
