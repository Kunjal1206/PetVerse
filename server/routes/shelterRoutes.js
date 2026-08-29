const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/stats', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.getDashboardStats);
router.put('/profile', authMiddleware, roleMiddleware(['shelter', 'admin']), shelterController.updateProfile);

module.exports = router;
