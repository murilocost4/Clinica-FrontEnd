import api from './api';

export const getProfissionais = async () => {
  const response = await api.get('/profissionais');
  return response.data;
};

export const getProfissionalById = async (id) => {
  const response = await api.get(`/profissionais/${id}`);
  return response.data;
};

export const createProfissional = async (profissional) => {
  const response = await api.post('/profissionais', profissional);
  return response.data;
};

export const updateProfissional = async (id, profissional) => {
  const response = await api.put(`/profissionais/${id}`, profissional);
  return response.data;
};

export const deleteProfissional = async (id) => {
  const response = await api.delete(`/profissionais/${id}`);
  return response.data;
};