import React, { useState } from 'react';
import ModalConvenio from '../components/configurador/ModalConvenio'; // Componente do modal de edição/adição
import Table from '../components/common/Table'; // Componente de tabela reutilizável

const ConfiguradorConvenios = () => {
  const [convenios, setConvenios] = useState([
    {
      id: 1,
      name: 'Plano Saúde A',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Plano Saúde B',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Plano Saúde C',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [selectedConvenio, setSelectedConvenio] = useState(null); // Convênio selecionado para edição
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const [isEditing, setIsEditing] = useState(false); // Estado para diferenciar entre edição e adição

  // Estado para o filtro de pesquisa
  const [filtroNome, setFiltroNome] = useState('');

  // Função para filtrar os convênios
  const conveniosFiltrados = convenios.filter((convenio) =>
    convenio.name.toLowerCase().includes(filtroNome.toLowerCase())
  );

  // Função para abrir o modal de edição
  const handleEditConvenio = (convenio) => {
    setSelectedConvenio(convenio);
    setIsEditing(true);
    setShowModal(true);
  };

  // Função para abrir o modal de adição
  const handleAddConvenio = () => {
    setSelectedConvenio(null);
    setIsEditing(false);
    setShowModal(true);
  };

  // Função para salvar o convênio (edição ou adição)
  const handleSaveConvenio = (convenio) => {
    if (isEditing) {
      // Atualiza o convênio existente
      setConvenios((prev) =>
        prev.map((c) => (c.id === convenio.id ? convenio : c))
      );
    } else {
      // Adiciona um novo convênio
      setConvenios((prev) => [...prev, { ...convenio, id: prev.length + 1 }]);
    }
    setShowModal(false);
  };

  // Colunas da tabela
  const columns = [
    {
      header: 'Nome do Convênio',
      accessor: 'name',
    },
    {
      header: 'Data de Criação',
      accessor: 'createdAt',
      render: (row) => row.createdAt.toLocaleDateString(), // Formata a data
    },
    {
      header: 'Última Atualização',
      accessor: 'updatedAt',
      render: (row) => row.updatedAt.toLocaleDateString(), // Formata a data
    },
  ];

  return (
    <div className="p-6">
      {/* Cabeçalho com botão "Novo Convênio" */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuração de Convênios</h1>
        <button
          onClick={handleAddConvenio}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Novo Convênio
        </button>
      </div>

      {/* Filtro de Pesquisa */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Filtrar por Nome</label>
        <input
          type="text"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          placeholder="Digite o nome do convênio"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tabela de Convênios */}
      <Table
        columns={columns}
        data={conveniosFiltrados}
        onRowDoubleClick={handleEditConvenio} // Abre o modal de edição ao dar duplo clique
      />

      {/* Modal de Edição/Adição */}
      {showModal && (
        <ModalConvenio
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveConvenio}
          convenio={selectedConvenio}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default ConfiguradorConvenios;