import api from './api';

export const getFinanceiro = async () => {
  const response = await api.get('/financeiro');
  return response.data;
};

export const getFinanceiroById = async (id) => {
  const response = await api.get(`/financeiro/${id}`);
  return response.data;
};

export const createFinanceiro = async (financeiro) => {
  const response = await api.post('/financeiro', financeiro);
  return response.data;
};

export const updateFinanceiro = async (id, financeiro) => {
  const response = await api.put(`/financeiro/${id}`, financeiro);
  return response.data;
};

export const deleteFinanceiro = async (id) => {
  const response = await api.delete(`/financeiro/${id}`);
  return response.data;
};