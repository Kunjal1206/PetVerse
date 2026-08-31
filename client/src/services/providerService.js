import api from './api';

export const getProviders = async (filters = {}) => {
  const response = await api.get('/services/providers', { params: filters });
  return response.data;
};

export const getProviderById = async (id) => {
  const response = await api.get(`/services/providers/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/services/bookings', bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get('/services/bookings');
  return response.data;
};

export const submitReview = async (providerId, rating, comment) => {
  const response = await api.post(`/services/reviews/${providerId}`, { rating, comment });
  return response.data;
};
