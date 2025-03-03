import api from './api';

export const getSalas = async () => {
  const response = await api.get('/rooms');
  return response.data;
};

export const getSalaById = async (id) => {
  const response = await api.get(`/rooms/${id}`);
  return response.data;
};

export const createSala = async (sala) => {
  const response = await api.post('/rooms', sala);
  return response.data;
};

export const updateSala = async (id, sala) => {
  const response = await api.put(`/rooms/${id}`, sala);
  return response.data;
};

export const deleteSala = async (id) => {
  const response = await api.delete(`/rooms/${id}`);
  return response.data;
};