import React, { useEffect } from 'react';

const ModalSolicitacoes = ({ show, onClose, sala }) => {
  // Fechar modal ao clicar fora
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Fecha o modal se o clique for no backdrop
    }
  };

  // Evitar o fechamento do modal ao clicar no conteúdo interno
  useEffect(() => {
    if (!show) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose(); // Fecha o modal se a tecla ESC for pressionada
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm backdrop-brightness-90 z-50 flex items-center justify-center p-4"
      onClick={handleOutsideClick} // Manipula o clique fora do modal
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
        onClick={(e) => e.stopPropagation()} // Impede o clique dentro do modal de fechar o modal
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Solicitações de Agendamento</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Lista de Solicitações */}
        <div className="space-y-4">
          {sala.solicitacoes.length > 0 ? (
            sala.solicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">
                  <span className="font-medium">Paciente:</span> {solicitacao.paciente}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Horário:</span> {solicitacao.horario}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhuma solicitação de agendamento para esta sala.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSolicitacoes;
