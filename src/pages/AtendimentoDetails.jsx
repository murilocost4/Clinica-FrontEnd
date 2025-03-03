import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalPagamento from '../components/financeiro/ModalPagamento';
import ModalAnamnese from '../components/atendimentos/ModalAnamnese';
import ModalAtendimento from '../components/atendimentos/ModalAtendimento';
import Table from '../components/common/Table';
import { getAtendimentoById } from '../services/Atendimentos';

const AtendimentoDetails = () => {
  const { id } = useParams();
  const [atendimento, setAtendimento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPagamento, setShowPagamento] = useState(false);
  const [showAnamnese, setShowAnamnese] = useState(false);
  const [showAtendimento, setShowAtendimento] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  // Busca os detalhes do atendimento ao carregar o componente
  useEffect(() => {
    const fetchAtendimento = async () => {
      try {
        const response = await getAtendimentoById(id);
        setAtendimento(response.data); // Atualiza o estado com os dados da API
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar atendimento:', err);
        setError('Falha ao carregar os detalhes do atendimento. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAtendimento();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Carregando detalhes do atendimento...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Detalhes do Atendimento</h1>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Lista de Pacientes</h2>

        <Table
          columns={[
            { header: 'Nome', accessor: 'nome' },
            { header: 'Convênio', accessor: 'convênio' },
            { header: 'Valor', accessor: 'valor', render: (row) => `R$ ${(row.valor || 0).toFixed(2)}` },
            {
              header: 'Status',
              accessor: 'status',
              render: (row) => (
                <span
                  className={`px-2 py-1 rounded-lg ${
                    row.status === 'Agendado'
                      ? 'bg-yellow-500'
                      : row.status === 'Pagamento Efetuado'
                      ? 'bg-violet-500'
                      : row.status === 'Aguardando Recepção'
                      ? 'bg-blue-500'
                      : row.status === 'Em Atendimento'
                      ? 'bg-green-500'
                      : row.status === 'Atendimento Finalizado'
                      ? 'bg-gray-500'
                      : 'bg-red-500'
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              header: 'Ações',
              accessor: 'acoes',
              render: (row) => (
                <button
                  onClick={() => setSelectedPaciente(row)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Ver detalhes
                </button>
              ),
            },
          ]}
          data={atendimento?.pacientes || []}
        />
      </div>

      {selectedPaciente && (
        <>
          <ModalPagamento
            show={showPagamento}
            onClose={() => setShowPagamento(false)}
            onConfirm={() => setShowAnamnese(true)}
            paciente={selectedPaciente}
          />

          <ModalAnamnese
            show={showAnamnese}
            onClose={() => setShowAnamnese(false)}
            onConfirm={() => setShowAtendimento(true)}
            paciente={selectedPaciente}
          />

          <ModalAtendimento
            show={showAtendimento}
            onClose={() => setShowAtendimento(false)}
            onConfirm={() => setShowAtendimento(false)}
            paciente={selectedPaciente}
          />
        </>
      )}
    </div>
  );
};

export default AtendimentoDetails;