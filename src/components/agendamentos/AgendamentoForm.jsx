import React from 'react';

const AgendamentoForm = ({ agendamento, onSalvar, onCancelar }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const novoAgendamento = {
          paciente: formData.get('paciente'),
          profissional: formData.get('profissional'),
          dataHora: formData.get('dataHora'),
          status: formData.get('status'),
        };
        onSalvar(novoAgendamento);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Paciente</label>
          <input
            type="text"
            name="paciente"
            defaultValue={agendamento?.paciente || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profissional</label>
          <input
            type="text"
            name="profissional"
            defaultValue={agendamento?.profissional || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
          <input
            type="datetime-local"
            name="dataHora"
            defaultValue={agendamento?.dataHora || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            defaultValue={agendamento?.status || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="agendado">Agendado</option>
            <option value="cancelado">Cancelado</option>
            <option value="realizado">Realizado</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AgendamentoForm;