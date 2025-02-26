import api from './api';

export const getRelatorios = async () => {
  const response = await api.get('/relatorios');
  return response.data;
};

export const getRelatorioById = async (id) => {
  const response = await api.get(`/relatorios/${id}`);
  return response.data;
};