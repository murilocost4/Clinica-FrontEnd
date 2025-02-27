import React from 'react';

const PacienteForm = ({ paciente, onSalvar, onCancelar }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const novoPaciente = {
          nome: formData.get('nome'),
          cpf: formData.get('cpf'),
          dataNascimento: formData.get('dataNascimento'),
          telefone: formData.get('telefone'),
          doencas: formData.get('doencas'),
          alergias: formData.get('alergias'),
          cirurgias: formData.get('cirurgias'),
        };
        onSalvar(novoPaciente);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            defaultValue={paciente?.nome || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            defaultValue={paciente?.cpf || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            defaultValue={paciente?.dataNascimento || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            name="telefone"
            defaultValue={paciente?.telefone || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Informações de Saúde */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800">Informações de Saúde</h2>
          <div className="mt-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Doenças</label>
              <textarea
                name="doencas"
                defaultValue={paciente?.doencas || ''}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alergias</label>
              <textarea
                name="alergias"
                defaultValue={paciente?.alergias || ''}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cirurgias</label>
              <textarea
                name="cirurgias"
                defaultValue={paciente?.cirurgias || ''}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>
          </div>
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

export default PacienteForm;