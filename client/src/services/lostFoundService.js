import api from './api';

export const getReports = async (filters = {}) => {
  const response = await api.get('/lost-found', { params: filters });
  return response.data;
};

export const createReport = async (reportData) => {
  const response = await api.post('/lost-found/report', reportData);
  return response.data;
};

export const resolveReport = async (id) => {
  const response = await api.put(`/lost-found/report/${id}/resolve`);
  return response.data;
};
