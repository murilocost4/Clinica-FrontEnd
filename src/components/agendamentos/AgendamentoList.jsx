import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { getPacientes } from '../../services/Pacientes';
import { getProfissionais } from '../../services/Profissionais';

const AgendamentoList = ({ agendamentos, onEditar, onExcluir, loading }) => {
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [loadingNomes, setLoadingNomes] = useState(true);

  // Função para buscar os nomes dos pacientes e profissionais
  useEffect(() => {
    const fetchNomes = async () => {
      try {
        setLoadingNomes(true);

        // Busca pacientes
        const pacientesResponse = await getPacientes();
        const pacientesData = Array.isArray(pacientesResponse?.data) ? pacientesResponse.data : [];
        setPacientes(pacientesData);

        // Busca profissionais
        const profissionaisResponse = await getProfissionais();
        const profissionaisData = Array.isArray(profissionaisResponse?.data) ? profissionaisResponse.data : [];
        setProfissionais(profissionaisData);
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

  // Função para lidar com o double-click na linha
  const handleDoubleClick = (id) => {
    onEditar(id);
  };

  // Função para formatar a data e hora
  const formatarDataHora = (dateTime) => {
    if (!dateTime) return 'N/A';
    
    try {
      const data = new Date(dateTime);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(data);
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dateTime.toString();
    }
  };

  // Função para formatar o status
  const formatarStatus = (status) => {
    if (!status) return 'N/A';
    
    const statusMap = {
      'solicitado': { texto: 'Solicitado', classe: 'bg-yellow-100 text-yellow-800' },
      'confirmado': { texto: 'Confirmado', classe: 'bg-blue-100 text-blue-800' },
      'realizado': { texto: 'Realizado', classe: 'bg-green-100 text-green-800' },
      'cancelado': { texto: 'Cancelado', classe: 'bg-red-100 text-red-800' }
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { texto: status, classe: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.classe}`}>
        {statusInfo.texto}
      </span>
    );
  };

  // Função para obter o nome do paciente pelo ID
  const getNomePaciente = (patientId) => {
    if (!Array.isArray(pacientes)) {
      console.error('Erro: pacientes não é um array:', pacientes);
      return `Paciente ${patientId}`;
    }

    const paciente = pacientes.find((p) => p.id === patientId);
    return paciente ? paciente.name : `Paciente ${patientId}`;
  };

  // Função para obter o nome do profissional pelo ID
  const getNomeProfissional = (professionalId) => {
    if (!Array.isArray(profissionais)) {
      console.error('Erro: profissionais não é um array:', profissionais);
      return `Profissional ${professionalId}`;
    }

    const profissional = profissionais.find((p) => p.id === professionalId);
    return profissional ? profissional.name : `Profissional ${professionalId}`;
  };

  // Transforma os dados recebidos da API para o formato esperado pela tabela
  const dadosFormatados = agendamentos.map((agendamento) => ({
    id: agendamento.id,
    paciente: getNomePaciente(agendamento.patientId), // Obtém o nome do paciente
    profissional: getNomeProfissional(agendamento.professionalId), // Obtém o nome do profissional
    dateTime: agendamento.dateTime,
    status: agendamento.status
  }));

  console.log("Dados recebidos:", agendamentos); // Depuração
  console.log("Dados formatados:", dadosFormatados); // Depuração
  console.log("Pacientes:", pacientes); // Depuração
  console.log("Profissionais:", profissionais); // Depuração

  const columns = [
    { header: 'Paciente', accessor: 'paciente' },
    { header: 'Profissional', accessor: 'profissional' },
    { 
      header: 'Data e Hora', 
      accessor: 'dateTime',
      render: (dateTime) => formatarDataHora(dateTime)
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (status) => formatarStatus(status)
    },
    {
      header: 'Ações',
      accessor: 'id',
      render: (id) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditar(id);
            }}
            className="text-blue-600 hover:text-blue-800"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExcluir(id);
            }}
            className="text-red-600 hover:text-red-800"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {loading && agendamentos.length > 0 && (
        <div className="p-4 text-center text-gray-500">
          Atualizando dados...
        </div>
      )}
      
      {agendamentos.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {loading ? 'Carregando agendamentos...' : 'Nenhum agendamento encontrado.'}
        </div>
      ) : (
        <Table
          columns={columns}
          data={dadosFormatados}
          onRowDoubleClick={(row) => handleDoubleClick(row.id)}
          className={loading ? 'opacity-60' : ''}
        />
      )}
    </div>
  );
};

export default AgendamentoList;