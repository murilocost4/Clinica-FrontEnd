import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { getPacientes } from '../../services/Pacientes';
import { getProfissionais } from '../../services/Profissionais';
import ModalConfirmacao from '../common/ModalConfirmacao';
import AgendamentoDetalhesModal from './AgendamentoDetalhesModal';
import { 
  getAgendamentos, 
  createAgendamento, 
  updateAgendamento, 
  deleteAgendamento,
  cancelarAgendamento,
  confirmarAgendamento
} from '../../services/Agendamentos';

const AgendamentoList = ({
  agendamentos,
  onEditar,
  onPagamento,
  onExcluir,
  onConfirmarPresenca,
  onCancelar,
  loading
}) => {
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [loadingNomes, setLoadingNomes] = useState(true);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] = useState(null);
  const [detalhesModalAberto, setDetalhesModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  
    // Carregar agendamentos ao montar o componente
    useEffect(() => {
      fetchAgendamentos();
    }, []);

  // Busca os nomes dos pacientes e profissionais ao montar o componente
  useEffect(() => {
    const fetchNomes = async () => {
      try {
        setLoadingNomes(true);
        const [pacientesResponse, profissionaisResponse] = await Promise.all([
          getPacientes(),
          getProfissionais(),
        ]);
        setPacientes(pacientesResponse?.data || []);
        setProfissionais(profissionaisResponse?.data || []);
      } catch (error) {
        console.error('Erro ao buscar pacientes ou profissionais:', error);
        setPacientes([]);
        setProfissionais([]);
      } finally {
        setLoadingNomes(false);
      }
    };
    fetchNomes();
  }, []);

    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        const response = await getAgendamentos();
        console.log("Resposta da API:", response); // Depuração
  
        // Verifica se a resposta contém a propriedade `data` e se é um array
        if (response && response.data && Array.isArray(response.data)) {
          setAgendamentos(response.data);
        } else {
          console.warn("Dados inválidos recebidos da API:", response);
          setAgendamentos([]);
        }
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar agendamentos:', err);
        setError('Falha ao carregar a lista de agendamentos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    const atualizaTabela = () => {
      fetchAgendamentos;
    }

  // Função para formatar data e hora
  const formatarDataHora = (dateTime) => {
    if (!dateTime) return 'N/A';
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }).format(new Date(dateTime));
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dateTime.toString();
    }
  };

  // Função para formatar o status com classes de cor
  const formatarStatus = (status) => {
    const statusMap = {
      'solicitado': 'bg-yellow-100 text-yellow-800',
      'confirmado': 'bg-blue-100 text-blue-800',
      'aguardando recepção': 'bg-orange-100 text-orange-800',
      'em atendimento': 'bg-green-100 text-green-800',
      'finalizado': 'bg-gray-100 text-gray-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Função para obter o nome do paciente pelo ID
  const getNomePaciente = (id) => pacientes.find((p) => p.id === id)?.name || `Paciente ${id}`;

  // Função para obter o nome do profissional pelo ID
  const getNomeProfissional = (id) => profissionais.find((p) => p.id === id)?.name || `Profissional ${id}`;

  // Formata os dados dos agendamentos para exibição na tabela
  const dadosFormatados = agendamentos.map((agendamento) => ({
    id: agendamento.id,
    paciente: getNomePaciente(agendamento.patientId),
    profissional: getNomeProfissional(agendamento.professionalId),
    dateTime: agendamento.dateTime,
    status: agendamento.status,
    agendamentoOriginal: agendamento // Mantém referência ao objeto original
  }));

  // Função para abrir o modal de confirmação de exclusão
  const handleExcluir = (id) => {
    setAgendamentoParaExcluir(id);
    setModalConfirmacaoAberto(true);
  };

  // Função para confirmar a exclusão do agendamento
  const confirmarExclusao = () => {
    if (agendamentoParaExcluir) {
      onExcluir(agendamentoParaExcluir);
      setModalConfirmacaoAberto(false);
      setAgendamentoParaExcluir(null);
    }
  };

  // Função para cancelar a exclusão do agendamento
  const cancelarExclusao = () => {
    setModalConfirmacaoAberto(false);
    setAgendamentoParaExcluir(null);
  };

  // Função para abrir o modal de detalhes ao dar duplo clique em uma linha
  const handleDuploClique = (row) => {
    const agendamentoCompleto = agendamentos.find(a => a.id === row.id);
    if (agendamentoCompleto) {
      setAgendamentoSelecionado(agendamentoCompleto);
      setDetalhesModalAberto(true);
    }
  };

  const handleCancelarAgendamento = async (id) => {
    try {
      await cancelarAgendamento(id);
      atualizaTabela;
      setDetalhesModalAberto(false);
    } catch (err) {
      console.error('Erro ao cancelar agendamento:', err);
    }
  };

  const handleConfirmarPresenca = async (id) => {
    try {
      await confirmarAgendamento(id);
      atualizaTabela;
      setDetalhesModalAberto(false);
    } catch (err) {
      console.error('Erro ao confirmar presença:', err);
    }
  };

  // Colunas da tabela
  const columns = [
    { header: 'Paciente', accessor: 'paciente' },
    { header: 'Profissional', accessor: 'profissional' },
    { header: 'Data e Hora', accessor: 'dateTime', render: formatarDataHora },
    { header: 'Status', accessor: 'status', render: formatarStatus },
    {
      header: 'Ações',
      accessor: 'id',
      render: (id, row) => (
        <div className="flex space-x-2">
          {row.status.toLowerCase() === 'confirmado' && (
            <button
              onClick={() => onPagamento(id)}
              className="text-green-600 hover:text-green-800"
              disabled={loading}
            >
              Efetuar Pagamento
            </button>
          )}
          <button
            onClick={() => handleExcluir(id)}
            className="text-red-600 hover:text-red-800"
            disabled={loading}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {loading && agendamentos.length > 0 && (
        <div className="p-4 text-center text-gray-500">Atualizando dados...</div>
      )}
      {agendamentos.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {loading ? 'Carregando agendamentos...' : 'Nenhum agendamento encontrado.'}
        </div>
      ) : (
        <Table
          columns={columns}
          data={dadosFormatados}
          className={loading ? 'opacity-60' : ''}
          onRowDoubleClick={handleDuploClique}
        />
      )}

      {/* Modal de confirmação para exclusão */}
      <ModalConfirmacao
        isOpen={modalConfirmacaoAberto}
        onClose={cancelarExclusao}
        onConfirm={confirmarExclusao}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
      />

      {/* Modal de detalhes do agendamento */}
      {agendamentoSelecionado && (
        <AgendamentoDetalhesModal
        isOpen={detalhesModalAberto}
        onClose={() => setDetalhesModalAberto(false)}
        agendamento={agendamentoSelecionado}
        onConfirmarPresenca={() => handleConfirmarPresenca(agendamentoSelecionado.id)}
        onCancelar={() => handleCancelarAgendamento(agendamentoSelecionado.id)}
        nomePaciente={getNomePaciente(agendamentoSelecionado.patientId)}
        nomeProfissional={getNomeProfissional(agendamentoSelecionado.professionalId)}
      />
      )}
    </div>
  );
};

export default AgendamentoList;