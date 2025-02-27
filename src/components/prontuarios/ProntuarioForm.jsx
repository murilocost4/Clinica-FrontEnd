import React from 'react';

const ProntuarioForm = ({ prontuario, onSalvar, onCancelar }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const novoProntuario = {
          dataAtendimento: formData.get('dataAtendimento'),
          medico: formData.get('medico'),
          descricao: formData.get('descricao'),
          prescricao: formData.get('prescricao'),
        };
        onSalvar(novoProntuario);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data do Atendimento</label>
          <input
            type="date"
            name="dataAtendimento"
            defaultValue={prontuario?.dataAtendimento || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Médico Responsável</label>
          <input
            type="text"
            name="medico"
            defaultValue={prontuario?.medico || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            defaultValue={prontuario?.descricao || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prescrição</label>
          <textarea
            name="prescricao"
            defaultValue={prontuario?.prescricao || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
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

export default ProntuarioForm;