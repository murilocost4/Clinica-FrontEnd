import api from './api';

export const getAuditoria = async () => {
  const response = await api.get('/auditoria');
  return response.data;
};

export const getAuditoriaById = async (id) => {
  const response = await api.get(`/auditoria/${id}`);
  return response.data;
};