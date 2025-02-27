const Servicos = ({ profissional }) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Serviços Oferecidos</label>
          <textarea
            defaultValue={profissional?.servicos || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>
      </div>
    );
  };
  
  export default Servicos;