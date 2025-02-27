import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import PacienteList from '../components/pacientes/PacienteList';
import ModalPaciente from '../components/pacientes/ModalPaciente'; // Importando o novo modal com abas

const Pacientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      dataNascimento: '1990-01-01',
      telefone: '(11) 99999-9999',
      doencas: 'Hipertensão',
      alergias: 'Penicilina',
      cirurgias: 'Apêndice (2015)',
      atendimentos: [
        {
          id: 1,
          data: '2023-10-01',
          medico: 'Dr. João Silva',
          descricao: 'Consulta de rotina',
        },
        {
          id: 2,
          data: '2023-10-05',
          medico: 'Dra. Maria Souza',
          descricao: 'Acompanhamento pós-cirúrgico',
        },
      ],
    },
    {
      id: 2,
      nome: 'Maria Souza',
      cpf: '987.654.321-00',
      dataNascimento: '1985-05-15',
      telefone: '(11) 88888-8888',
      doencas: 'Diabetes',
      alergias: 'Nenhuma',
      cirurgias: 'Nenhuma',
      atendimentos: [],
    },
  ]);

  const handleAbrirModal = () => {
    setPacienteEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarPaciente = (paciente) => {
    if (pacienteEditando) {
      // Atualiza o paciente existente
      setPacientes((prev) =>
        prev.map((p) => (p.id === pacienteEditando.id ? { ...p, ...paciente } : p))
      );
    } else {
      // Adiciona um novo paciente
      setPacientes((prev) => [
        ...prev,
        {
          ...paciente,
          id: prev.length + 1,
          atendimentos: [], // Inicializa o histórico de atendimentos vazio
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleEditarPaciente = (id) => {
    const paciente = pacientes.find((p) => p.id === id);
    setPacienteEditando(paciente);
    setIsModalOpen(true);
  };

  const handleExcluirPaciente = (id) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Paciente
        </button>
      </div>

      {/* Lista de Pacientes */}
      <PacienteList
        pacientes={pacientes}
        onEditar={handleEditarPaciente}
        onExcluir={handleExcluirPaciente}
      />

      {/* Modal de Cadastro/Edição */}
      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <ModalPaciente
          paciente={pacienteEditando}
          onSalvar={handleSalvarPaciente}
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Pacientes;