import api from './api';

export const getProfissionais = async (search = '') => {
  try {
    const response = await api.get('/profissionais', {
      params: { search }, // Passa o parâmetro de busca na query string
    });
    console.log("Resposta da API:", response); // Depuração

    // Verifica se a resposta contém dados
    if (response.data && response.data.success !== false) {
      console.log("Profissionais recebidos:", response.data); // Log dos dados recebidos
      return response.data; // Retorna o array de profissionais
    } else {
      throw new Error(response.data?.error || "Erro ao buscar profissionais.");
    }
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error); // Log de erro
    throw error; // Propaga o erro para ser tratado pelo chamador
  }
};