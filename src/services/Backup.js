import api from './api';

export const getBackups = async () => {
  const response = await api.get('/backups');
  return response.data;
};

export const getBackupById = async (id) => {
  const response = await api.get(`/backups/${id}`);
  return response.data;
};