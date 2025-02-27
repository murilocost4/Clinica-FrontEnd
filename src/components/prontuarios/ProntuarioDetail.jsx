import React from 'react';

const ProntuarioDetail = ({ prontuario }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Data do Atendimento</label>
        <p className="mt-1 text-gray-900">{prontuario.dataAtendimento}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Médico Responsável</label>
        <p className="mt-1 text-gray-900">{prontuario.medico}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <p className="mt-1 text-gray-900">{prontuario.descricao}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prescrição</label>
        <p className="mt-1 text-gray-900">{prontuario.prescricao}</p>
      </div>
    </div>
  );
};

export default ProntuarioDetail;