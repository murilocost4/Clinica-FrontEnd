import React from 'react';
import Modal from './Modal'; // Reutilize o componente Modal existente

const ModalConfirmacao = ({ isOpen, onClose, onConfirm, titulo, mensagem }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h2>
        <p className="text-gray-700 mb-6">{mensagem}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmacao;