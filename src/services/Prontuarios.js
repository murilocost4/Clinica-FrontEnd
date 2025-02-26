import api from './api';

export const getProntuarios = async () => {
  const response = await api.get('/prontuarios');
  return response.data;
};

export const getProntuarioById = async (id) => {
  const response = await api.get(`/prontuarios/${id}`);
  return response.data;
};

export const createProntuario = async (prontuario) => {
  const response = await api.post('/prontuarios', prontuario);
  return response.data;
};

export const updateProntuario = async (id, prontuario) => {
  const response = await api.put(`/prontuarios/${id}`, prontuario);
  return response.data;
};

export const deleteProntuario = async (id) => {
  const response = await api.delete(`/prontuarios/${id}`);
  return response.data;
};