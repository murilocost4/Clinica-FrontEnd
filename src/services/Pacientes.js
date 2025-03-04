import api from './api';

export const getPacientes = async (search = '') => {
  const response = await api.get('/pacientes', {
    params: { search }, // Passa o parâmetro de busca na query string
  });
  return response.data;
};