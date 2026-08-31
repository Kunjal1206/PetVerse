import api from './api';

export const submitAiMatch = async (preferences) => {
  const response = await api.post('/ai/match', preferences);
  return response.data;
};

export const queryAiAssistant = async (message, history = []) => {
  const response = await api.post('/ai/chat', { message, history });
  return response.data; // returns { text: "response message" }
};
