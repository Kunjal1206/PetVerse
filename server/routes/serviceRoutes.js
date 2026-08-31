const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/providers', serviceController.getProviders);
router.get('/providers/:id', serviceController.getProviderById);

router.post('/bookings', authMiddleware, serviceController.createBooking);
router.get('/bookings', authMiddleware, serviceController.getBookings);
router.post('/reviews/:providerId', authMiddleware, serviceController.createReview);

module.exports = router;
