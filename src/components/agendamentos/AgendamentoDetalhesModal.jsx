import React from 'react';

const AgendamentoDetalhesModal = ({ 
  isOpen, 
  onClose, 
  agendamento, 
  onConfirmarPresenca, 
  onCancelar,
  nomePaciente,
  nomeProfissional
}) => {
  if (!isOpen) return null;

  const formatarDataHora = (dateTime) => {
    if (!dateTime) return 'N/A';
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
      }).format(new Date(dateTime));
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dateTime.toString();
    }
  };

  const getBadgeClass = (status) => {
    const statusMap = {
      'solicitado': 'bg-yellow-100 text-yellow-800',
      'confirmado': 'bg-blue-100 text-blue-800',
      'aguardando recepção': 'bg-orange-100 text-orange-800',
      'em atendimento': 'bg-green-100 text-green-800',
      'finalizado': 'bg-gray-100 text-gray-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Detalhes do Agendamento</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span className={`px-3 py-1 rounded-full ${getBadgeClass(agendamento.status)}`}>
                {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Paciente:</span>
              <span>{nomePaciente}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Profissional:</span>
              <span>{nomeProfissional}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Data e Hora:</span>
              <span>{formatarDataHora(agendamento.dateTime)}</span>
            </div>
            
            {agendamento.sala && (
              <div className="flex justify-between">
                <span className="font-semibold">Sala:</span>
                <span>{agendamento.sala.name || `Sala ${agendamento.sala.id}`}</span>
              </div>
            )}
            
            {agendamento.notes && (
              <div className="flex flex-col">
                <span className="font-semibold mb-1">Observações:</span>
                <p className="p-3 bg-gray-50 rounded">{agendamento.notes}</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            {/* Mostra botões condicionalmente com base no status */}
            {['solicitado', 'confirmado'].includes(agendamento.status.toLowerCase()) && (
              <>
                <button
                  onClick={onCancelar}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Cancelar Agendamento
                </button>
                
                <button
                  onClick={onConfirmarPresenca}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Confirmar Presença
                </button>
              </>
            )}
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoDetalhesModal;