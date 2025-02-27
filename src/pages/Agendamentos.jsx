import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import AgendamentoList from '../components/agendamentos/AgendamentoList';
import AgendamentoForm from '../components/agendamentos/AgendamentoForm';

const Agendamentos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendamentoEditando, setAgendamentoEditando] = useState(null);

  const [agendamentos, setAgendamentos] = useState([
    { id: 1, paciente: 'João Silva', profissional: 'Dr. Ana', dataHora: '2023-10-01T10:00', status: 'agendado' },
    { id: 2, paciente: 'Maria Souza', profissional: 'Dr. Carlos', dataHora: '2023-10-01T11:00', status: 'agendado' },
    { id: 3, paciente: 'Pedro Oliveira', profissional: 'Dr. Ana', dataHora: '2023-10-01T14:00', status: 'realizado' },
  ]);

  const handleAbrirModal = () => {
    setAgendamentoEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarAgendamento = (agendamento) => {
    if (agendamentoEditando) {
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === agendamentoEditando.id ? { ...a, ...agendamento } : a))
      );
    } else {
      setAgendamentos((prev) => [...prev, { ...agendamento, id: prev.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditarAgendamento = (id) => {
    const agendamento = agendamentos.find((a) => a.id === id);
    setAgendamentoEditando(agendamento);
    setIsModalOpen(true);
  };

  const handleExcluirAgendamento = (id) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      {/* Título e Botão de Adicionar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Agendamentos</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Agendamento
        </button>
      </div>

      {/* Lista de Agendamentos */}
      <AgendamentoList
        agendamentos={agendamentos}
        onEditar={handleEditarAgendamento}
        onExcluir={handleExcluirAgendamento}
      />

      {/* Modal de Cadastro/Edição */}
      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {agendamentoEditando ? 'Editar Agendamento' : 'Adicionar Agendamento'}
        </h2>
        <AgendamentoForm
          agendamento={agendamentoEditando}
          onSalvar={handleSalvarAgendamento}
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Agendamentos;