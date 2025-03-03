import api from './api';

export const getAtendimentos = async () => {
  const response = await api.get('/attendances');
  return response.data;
};

export const getAtendimentoById = async (id) => {
  const response = await api.get(`/attendances/${id}`);
  return response.data;
};

export const createAtendimento = async (agendamento) => {
  const response = await api.post('/attendances', agendamento);
  return response.data;
};

export const updateAtendimento = async (id, agendamento) => {
  const response = await api.put(`/attendances/${id}`, agendamento);
  return response.data;
};

export const deleteAtendimento = async (id) => {
  const response = await api.delete(`/attendances/${id}`);
  return response.data;
};