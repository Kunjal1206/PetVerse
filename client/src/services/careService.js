import api from './api';

const DEFAULT_LOCAL_PETS = [
  { id: 'pet-mock-1', name: 'Bruno', species: 'dog', breed: 'Golden Indie Mix', age: '2 years' },
  { id: 'pet-mock-2', name: 'Luna', species: 'cat', breed: 'Persian Cross', age: '1 year' }
];

const DEFAULT_LOCAL_REMINDERS = [
  {
    id: 'rem-1',
    title: 'Annual Rabies & DHPP Booster',
    type: 'vaccination',
    due_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    completed: false,
    pet_name: 'Bruno',
    notes: 'Annual mandatory municipal booster for urban residency.'
  },
  {
    id: 'rem-2',
    title: 'Quarterly Broad-Spectrum Deworming',
    type: 'deworming',
    due_date: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0],
    completed: false,
    pet_name: 'Luna',
    notes: 'Broad spectrum tablet for parasite prevention.'
  },
  {
    id: 'rem-3',
    title: 'Medicated Anti-Tick & Flea Wash',
    type: 'grooming',
    due_date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    completed: true,
    pet_name: 'Bruno',
    notes: 'Completed at local pet spa.'
  }
];

const getStoredReminders = () => {
  try {
    const raw = localStorage.getItem('petverse_local_reminders');
    if (!raw) {
      localStorage.setItem('petverse_local_reminders', JSON.stringify(DEFAULT_LOCAL_REMINDERS));
      return DEFAULT_LOCAL_REMINDERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_LOCAL_REMINDERS;
  }
};

const saveStoredReminders = (reminders) => {
  try {
    localStorage.setItem('petverse_local_reminders', JSON.stringify(reminders));
  } catch (err) {
    console.warn('Could not save reminders to localStorage', err);
  }
};

const getStoredPets = () => {
  try {
    const raw = localStorage.getItem('petverse_local_pets');
    if (!raw) {
      localStorage.setItem('petverse_local_pets', JSON.stringify(DEFAULT_LOCAL_PETS));
      return DEFAULT_LOCAL_PETS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_LOCAL_PETS;
  }
};

// My Pets CRUD
export const getUserPets = async () => {
  try {
    const response = await api.get('/care/pets');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return getStoredPets();
  } catch (err) {
    console.warn('Backend unavailable, using local pets data');
    return getStoredPets();
  }
};

export const addUserPet = async (petData) => {
  try {
    const response = await api.post('/care/pets', petData);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, saving pet locally');
    const pets = getStoredPets();
    const newPet = { ...petData, id: 'pet-local-' + Date.now() };
    pets.push(newPet);
    localStorage.setItem('petverse_local_pets', JSON.stringify(pets));
    return newPet;
  }
};

export const deleteUserPet = async (id) => {
  try {
    const response = await api.delete(`/care/pets/${id}`);
    return response.data;
  } catch (err) {
    const pets = getStoredPets().filter((p) => p.id !== id);
    localStorage.setItem('petverse_local_pets', JSON.stringify(pets));
    return { success: true };
  }
};

// Reminders CRUD
export const getReminders = async () => {
  try {
    const response = await api.get('/care/reminders');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return getStoredReminders();
  } catch (err) {
    console.warn('Backend unavailable, using local reminders data');
    return getStoredReminders();
  }
};

export const addReminder = async (reminderData) => {
  try {
    const response = await api.post('/care/reminders', reminderData);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, saving reminder locally');
    const reminders = getStoredReminders();
    const newReminder = {
      id: 'rem-local-' + Date.now(),
      title: reminderData.title,
      type: reminderData.type || 'general',
      due_date: reminderData.due_date || new Date().toISOString().split('T')[0],
      completed: false,
      notes: reminderData.notes || '',
      pet_name: reminderData.pet_name || 'My Pet'
    };
    const updated = [newReminder, ...reminders];
    saveStoredReminders(updated);
    return newReminder;
  }
};

export const updateReminder = async (id, reminderData) => {
  try {
    const response = await api.put(`/care/reminders/${id}`, reminderData);
    return response.data;
  } catch (err) {
    const reminders = getStoredReminders().map((r) =>
      r.id === id ? { ...r, ...reminderData } : r
    );
    saveStoredReminders(reminders);
    return { success: true };
  }
};

export const deleteReminder = async (id) => {
  try {
    const response = await api.delete(`/care/reminders/${id}`);
    return response.data;
  } catch (err) {
    const reminders = getStoredReminders().filter((r) => r.id !== id);
    saveStoredReminders(reminders);
    return { success: true };
  }
};

