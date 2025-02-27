import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import ProntuarioList from '../components/prontuarios/ProntuarioList';
import ProntuarioForm from '../components/prontuarios/ProntuarioForm';

const Prontuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prontuarioEditando, setProntuarioEditando] = useState(null);

  const [prontuarios, setProntuarios] = useState([
    {
      id: 1,
      dataAtendimento: '2023-10-01',
      medico: 'Dr. João Silva',
      descricao: 'Consulta de rotina',
      prescricao: 'Repouso e medicamento X',
    },
    {
      id: 2,
      dataAtendimento: '2023-10-05',
      medico: 'Dra. Maria Souza',
      descricao: 'Acompanhamento pós-cirúrgico',
      prescricao: 'Fisioterapia e medicamento Y',
    },
  ]);

  const handleAbrirModal = () => {
    setProntuarioEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarProntuario = (prontuario) => {
    if (prontuarioEditando) {
      setProntuarios((prev) =>
        prev.map((p) => (p.id === prontuarioEditando.id ? { ...p, ...prontuario } : p))
      );
    } else {
      setProntuarios((prev) => [...prev, { ...prontuario, id: prev.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditarProntuario = (id) => {
    const prontuario = prontuarios.find((p) => p.id === id);
    setProntuarioEditando(prontuario);
    setIsModalOpen(true);
  };

  const handleExcluirProntuario = (id) => {
    setProntuarios((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Prontuários</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Prontuário
        </button>
      </div>

      <ProntuarioList
        prontuarios={prontuarios}
        onEditar={handleEditarProntuario}
        onExcluir={handleExcluirProntuario}
      />

      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {prontuarioEditando ? 'Editar Prontuário' : 'Adicionar Prontuário'}
        </h2>
        <ProntuarioForm
          prontuario={prontuarioEditando}
          onSalvar={handleSalvarProntuario}
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Prontuarios;