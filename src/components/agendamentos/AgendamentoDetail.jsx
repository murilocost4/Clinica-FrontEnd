import React from 'react';

const AgendamentoDetail = ({ agendamento }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Paciente</label>
        <p className="mt-1 text-gray-900">{agendamento.paciente}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profissional</label>
        <p className="mt-1 text-gray-900">{agendamento.profissional}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
        <p className="mt-1 text-gray-900">{agendamento.dataHora}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <p className="mt-1 text-gray-900">{agendamento.status}</p>
      </div>
    </div>
  );
};

export default AgendamentoDetail;