const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const db = require('../config/db');
const mockData = require('../seed/mockData');

// GET admin statistics
router.get('/stats', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    if (db.getIsFallback()) {
      return res.json({
        totalUsers: mockData.users.length,
        totalShelters: mockData.shelters.length,
        totalPets: mockData.pets.length,
        totalApplications: mockData.adoptionApplications.length,
        totalReports: mockData.lostFoundReports.length,
        totalBookings: mockData.serviceBookings.length
      });
    }

    const usersRes = await db.pool.query('SELECT COUNT(*) FROM users');
    const sheltersRes = await db.pool.query('SELECT COUNT(*) FROM shelters');
    const petsRes = await db.pool.query('SELECT COUNT(*) FROM pets');
    const appsRes = await db.pool.query('SELECT COUNT(*) FROM adoption_applications');
    const reportsRes = await db.pool.query('SELECT COUNT(*) FROM lost_found_reports');
    const bookingsRes = await db.pool.query('SELECT COUNT(*) FROM service_bookings');

    res.json({
      totalUsers: parseInt(usersRes.rows[0].count),
      totalShelters: parseInt(sheltersRes.rows[0].count),
      totalPets: parseInt(petsRes.rows[0].count),
      totalApplications: parseInt(appsRes.rows[0].count),
      totalReports: parseInt(reportsRes.rows[0].count),
      totalBookings: parseInt(bookingsRes.rows[0].count)
    });
  } catch (error) {
    next(error);
  }
});

// GET all users (admin overview)
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    if (db.getIsFallback()) {
      return res.json(mockData.users);
    }
    const result = await db.pool.query('SELECT id, email, role, name, phone, location, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET all shelters (admin overview)
router.get('/shelters', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    if (db.getIsFallback()) {
      return res.json(mockData.shelters);
    }
    const result = await db.pool.query('SELECT * FROM shelters');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Moderate (delete) user pet or lost & found reports
router.delete('/reports/:id', authMiddleware, roleMiddleware('admin'), async (req, res, next) => {
  try {
    if (db.getIsFallback()) {
      const index = mockData.lostFoundReports.findIndex(r => r.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Report not found.' });
      mockData.lostFoundReports.splice(index, 1);
      return res.json({ message: 'Report deleted by admin successfully.' });
    }

    const result = await db.pool.query('DELETE FROM lost_found_reports WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
      res.json({ message: 'Report deleted by admin successfully.' });
    } else {
      res.status(404).json({ message: 'Report not found.' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
