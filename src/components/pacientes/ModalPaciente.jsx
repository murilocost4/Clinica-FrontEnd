import React, { useState } from 'react';
import InformacoesPessoais from './InformacoesPessoais';
import InformacoesSaude from './InformacoesSaude';
import HistoricoProntuarios from './HistoricoProntuarios';

const ModalPaciente = ({ paciente, onSalvar, onCancelar }) => {
  const [abaAtiva, setAbaAtiva] = useState('informacoesPessoais');

  const handleSalvar = () => {
    // Lógica para salvar os dados do paciente
    onSalvar(paciente);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {paciente ? 'Editar Paciente' : 'Adicionar Paciente'}
          </h2>
        </div>

        {/* Abas */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setAbaAtiva('informacoesPessoais')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'informacoesPessoais'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Informações Pessoais
            </button>
            <button
              onClick={() => setAbaAtiva('informacoesSaude')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'informacoesSaude'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Informações de Saúde
            </button>
            <button
              onClick={() => setAbaAtiva('historicoProntuarios')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'historicoProntuarios'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Histórico/Prontuários
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div>
            {abaAtiva === 'informacoesPessoais' && (
              <InformacoesPessoais paciente={paciente} />
            )}
            {abaAtiva === 'informacoesSaude' && (
              <InformacoesSaude paciente={paciente} />
            )}
            {abaAtiva === 'historicoProntuarios' && (
              <HistoricoProntuarios paciente={paciente} />
            )}
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-6 border-t flex justify-end space-x-2">
          <button
            onClick={onCancelar}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPaciente;