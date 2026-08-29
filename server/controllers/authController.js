const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'petverse_fallback_secret_key_123';

// Register User
async function register(req, res, next) {
  try {
    const { email, password, role, name, phone, location, shelterName, shelterCity, shelterAddress, shelterDescription } = req.body;

    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: 'Email, password, role, and name are required.' });
    }

    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await authService.createUser({
      email,
      passwordHash,
      role,
      name,
      phone,
      location
    });

    let shelter = null;
    if (role === 'shelter') {
      shelter = await authService.createShelter({
        userId: newUser.id,
        name: shelterName || `${name}'s Shelter`,
        city: shelterCity || location || 'Delhi',
        address: shelterAddress || '',
        description: shelterDescription || '',
        phone,
        email
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        location: newUser.location
      },
      shelter
    });
  } catch (error) {
    next(error);
  }
}

// Login User
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    let shelter = null;
    if (user.role === 'shelter') {
      shelter = await authService.getShelterByUserId(user.id);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        location: user.location
      },
      shelter
    });
  } catch (error) {
    next(error);
  }
}

// Get Current User Profile
async function getMe(req, res, next) {
  try {
    const user = await authService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let shelter = null;
    if (user.role === 'shelter') {
      shelter = await authService.getShelterByUserId(user.id);
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone,
        location: user.location
      },
      shelter
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getMe
};
