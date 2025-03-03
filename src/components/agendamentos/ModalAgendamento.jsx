import React, { useState, useEffect } from 'react';
import DadosPaciente from './DadosPaciente';
import ProntuarioEvolucao from './ProntuarioEvolucao';
import ReceitaPrescricao from './ReceitaPrescricao';
import { getAgendamentoById } from '../../services/Agendamentos';

const ModalAgendamento = ({ agendamento, onSalvar, onCancelar }) => {
  const [abaAtiva, setAbaAtiva] = useState('dadosPaciente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState(agendamento || {
    paciente: '',
    profissional: '',
    sala: '',
    dateTime: new Date().toISOString().slice(0, 16),
    status: 'solicitado',
    notes: '',
    prontuario: {},
    receita: {}
  });

  // Carregar detalhes completos do agendamento, se for edição
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
    // Validar dados
    if (!dadosAgendamento.paciente || !dadosAgendamento.profissional || !dadosAgendamento.dateTime) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Enviar dados para o componente pai
    onSalvar(dadosAgendamento);
  };

  // Atualizar dados específicos da aba ativa
  const handleUpdateTabData = (tabData) => {
    if (abaAtiva === 'dadosPaciente') {
      setDadosAgendamento(prev => ({
        ...prev,
        ...tabData
      }));
    } else if (abaAtiva === 'prontuarioEvolucao') {
      setDadosAgendamento(prev => ({
        ...prev,
        prontuario: {
          ...prev.prontuario,
          ...tabData
        }
      }));
    } else if (abaAtiva === 'receitaPrescricao') {
      setDadosAgendamento(prev => ({
        ...prev,
        receita: {
          ...prev.receita,
          ...tabData
        }
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-screen">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {agendamento ? 'Editar Agendamento' : 'Adicionar Agendamento'}
          </h2>
          {loading && <span className="text-sm text-blue-500">Carregando...</span>}
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Abas */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            <button
              onClick={() => setAbaAtiva('dadosPaciente')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                abaAtiva === 'dadosPaciente'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Dados do Paciente
            </button>
            <button
              onClick={() => setAbaAtiva('prontuarioEvolucao')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                abaAtiva === 'prontuarioEvolucao'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Prontuário e Evolução
            </button>
            <button
              onClick={() => setAbaAtiva('receitaPrescricao')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                abaAtiva === 'receitaPrescricao'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Receita/Prescrição
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div>
            {abaAtiva === 'dadosPaciente' && (
              <DadosPaciente 
                dados={dadosAgendamento} 
                onChange={handleUpdateTabData} 
                disabled={loading}
              />
            )}
            {abaAtiva === 'prontuarioEvolucao' && (
              <ProntuarioEvolucao 
                prontuario={dadosAgendamento.prontuario} 
                onChange={handleUpdateTabData}
                disabled={loading} 
              />
            )}
            {abaAtiva === 'receitaPrescricao' && (
              <ReceitaPrescricao 
                receita={dadosAgendamento.receita} 
                onChange={handleUpdateTabData}
                disabled={loading}
              />
            )}
          </div>
        </div>

        {/* Rodapé do Modal */}
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