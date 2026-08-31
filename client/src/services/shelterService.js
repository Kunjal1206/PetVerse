import api from './api';

export const getShelterDashboard = async () => {
  const response = await api.get('/shelters/dashboard');
  return response.data;
};

export const getShelterPets = async () => {
  const response = await api.get('/shelters/pets');
  return response.data;
};

export const getShelterApplications = async (status = '') => {
  const response = await api.get('/shelters/applications', { params: status ? { status } : {} });
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/shelters/applications/${id}/status`, { status });
  return response.data;
};
