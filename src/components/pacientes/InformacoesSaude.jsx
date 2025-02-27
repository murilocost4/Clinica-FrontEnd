const InformacoesSaude = ({ paciente }) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Alergias</label>
          <textarea
            defaultValue={paciente?.alergias || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Doenças Crônicas</label>
          <textarea
            defaultValue={paciente?.doencasCronicas || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicamentos em Uso</label>
          <textarea
            defaultValue={paciente?.medicamentosEmUso || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
      </div>
    );
  };
  
  export default InformacoesSaude;