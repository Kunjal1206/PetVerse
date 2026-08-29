const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*', // Allows connection from any client port during testing
  credentials: true
}));

// Parse JSON body
app.use(express.json());

// Import Database setup to trigger connection check
const db = require('./config/db');

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    databaseFallback: db.getIsFallback()
  });
});

// Mount API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/adoptions', require('./routes/adoptionRoutes'));
app.use('/api/care', require('./routes/careRoutes'));
app.use('/api/lost-found', require('./routes/lostFoundRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/shelters', require('./routes/shelterRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Global Error handling middleware
app.use(errorMiddleware);

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 PetVerse Backend Server running on port ${PORT}`);
  console.log(`📡 Healthcheck available at http://localhost:${PORT}/api/health`);
});
