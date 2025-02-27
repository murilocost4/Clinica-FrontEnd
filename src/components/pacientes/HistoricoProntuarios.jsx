const HistoricoProntuarios = ({ paciente }) => {
    return (
      <div className="space-y-4">
        {paciente?.prontuarios && paciente.prontuarios.length > 0 ? (
          paciente.prontuarios.map((prontuario) => (
            <div key={prontuario.id} className="border p-4 rounded-lg">
              <p className="text-gray-900">
                <strong>Data:</strong> {prontuario.dataConsulta}
              </p>
              <p className="text-gray-900">
                <strong>Médico:</strong> {prontuario.profissional}
              </p>
              <p className="text-gray-900">
                <strong>Diagnóstico:</strong> {prontuario.diagnostico}
              </p>
              <p className="text-gray-900">
                <strong>Tratamento:</strong> {prontuario.tratamento}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-900">Nenhum prontuário registrado.</p>
        )}
      </div>
    );
  };
  
  export default HistoricoProntuarios;