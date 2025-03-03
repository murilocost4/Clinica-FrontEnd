import api from './api';

export const getPacientes = async () => {
  const response = await api.get('/pacientes');
  return response.data;
};