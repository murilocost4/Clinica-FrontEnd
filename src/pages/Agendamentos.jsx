import React, { useState, useEffect } from 'react';
import Modal from '../components/common/Modal';
import AgendamentoList from '../components/agendamentos/AgendamentoList';
import AgendamentoForm from '../components/agendamentos/AgendamentoForm';
import { 
  getAgendamentos, 
  createAgendamento, 
  updateAgendamento, 
  deleteAgendamento,
} from '../services/Agendamentos';
import ModalAgendamento from '../components/agendamentos/ModalAgendamento';

const Agendamentos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendamentoEditando, setAgendamentoEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  // Listas de médicos e salas disponíveis
  const medicos = ['Dr. Ana', 'Dr. Carlos', 'Dr. João'];
  const salas = ['Sala 1', 'Sala 2', 'Sala 3'];
  const status = ['solicitado', 'confirmado', 'realizado', 'cancelado'];

  // Estados para os filtros
  const [filtroMedico, setFiltroMedico] = useState('');
  const [filtroSala, setFiltroSala] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Carregar agendamentos ao montar o componente
  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Função para buscar agendamentos da API
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

  const handleAbrirModal = () => {
    setAgendamentoEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarAgendamento = async (agendamento) => {
    try {
      setLoading(true);
      
      if (agendamentoEditando) {
        // Atualiza um agendamento existente
        await updateAgendamento(agendamentoEditando.id, agendamento);
      } else {
        // Cria um novo agendamento
        await createAgendamento(agendamento);
      }
      
      // Recarrega a lista após a operação
      await fetchAgendamentos();
      setIsModalOpen(false);
      
    } catch (err) {
      console.error('Erro ao salvar agendamento:', err);
      setError('Falha ao salvar o agendamento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditarAgendamento = async (id) => {
    try {
      setLoading(true);
      const agendamento = agendamentos.find((a) => a.id === id);
      setAgendamentoEditando(agendamento);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Erro ao editar agendamento:', err);
      setError('Falha ao carregar os dados do agendamento. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirAgendamento = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        setLoading(true);
        await deleteAgendamento(id);
        await fetchAgendamentos();
      } catch (err) {
        console.error('Erro ao excluir agendamento:', err);
        setError('Falha ao excluir o agendamento. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Transforma os dados recebidos da API para o formato esperado pela tabela
  const dadosFormatados = agendamentos.map((agendamento) => ({
    id: agendamento.id,
    paciente: `Paciente ${agendamento.patientId}`, // Exemplo: substitua por um nome real se disponível
    profissional: `Profissional ${agendamento.professionalId}`, // Exemplo: substitua por um nome real se disponível
    dateTime: agendamento.dateTime,
    status: agendamento.status
  }));

  // Função para filtrar os agendamentos
  const agendamentosFiltrados = dadosFormatados.filter((agendamento) => {
    return (
      (filtroMedico === '' || agendamento.profissional === filtroMedico) &&
      (filtroSala === '' || agendamento.sala === filtroSala) &&
      (filtroData === '' || agendamento.dateTime.includes(filtroData)) &&
      (filtroStatus === '' || agendamento.status === filtroStatus)
    );
  });

  // Renderiza mensagem de carregamento
  if (loading && (!agendamentos || agendamentos.length === 0)) {
    return <div className="p-6 text-center">Carregando agendamentos...</div>;
  }

  return (
    <div className="p-6">
      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Título e Botão de Adicionar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Solicitações</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          Nova Solicitação
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtro por Médico */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Médico</label>
            <select
              value={filtroMedico}
              onChange={(e) => setFiltroMedico(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              {medicos.map((medico, index) => (
                <option key={index} value={medico}>
                  {medico}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Sala */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sala</label>
            <select
              value={filtroSala}
              onChange={(e) => setFiltroSala(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas</option>
              {salas.map((sala, index) => (
                <option key={index} value={sala}>
                  {sala}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              {status.map((status, index) => (
                <option key={index} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <AgendamentoList
        agendamentos={agendamentosFiltrados}
        onEditar={handleEditarAgendamento}
        onExcluir={handleExcluirAgendamento}
        loading={loading}
      />

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <ModalAgendamento
          agendamento={agendamentoEditando}
          onSalvar={handleSalvarAgendamento}
          onCancelar={handleFecharModal}
        />
      )}
    </div>
  );
};

export default Agendamentos;