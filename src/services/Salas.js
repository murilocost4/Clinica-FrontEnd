import api from './api';

export const getSalas = async () => {
  const response = await api.get('/salas');
  return response.data;
};

export const getSalaById = async (id) => {
  const response = await api.get(`/salas/${id}`);
  return response.data;
};

export const createSala = async (sala) => {
  const response = await api.post('/salas', sala);
  return response.data;
};

export const updateSala = async (id, sala) => {
  const response = await api.put(`/salas/${id}`, sala);
  return response.data;
};

export const deleteSala = async (id) => {
  const response = await api.delete(`/salas/${id}`);
  return response.data;
};