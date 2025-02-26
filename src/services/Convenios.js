import api from './api';

export const getConvenios = async () => {
  const response = await api.get('/convenios');
  return response.data;
};

export const getConvenioById = async (id) => {
  const response = await api.get(`/convenios/${id}`);
  return response.data;
};

export const createConvenio = async (convenio) => {
  const response = await api.post('/convenios', convenio);
  return response.data;
};

export const updateConvenio = async (id, convenio) => {
  const response = await api.put(`/convenios/${id}`, convenio);
  return response.data;
};

export const deleteConvenio = async (id) => {
  const response = await api.delete(`/convenios/${id}`);
  return response.data;
};