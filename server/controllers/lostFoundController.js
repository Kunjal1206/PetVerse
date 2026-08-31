const lostFoundService = require('../services/lostFoundService');

async function getReports(req, res, next) {
  try {
    const filters = {
      type: req.query.type,
      species: req.query.species,
      location: req.query.location
    };
    const list = await lostFoundService.getReports(filters);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function createReport(req, res, next) {
  try {
    const { type, petName, species, breed, color, location, latitude, longitude, date, description, contactInfo, imageUrl } = req.body;

    if (!type || !species || !location || !date || !contactInfo) {
      return res.status(400).json({ message: 'Required fields: type, species, location, date, contactInfo.' });
    }

    const report = await lostFoundService.createReport(req.user.id, {
      type,
      petName,
      species,
      breed,
      color,
      location,
      latitude,
      longitude,
      date,
      description,
      contactInfo,
      imageUrl
    });

    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
}

async function resolveReport(req, res, next) {
  try {
    const report = await lostFoundService.resolveReport(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.json(report);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getReports,
  createReport,
  resolveReport
};
