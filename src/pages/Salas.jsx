import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Importando o componente de calendário
import 'react-calendar/dist/Calendar.css'; // Estilos do calendário
import ModalSolicitacoes from '../components/salas/ModalSolicitacoes'; // Componente do modal
import ModalNovaReserva from '../components/salas/ModalNovaReserva'; // Componente do modal de nova reserva

const Salas = () => {
  const [date, setDate] = useState(new Date()); // Estado para a data selecionada no calendário
  const [selectedSala, setSelectedSala] = useState(null); // Estado para a sala selecionada
  const [showModalSolicitacoes, setShowModalSolicitacoes] = useState(false); // Estado para controlar a exibição do modal de solicitações
  const [showModalNovaReserva, setShowModalNovaReserva] = useState(false); // Estado para controlar a exibição do modal de nova reserva

  // Dados fictícios das salas
  const salas = [
    {
      id: 1,
      numero: 'Sala 101',
      reserva: {
        profissional: 'Dr. João Silva',
        horario: '10:00 - 11:00',
      },
      solicitacoes: [
        { id: 1, paciente: 'Maria Oliveira', horario: '10:00 - 10:30' },
        { id: 2, paciente: 'Carlos Souza', horario: '10:30 - 11:00' },
      ],
    },
    {
      id: 2,
      numero: 'Sala 102',
      reserva: {
        profissional: 'Dra. Ana Costa',
        horario: '14:00 - 15:00',
      },
      solicitacoes: [
        { id: 3, paciente: 'Pedro Almeida', horario: '14:00 - 14:30' },
        { id: 4, paciente: 'Fernanda Lima', horario: '14:30 - 15:00' },
      ],
    },
    {
      id: 3,
      numero: 'Sala 103',
      reserva: null, // Sala sem reserva
      solicitacoes: [],
    },
  ];

  // Função para abrir o modal com as solicitações de agendamento
  const handleCardClick = (sala) => {
    setSelectedSala(sala);
    setShowModalSolicitacoes(true);
  };

  // Função para abrir o modal de nova reserva
  const handleNovaReservaClick = () => {
    setShowModalNovaReserva(true);
  };

  // Função para salvar uma nova reserva
  const handleSaveReservation = (salaId, profissional, horario) => {
    // Encontrar a sala e atualizar a reserva
    const updatedSalas = salas.map((sala) => {
      if (sala.id === salaId) {
        return {
          ...sala,
          reserva: {
            profissional,
            horario,
          },
        };
      }
      return sala;
    });
    // Atualizar as salas com a nova reserva
    console.log('Reservas atualizadas', updatedSalas);
    setShowModalNovaReserva(false); // Fechar o modal após salvar a reserva
  };

  return (
    <div className="p-6">
      {/* Cabeçalho com botão "Nova Reserva" */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Salas</h1>
        <button
          onClick={handleNovaReservaClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Nova Reserva
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex">
        {/* Cards das Salas */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salas.map((sala) => (
            <div
              key={sala.id}
              onClick={() => handleCardClick(sala)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800">{sala.numero}</h2>
              {sala.reserva ? (
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Profissional:</span> {sala.reserva.profissional}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Horário:</span> {sala.reserva.horario}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-gray-600">Nenhuma reserva para esta data.</p>
              )}
            </div>
          ))}
        </div>

        {/* Calendário */}
        <div className="ml-6">
          <Calendar
            onChange={setDate}
            value={date}
            className="bg-white rounded-lg shadow-md p-4"
          />
        </div>
      </div>

      {/* Modal de Solicitações */}
      {selectedSala && (
        <ModalSolicitacoes
          show={showModalSolicitacoes}
          onClose={() => setShowModalSolicitacoes(false)}
          sala={selectedSala}
        />
      )}

      {/* Modal de Nova Reserva */}
      <ModalNovaReserva
        show={showModalNovaReserva}
        onClose={() => setShowModalNovaReserva(false)}
        onSave={handleSaveReservation}
        salas={salas}
      />
    </div>
  );
};

export default Salas;
