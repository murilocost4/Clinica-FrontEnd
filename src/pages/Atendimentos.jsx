import React, { useEffect, useState } from 'react';
import SalasAtendimento from '../components/atendimentos/SalasAtendimento';
import { getSalas } from '../services/Salas';

const Atendimentos = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca as salas ao carregar o componente
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await getSalas();
        setSalas(response.data); // Atualiza o estado com os dados da API
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar salas:', err);
        setError('Falha ao carregar as salas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Salas de Atendimento</h1>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Carregando salas...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <SalasAtendimento salas={salas} />
      )}
    </div>
  );
};

export default Atendimentos;