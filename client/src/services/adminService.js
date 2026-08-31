import api from './api';

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getAdminShelters = async () => {
  const response = await api.get('/admin/shelters');
  return response.data;
};

export const deleteAdminReport = async (id) => {
  const response = await api.delete(`/admin/reports/${id}`);
  return response.data;
};
