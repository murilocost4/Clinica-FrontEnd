import React, { useState } from 'react';
import ModalUsuario from '../components/configurador/ModalUsuario'; // Componente do modal de edição/adição
import Table from '../components/common/Table'; // Componente de tabela reutilizável

const ConfiguradorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      role: 'ADM',
      cpf: '111.222.333-44',
      telefone: '(11) 99999-8888',
      endereco: {
        rua: 'Rua das Flores',
        numero: '123',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      role: 'Recepcionista',
      cpf: '222.333.444-55',
      telefone: '(11) 88888-7777',
      endereco: {
        rua: 'Avenida Paulista',
        numero: '456',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
    {
      id: 3,
      nome: 'Dr. Carlos Souza',
      email: 'carlos.souza@example.com',
      role: 'Profissional',
      cpf: '333.444.555-66',
      telefone: '(11) 77777-6666',
      endereco: {
        rua: 'Rua dos Médicos',
        numero: '789',
        cidade: 'São Paulo',
        estado: 'SP',
      },
      dadosProfissionais: {
        documento: 'CRM/SP 123456',
        especialidade: 'Cardiologia',
        instituicao: 'Faculdade de Medicina da USP',
        anoFormacao: 2010,
      },
    },
  ]);

  const [selectedUsuario, setSelectedUsuario] = useState(null); // Usuário selecionado para edição
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const [isEditing, setIsEditing] = useState(false); // Estado para diferenciar entre edição e adição

  // Estados para os filtros
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroFuncao, setFiltroFuncao] = useState('');

  // Função para filtrar os usuários
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nomeMatch = usuario.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const funcaoMatch = filtroFuncao ? usuario.role === filtroFuncao : true;
    return nomeMatch && funcaoMatch;
  });

  // Função para abrir o modal de edição
  const handleEditUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setIsEditing(true);
    setShowModal(true);
  };

  // Função para abrir o modal de adição
  const handleAddUsuario = () => {
    setSelectedUsuario(null);
    setIsEditing(false);
    setShowModal(true);
  };

  // Função para salvar o usuário (edição ou adição)
  const handleSaveUsuario = (usuario) => {
    if (isEditing) {
      // Atualiza o usuário existente
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuario.id ? usuario : u))
      );
    } else {
      // Adiciona um novo usuário
      setUsuarios((prev) => [...prev, { ...usuario, id: prev.length + 1 }]);
    }
    setShowModal(false);
  };

  // Colunas da tabela
  const columns = [
    {
      header: 'Nome',
      accessor: 'nome',
    },
    {
      header: 'E-mail',
      accessor: 'email',
    },
    {
      header: 'Função',
      accessor: 'role',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-lg ${
            row.role === 'ADM'
              ? 'bg-blue-500 text-white'
              : row.role === 'Recepcionista'
              ? 'bg-green-500 text-white'
              : row.role === 'Profissional'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-500 text-white'
          }`}
        >
          {row.role}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Cabeçalho com botão "Novo Usuário" */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuração de Usuários</h1>
        <button
          onClick={handleAddUsuario}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Novo Usuário
        </button>
      </div>

      {/* Filtros de Pesquisa */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por Nome</label>
          <input
            type="text"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            placeholder="Digite o nome"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por Função</label>
          <select
            value={filtroFuncao}
            onChange={(e) => setFiltroFuncao(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas as Funções</option>
            <option value="ADM">ADM</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Profissional">Profissional</option>
          </select>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <Table
        columns={columns}
        data={usuariosFiltrados}
        onRowDoubleClick={handleEditUsuario} // Abre o modal de edição ao dar duplo clique
      />

      {/* Modal de Edição/Adição */}
      {showModal && (
        <ModalUsuario
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUsuario}
          usuario={selectedUsuario}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default ConfiguradorUsuarios;