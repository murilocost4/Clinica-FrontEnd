import React from 'react';

const ModalAtendimento = ({ show, onClose, onConfirm, paciente }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm shadow-2xl backdrop-brightness-90 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold">Atendimento ao Paciente</h2>
        <p>Paciente: {paciente.nome}</p>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Anamnese</h3>
          <p>{paciente.anamnese}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Prontuário</h3>
          <textarea
            className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg"
            placeholder="Preencha o prontuário do paciente..."
          />
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Prescrição</h3>
          <textarea
            className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg"
            placeholder="Preencha a prescrição do paciente..."
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Finalizar Atendimento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAtendimento;
