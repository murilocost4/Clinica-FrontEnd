import React from 'react';

const ProfissionalDetail = ({ profissional }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <p className="mt-1 text-gray-900">{profissional.nome}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <p className="mt-1 text-gray-900">{profissional.cpf}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Especialidade</label>
        <p className="mt-1 text-gray-900">{profissional.especialidade}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <p className="mt-1 text-gray-900">{profissional.telefone}</p>
      </div>
    </div>
  );
};

export default ProfissionalDetail;