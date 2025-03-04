import React, { useState, useEffect } from 'react';
import DadosPaciente from './DadosPaciente';
import { getAgendamentoById } from '../../services/Agendamentos';

const ModalAgendamento = ({ agendamento, onSalvar, onCancelar }) => {
  const [abaAtiva, setAbaAtiva] = useState('dadosPaciente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState({
    paciente: agendamento?.paciente || '',
    profissional: agendamento?.profissional || '',
    sala: agendamento?.sala || '',
    dateTime: agendamento?.dateTime || new Date().toISOString().slice(0, 16),
    status: agendamento?.status || 'solicitado',
    notes: agendamento?.notes || '',
    prontuario: agendamento?.prontuario || {},
    receita: agendamento?.receita || {}
  });

  useEffect(() => {
    if (agendamento?.id) {
      fetchAgendamentoDetails(agendamento.id);
    }
  }, [agendamento]);

  const fetchAgendamentoDetails = async (id) => {
    try {
      setLoading(true);
      const detalhes = await getAgendamentoById(id);
      setDadosAgendamento(detalhes);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar detalhes do agendamento:', err);
      setError('Falha ao carregar os detalhes do agendamento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo, valor) => {
    setDadosAgendamento((prev) => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSalvar = () => {
    if (!dadosAgendamento.paciente || !dadosAgendamento.profissional || !dadosAgendamento.dateTime) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onSalvar(dadosAgendamento);
  };

  const handleUpdateTabData = (tabData) => {
    setDadosAgendamento((prev) => ({
      ...prev,
      [abaAtiva]: {
        ...prev[abaAtiva],
        ...tabData
      }
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {agendamento ? 'Editar Agendamento' : 'Adicionar Agendamento'}
          </h2>
          {loading && <span className="text-sm text-blue-500">Carregando...</span>}
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="p-6">
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {['dadosPaciente'].map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  abaAtiva === aba ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {aba === 'dadosPaciente' ? 'Dados da Solicitação' : aba === 'prontuario' ? 'Prontuário e Evolução' : 'Receita/Prescrição'}
              </button>
            ))}
          </div>

          <div>
            {abaAtiva === 'dadosPaciente' && (
              <DadosPaciente 
                dados={dadosAgendamento} 
                onChange={handleUpdateTabData} 
                disabled={loading}
              />
            )}
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-2">
          <button
            onClick={onCancelar}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgendamento;
