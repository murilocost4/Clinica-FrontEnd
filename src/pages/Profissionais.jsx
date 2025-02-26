import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import ProfissionalList from '../components/profissionais/ProfissionalList';
import ProfissionalForm from '../components/profissionais/ProfissionalForm';

const Profissionais = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profissionalEditando, setProfissionalEditando] = useState(null);

  const [profissionais, setProfissionais] = useState([
    { id: 1, nome: 'Dr. Ana', cpf: '123.456.789-00', especialidade: 'Cardiologia', telefone: '(11) 99999-9999' },
    { id: 2, nome: 'Dr. Carlos', cpf: '987.654.321-00', especialidade: 'Ortopedia', telefone: '(11) 88888-8888' },
    { id: 3, nome: 'Dr. Pedro', cpf: '456.789.123-00', especialidade: 'Pediatria', telefone: '(11) 77777-7777' },
  ]);

  const handleAbrirModal = () => {
    setProfissionalEditando(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleSalvarProfissional = (profissional) => {
    if (profissionalEditando) {
      setProfissionais((prev) =>
        prev.map((p) => (p.id === profissionalEditando.id ? { ...p, ...profissional } : p))
      );
    } else {
      setProfissionais((prev) => [...prev, { ...profissional, id: prev.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditarProfissional = (id) => {
    const profissional = profissionais.find((p) => p.id === id);
    setProfissionalEditando(profissional);
    setIsModalOpen(true);
  };

  const handleExcluirProfissional = (id) => {
    setProfissionais((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      {/* Título e Botão de Adicionar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profissionais</h1>
        <button
          onClick={handleAbrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Profissional
        </button>
      </div>

      {/* Lista de Profissionais */}
      <ProfissionalList
        profissionais={profissionais}
        onEditar={handleEditarProfissional}
        onExcluir={handleExcluirProfissional}
      />

      {/* Modal de Cadastro/Edição */}
      <Modal isOpen={isModalOpen} onClose={handleFecharModal}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {profissionalEditando ? 'Editar Profissional' : 'Adicionar Profissional'}
        </h2>
        <ProfissionalForm
          profissional={profissionalEditando}
          onSalvar={handleSalvarProfissional}
          onCancelar={handleFecharModal}
        />
      </Modal>
    </div>
  );
};

export default Profissionais;