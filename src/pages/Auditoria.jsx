import React, { useState } from 'react';
import Table from '../components/common/Table'; // Componente de tabela reutilizável

const Auditoria = () => {
  // Dados fictícios de registros de auditoria
  const [registrosAuditoria, setRegistrosAuditoria] = useState([
    {
      id: 1,
      usuario: 'João Silva',
      acao: 'Criar',
      descricao: 'Criou um novo usuário',
      data: new Date('2023-10-01T10:00:00'),
    },
    {
      id: 2,
      usuario: 'Maria Oliveira',
      acao: 'Editar',
      descricao: 'Editou o convênio "Plano Saúde A"',
      data: new Date('2023-10-02T14:30:00'),
    },
    {
      id: 3,
      usuario: 'Carlos Souza',
      acao: 'Excluir',
      descricao: 'Excluiu o usuário "Ana Costa"',
      data: new Date('2023-10-03T09:15:00'),
    },
    {
      id: 4,
      usuario: 'Fernanda Lima',
      acao: 'Criar',
      descricao: 'Criou um novo convênio',
      data: new Date('2023-10-04T16:45:00'),
    },
  ]);

  // Estados para os filtros
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroAcao, setFiltroAcao] = useState('');
  const [filtroData, setFiltroData] = useState('');

  // Função para filtrar os registros de auditoria
  const registrosFiltrados = registrosAuditoria.filter((registro) => {
    const usuarioMatch = registro.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
    const acaoMatch = filtroAcao ? registro.acao === filtroAcao : true;
    const dataMatch = filtroData ? registro.data.toDateString() === new Date(filtroData).toDateString() : true;
    return usuarioMatch && acaoMatch && dataMatch;
  });

  // Função para limpar todos os filtros
  const handleLimparFiltros = () => {
    setFiltroUsuario('');
    setFiltroAcao('');
    setFiltroData('');
  };

  // Colunas da tabela
  const columns = [
    {
      header: 'Usuário',
      accessor: 'usuario',
    },
    {
      header: 'Ação',
      accessor: 'acao',
    },
    {
      header: 'Descrição',
      accessor: 'descricao',
    },
    {
      header: 'Data',
      accessor: 'data',
      render: (row) => row.data.toLocaleString(), // Formata a data e hora
    },
  ];

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro de Auditoria</h1>

      {/* Filtros de Pesquisa */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por Usuário</label>
          <input
            type="text"
            value={filtroUsuario}
            onChange={(e) => setFiltroUsuario(e.target.value)}
            placeholder="Digite o nome do usuário"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por Ação</label>
          <select
            value={filtroAcao}
            onChange={(e) => setFiltroAcao(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas as Ações</option>
            <option value="Criar">Criar</option>
            <option value="Editar">Editar</option>
            <option value="Excluir">Excluir</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por Data</label>
          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Botão "Limpar Filtros" */}
      <div className="mb-6">
        <button
          onClick={handleLimparFiltros}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Tabela de Registros de Auditoria */}
      <Table columns={columns} data={registrosFiltrados} />
    </div>
  );
};

export default Auditoria;