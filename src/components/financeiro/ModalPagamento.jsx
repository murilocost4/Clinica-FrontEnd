import React from 'react';

const ModalPagamento = ({ show, onClose, onConfirm, paciente }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm shadow-2xl backdrop-brightness-90 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold">Realizar Pagamento</h2>
        <p>Paciente: {paciente.nome}</p>
        <p>Valor: R${paciente.valor}</p>
        <p>Convênio: {paciente.convênio}</p>

        <div className="mt-4">
          <label className="block text-gray-700">Forma de pagamento</label>
          <select className="mt-2 p-2 w-full">
            <option value="cartao">Cartão de crédito</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Confirmar pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPagamento;
