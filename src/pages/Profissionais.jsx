import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import ProfissionalList from '../components/profissionais/ProfissionalList';
import ModalProfissional from '../components/profissionais/ModalProfissional';
import {
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../services/Usuarios';

const Profissionais = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profissionalEditando, setProfissionalEditando] = useState(null);
  const [recarregarLista, setRecarregarLista] = useState(false);

  const handleAbrirModal = () => {
    setProfissionalEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarProfissional = async (profissional) => {
    try {
      console.log('Dados do profissional a serem enviados:', profissional);

      if (profissionalEditando) {
        await updateUsuario(profissionalEditando.id, profissional);
      } else {
        await createUsuario(profissional);
      }

      setIsModalOpen(false);
      setRecarregarLista((prev) => !prev);
    } catch (error) {
      console.error('Erro ao salvar profissional:', error.response?.data || error.message);
      alert('Erro ao salvar profissional.');
    }
  };

  const handleEditarProfissional = (profissional) => {
    setProfissionalEditando(profissional);
    setIsModalOpen(true);
  };

  const handleExcluirProfissional = async (profissional) => {
    try {
      await deleteUsuario(profissional.id);
      setRecarregarLista((prev) => !prev);
    } catch (error) {
      console.error('Erro ao excluir profissional:', error.response?.data || error.message);
      alert('Erro ao excluir profissional.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profissionais</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Profissional
        </button>
      </div>

      <ProfissionalList
        onEditar={handleEditarProfissional}
        onExcluir={handleExcluirProfissional}
        recarregarLista={recarregarLista}
      />

      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <ModalProfissional
          profissional={profissionalEditando}
          onSalvar={handleSalvarProfissional}
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Profissionais;