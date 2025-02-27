import React, { useState } from 'react';
import DadosPessoais from './DadosPessoais';
import Servicos from './Servicos';
import HistoricoAtendimentos from './HistoricoAtendimentos';

const ModalProfissional = ({ profissional, onSalvar, onCancelar }) => {
  const [abaAtiva, setAbaAtiva] = useState('dadosPessoais');

  const handleSalvar = () => {
    // Lógica para salvar os dados do profissional
    onSalvar(profissional);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {profissional ? 'Editar Profissional' : 'Adicionar Profissional'}
          </h2>
        </div>

        {/* Abas */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setAbaAtiva('dadosPessoais')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'dadosPessoais'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Dados Pessoais
            </button>
            <button
              onClick={() => setAbaAtiva('servicos')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'servicos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => setAbaAtiva('historicoAtendimentos')}
              className={`px-4 py-2 rounded-lg ${
                abaAtiva === 'historicoAtendimentos'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Histórico de Atendimentos
            </button>
          </div>

          {/* Conteúdo das Abas */}
          <div>
            {abaAtiva === 'dadosPessoais' && (
              <DadosPessoais profissional={profissional} />
            )}
            {abaAtiva === 'servicos' && (
              <Servicos profissional={profissional} />
            )}
            {abaAtiva === 'historicoAtendimentos' && (
              <HistoricoAtendimentos profissional={profissional} />
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

export default ModalProfissional;