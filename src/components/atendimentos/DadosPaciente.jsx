const DadosPaciente = ({ paciente }) => {
    // Verifica se o paciente existe
    if (!paciente) {
      return <p className="text-gray-900">Nenhum paciente selecionado.</p>;
    }
  
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Alergias</label>
          <p className="mt-1 text-gray-900">{paciente.alergias || 'Nenhuma'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Doenças Crônicas</label>
          <p className="mt-1 text-gray-900">{paciente.doencasCronicas || 'Nenhuma'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicamentos em Uso</label>
          <p className="mt-1 text-gray-900">{paciente.medicamentosEmUso || 'Nenhum'}</p>
        </div>
      </div>
    );
  };
  
  export default DadosPaciente;