const HistoricoAtendimentos = ({ profissional }) => {
    return (
      <div className="space-y-4">
        {profissional?.atendimentos && profissional.atendimentos.length > 0 ? (
          profissional.atendimentos.map((atendimento) => (
            <div key={atendimento.id} className="border p-4 rounded-lg">
              <p className="text-gray-900">
                <strong>Data:</strong> {atendimento.data}
              </p>
              <p className="text-gray-900">
                <strong>Paciente:</strong> {atendimento.paciente}
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
    );
  };
  
  export default HistoricoAtendimentos;