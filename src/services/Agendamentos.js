import api from './api';

export const getAgendamentos = async () => {
  const response = await api.get('/agendamentos');
  return response.data;
};

export const getAgendamentoById = async (id) => {
  const response = await api.get(`/agendamentos/${id}`);
  return response.data;
};

export const createAgendamento = async (agendamento) => {
  const response = await api.post('/agendamentos', agendamento);
  return response.data;
};

export const updateAgendamento = async (id, agendamento) => {
  const response = await api.put(`/agendamentos/${id}`, agendamento);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  const response = await api.delete(`/agendamentos/${id}`);
  return response.data;
};