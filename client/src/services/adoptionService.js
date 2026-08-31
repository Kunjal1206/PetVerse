import api from './api';

export const applyForAdoption = async (petId, answers) => {
  const response = await api.post('/adoptions/apply', { petId, answers });
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get('/adoptions/applications');
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/adoptions/applications/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/adoptions/applications/${id}`, { status });
  return response.data;
};
