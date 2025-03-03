import React, { useState } from 'react';

const ModalNovaReserva = ({ show, onClose, onSave, salas }) => {
  const [selectedSala, setSelectedSala] = useState('');
  const [profissional, setProfissional] = useState('');
  const [horario, setHorario] = useState('');

  const handleSave = () => {
    if (!selectedSala || !profissional || !horario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave(selectedSala, profissional, horario);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-90 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Nova Reserva</h2>

        <div className="mb-4">
          <label htmlFor="sala" className="block text-gray-700">Sala</label>
          <select
            id="sala"
            value={selectedSala}
            onChange={(e) => setSelectedSala(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Selecione a sala</option>
            {salas.map((sala) => (
              <option key={sala.id} value={sala.id}>{sala.numero}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="profissional" className="block text-gray-700">Profissional</label>
          <input
            type="text"
            id="profissional"
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Nome do profissional"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="horario" className="block text-gray-700">Horário</label>
          <input
            type="text"
            id="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Ex: 10:00 - 11:00"
          />
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg">Cancelar</button>
          <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovaReserva;
