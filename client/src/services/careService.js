import api from './api';

// My Pets CRUD
export const getUserPets = async () => {
  const response = await api.get('/care/pets');
  return response.data;
};

export const addUserPet = async (petData) => {
  const response = await api.post('/care/pets', petData);
  return response.data;
};

export const deleteUserPet = async (id) => {
  const response = await api.delete(`/care/pets/${id}`);
  return response.data;
};

// Reminders CRUD
export const getReminders = async () => {
  const response = await api.get('/care/reminders');
  return response.data;
};

export const addReminder = async (reminderData) => {
  const response = await api.post('/care/reminders', reminderData);
  return response.data;
};

export const updateReminder = async (id, reminderData) => {
  const response = await api.put(`/care/reminders/${id}`, reminderData);
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await api.delete(`/care/reminders/${id}`);
  return response.data;
};
