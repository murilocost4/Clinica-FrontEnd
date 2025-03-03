import React, { useState, useEffect } from 'react';

const ModalProfissional = ({ profissional, onSalvar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    especialidade: '',
    telefone: '',
  });

  // Preenche o formulário se estiver editando
  useEffect(() => {
    if (profissional) {
      setFormData(profissional);
    } else {
      setFormData({
        nome: '',
        cpf: '',
        especialidade: '',
        telefone: '',
      });
    }
  }, [profissional]);

  // Atualiza os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envia os dados para salvar
  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Especialidade</label>
        <input
          type="text"
          name="especialidade"
          value={formData.especialidade}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ModalProfissional;