import React from 'react';

const AgendamentoDetail = ({ agendamento }) => {
  if (!agendamento) {
    return <p className="text-gray-500">Nenhum agendamento selecionado.</p>;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
      <div>
        <label className="block text-sm font-medium text-gray-700">Paciente</label>
        <p className="mt-1 text-gray-900">{agendamento.paciente || 'Não informado'}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profissional</label>
        <p className="mt-1 text-gray-900">{agendamento.profissional || 'Não informado'}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
        <p className="mt-1 text-gray-900">
          {agendamento.dateTime ? new Date(agendamento.dateTime).toLocaleString() : 'Não definido'}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <p className={`mt-1 font-semibold ${agendamento.status === 'concluído' ? 'text-green-600' : 'text-yellow-600'}`}>
          {agendamento.status || 'Pendente'}
        </p>
      </div>
    </div>
  );
};

export default AgendamentoDetail;