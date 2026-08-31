const express = require('express');
const router = express.Router();
const lostFoundController = require('../controllers/lostFoundController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', lostFoundController.getReports);
router.post('/report', authMiddleware, lostFoundController.createReport);
router.put('/report/:id/resolve', authMiddleware, lostFoundController.resolveReport);

module.exports = router;
