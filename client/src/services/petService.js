import api from './api';

export const getPets = async (filters = {}) => {
  const response = await api.get('/pets', { params: filters });
  return response.data;
};

export const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}`);
  return response.data;
};

export const createPet = async (petData) => {
  const response = await api.post('/pets', petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await api.put(`/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await api.delete(`/pets/${id}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get('/pets/favorites/all');
  return response.data;
};

export const addFavorite = async (petId) => {
  const response = await api.post(`/pets/favorites/${petId}`);
  return response.data;
};

export const removeFavorite = async (petId) => {
  const response = await api.delete(`/pets/favorites/${petId}`);
  return response.data;
};
