const serviceProviderService = require('../services/serviceProviderService');

async function getProviders(req, res, next) {
  try {
    const filters = {
      type: req.query.type,
      location: req.query.location
    };
    const list = await serviceProviderService.getProviders(filters);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function getProviderById(req, res, next) {
  try {
    const provider = await serviceProviderService.getProviderById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Service provider not found.' });
    }
    res.json(provider);
  } catch (error) {
    next(error);
  }
}

async function createBooking(req, res, next) {
  try {
    const { providerId, petType, serviceType, startDate, endDate, totalPrice } = req.body;
    if (!providerId || !petType || !serviceType || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: 'All booking fields are required.' });
    }

    const booking = await serviceProviderService.createBooking(req.user.id, {
      providerId,
      petType,
      serviceType,
      startDate,
      endDate,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
}

async function getBookings(req, res, next) {
  try {
    const list = await serviceProviderService.getBookings(req.user.id);
    res.json(list);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const { rating, comment } = req.body;
    if (!rating) {
      return res.status(400).json({ message: 'Rating is required.' });
    }

    const review = await serviceProviderService.createReview(req.user.id, {
      providerId: req.params.providerId,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProviders,
  getProviderById,
  createBooking,
  getBookings,
  createReview
};
