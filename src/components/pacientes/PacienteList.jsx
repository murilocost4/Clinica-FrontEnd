import React from 'react';
import Table from '../common/Table';

const PacienteList = ({ pacientes, onEditar, onExcluir }) => {
  // Função para lidar com o double-click na linha
  const handleDoubleClick = (id) => {
    onEditar(id);
  };

  const columns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'CPF', accessor: 'cpf' },
    { header: 'Data de Nascimento', accessor: 'dataNascimento' },
    { header: 'Telefone', accessor: 'telefone' },
    {
      header: 'Ações',
      accessor: 'id',
      render: (id) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onExcluir(id)}
            className="text-red-600 hover:text-red-800"
          >
            {/* Ícone de lixeira */}
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
      <Table
        columns={columns}
        data={pacientes}
        onRowDoubleClick={(row) => handleDoubleClick(row.id)} // Adiciona o evento de double-click
      />
    </div>
  );
};

export default PacienteList;