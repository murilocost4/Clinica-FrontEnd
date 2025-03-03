import React, { useState } from 'react';
import InformacoesPessoais from './InformacoesPessoais'; // Reutilize o componente de informações pessoais

const ModalProfissional = ({ profissional, onSalvar, onCancelar }) => {
  const [dadosProfissional, setDadosProfissional] = useState({
    ...profissional,
    role: 'Profissional', // Valor padrão
  });

  // Função para salvar os dados do profissional
  const handleSalvar = () => {
    onSalvar(dadosProfissional); // Passa os dados atualizados para o componente pai
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {dadosProfissional.id ? 'Editar Profissional' : 'Adicionar Profissional'}
          </h2>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 flex-1 overflow-y-auto">
          <InformacoesPessoais
            paciente={dadosProfissional} // Reutiliza o mesmo componente
            onChange={setDadosProfissional} // Atualiza os dados do profissional
          />
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