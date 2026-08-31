const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/dashboard', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.getDashboard);
router.get('/pets', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.getMyPets);
router.get('/applications', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.getApplications);
router.put('/applications/:id/status', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.updateAppStatus);
router.put('/profile', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.updateProfile);

module.exports = router;
