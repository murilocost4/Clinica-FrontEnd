import React from 'react';

const PacienteDetail = ({ paciente }) => {
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

      {/* Informações de Saúde */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800">Informações de Saúde</h2>
        <div className="mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Doenças</label>
            <p className="mt-1 text-gray-900">{paciente.doencas || 'Nenhuma informação cadastrada'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alergias</label>
            <p className="mt-1 text-gray-900">{paciente.alergias || 'Nenhuma informação cadastrada'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cirurgias</label>
            <p className="mt-1 text-gray-900">{paciente.cirurgias || 'Nenhuma informação cadastrada'}</p>
          </div>
        </div>
      </div>

      {/* Histórico de Atendimentos */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800">Histórico de Atendimentos</h2>
        <div className="mt-2 space-y-4">
          {paciente.atendimentos && paciente.atendimentos.length > 0 ? (
            paciente.atendimentos.map((atendimento) => (
              <div key={atendimento.id} className="border p-4 rounded-lg">
                <p className="text-gray-900">
                  <strong>Data:</strong> {atendimento.data}
                </p>
                <p className="text-gray-900">
                  <strong>Médico:</strong> {atendimento.medico}
                </p>
                <p className="text-gray-900">
                  <strong>Descrição:</strong> {atendimento.descricao}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-900">Nenhum atendimento registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PacienteDetail;