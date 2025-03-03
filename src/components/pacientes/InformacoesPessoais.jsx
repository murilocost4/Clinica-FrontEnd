import React from 'react';

const InformacoesPessoais = ({ paciente, onChange }) => {
  const handleChange = (field, value) => {
    const updatedPaciente = { ...paciente, [field]: value };
    onChange(updatedPaciente); // Notifica o componente pai sobre a mudança
  };

  const handleAddressChange = (field, value) => {
    const updatedPaciente = {
      ...paciente,
      address: {
        ...paciente.address,
        [field]: value,
      },
    };
    onChange(updatedPaciente); // Notifica o componente pai sobre a mudança
  };

  const handleBirthDateChange = (e) => {
    const dateValue = e.target.value; // Valor no formato YYYY-MM-DD
    const isoDate = new Date(dateValue).toISOString(); // Converte para ISO-8601
    handleChange('birthDate', isoDate); // Atualiza o estado com a data no formato ISO
  };

  return (
    <div className="space-y-4">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={paciente?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* CPF */}
      <div>
        <label className="block text-sm font-medium text-gray-700">CPF</label>
        <input
          type="text"
          value={paciente?.cpf || ''}
          onChange={(e) => handleChange('cpf', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Data de Nascimento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
        <input
          type="date"
          value={paciente?.birthDate ? paciente.birthDate.split('T')[0] : ''}
          onChange={handleBirthDateChange} // Usa a função de formatação
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Gênero */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Gênero</label>
        <select
          value={paciente?.gender || ''}
          onChange={(e) => handleChange('gender', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      {/* Estado Civil */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Estado Civil</label>
        <select
          value={paciente?.maritalStatus || ''}
          onChange={(e) => handleChange('maritalStatus', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione</option>
          <option value="Solteiro(a)">Solteiro(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Viúvo(a)">Viúvo(a)</option>
        </select>
      </div>

      {/* Nome do Pai */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Pai</label>
        <input
          type="text"
          value={paciente?.fatherName || ''}
          onChange={(e) => handleChange('fatherName', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Nome da Mãe */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome da Mãe</label>
        <input
          type="text"
          value={paciente?.motherName || ''}
          onChange={(e) => handleChange('motherName', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          value={paciente?.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Endereço */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Endereço</label>
        <div className="space-y-2">
          {/* Rua */}
          <input
            type="text"
            value={paciente?.address?.street || ''}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            placeholder="Rua"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Número */}
          <input
            type="text"
            value={paciente?.address?.number || ''}
            onChange={(e) => handleAddressChange('number', e.target.value)}
            placeholder="Número"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Complemento */}
          <input
            type="text"
            value={paciente?.address?.complement || ''}
            onChange={(e) => handleAddressChange('complement', e.target.value)}
            placeholder="Complemento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Bairro */}
          <input
            type="text"
            value={paciente?.address?.neighborhood || ''}
            onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
            placeholder="Bairro"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Cidade */}
          <input
            type="text"
            value={paciente?.address?.city || ''}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            placeholder="Cidade"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Estado */}
          <input
            type="text"
            value={paciente?.address?.state || ''}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            placeholder="Estado"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* CEP */}
          <input
            type="text"
            value={paciente?.address?.zipCode || ''}
            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            placeholder="CEP"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Campos de Login */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={paciente?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            value={paciente?.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Campo Role (oculto) */}
      <input
        type="hidden"
        value="Paciente" // Valor fixo
        onChange={(e) => handleChange('role', e.target.value)}
      />
    </div>
  );
};

export default InformacoesPessoais;