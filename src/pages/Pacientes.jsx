import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import PacienteList from '../components/pacientes/PacienteList';
import ModalPaciente from '../components/pacientes/ModalPaciente';
import { createUsuario, updateUsuario } from '../services/Usuarios'; // Importe as funções da API

const Pacientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  // Abrir modal para adicionar ou editar paciente
  const handleAbrirModal = () => {
    setPacienteEditando(null); // Limpa o paciente em edição
    setIsModalOpen(true);
  };

  // Fechar modal
  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarPaciente = async (paciente) => {
    try {
      console.log('Dados do paciente a serem enviados:', paciente); // Depuração
  
      // Garante que o campo 'birthDate' está no formato ISO-8601
      const payload = {
        ...paciente,
        birthDate: new Date(paciente.birthDate).toISOString(), // Converte para ISO-8601
      };
  
      if (paciente.id) {
        await updateUsuario(paciente.id, payload);
      } else {
        await createUsuario(payload);
      }
      setIsModalOpen(false); // Fecha o modal após salvar
    } catch (error) {
      console.error('Erro ao salvar paciente:', error.response?.data || error.message); // Depuração
      alert('Erro ao salvar paciente.');
    }
  };

  // Editar paciente
  const handleEditarPaciente = (paciente) => {
    setPacienteEditando(paciente); // Define o paciente em edição
    setIsModalOpen(true); // Abre o modal
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
      <PacienteList onEditar={handleEditarPaciente} />

      {/* Modal de Cadastro/Edição */}
      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <ModalPaciente
          paciente={pacienteEditando}
          onSalvar={handleSalvarPaciente} // Passa a função de salvar
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Pacientes;