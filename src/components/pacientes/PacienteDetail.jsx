import React from 'react';

const PacienteDetail = ({ paciente }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <p className="mt-1 text-gray-900">{paciente.nome}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <p className="mt-1 text-gray-900">{paciente.cpf}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
        <p className="mt-1 text-gray-900">{paciente.dataNascimento}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <p className="mt-1 text-gray-900">{paciente.telefone}</p>
      </div>
    </div>
  );
};

export default PacienteDetail;