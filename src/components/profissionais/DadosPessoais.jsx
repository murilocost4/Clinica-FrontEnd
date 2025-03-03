import React from 'react';

const DadosPessoais = ({ profissional }) => {
  return (
    <div className="space-y-6">
      {/* Seção: Dados Pessoais */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Dados Pessoais</h2>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            defaultValue={profissional?.name || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            defaultValue={profissional?.cpf || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            defaultValue={profissional?.phone || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            defaultValue={profissional?.birthDate ? profissional.birthDate.toISOString().split('T')[0] : ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gênero</label>
          <select
            defaultValue={profissional?.gender || ''}
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
            defaultValue={profissional?.maritalStatus || ''}
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
            defaultValue={profissional?.fatherName || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Nome da Mãe */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Mãe</label>
          <input
            type="text"
            defaultValue={profissional?.motherName || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Seção: Endereço */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Endereço</h2>

        <div className="space-y-2">
          {/* Rua */}
          <input
            type="text"
            defaultValue={profissional?.address?.street || ''}
            placeholder="Rua"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Número */}
          <input
            type="text"
            defaultValue={profissional?.address?.number || ''}
            placeholder="Número"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Complemento */}
          <input
            type="text"
            defaultValue={profissional?.address?.complement || ''}
            placeholder="Complemento"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Bairro */}
          <input
            type="text"
            defaultValue={profissional?.address?.neighborhood || ''}
            placeholder="Bairro"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Cidade */}
          <input
            type="text"
            defaultValue={profissional?.address?.city || ''}
            placeholder="Cidade"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Estado */}
          <input
            type="text"
            defaultValue={profissional?.address?.state || ''}
            placeholder="Estado"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {/* CEP */}
          <input
            type="text"
            defaultValue={profissional?.address?.zipCode || ''}
            placeholder="CEP"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Seção: Dados Profissionais */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Dados Profissionais</h2>

        {/* Documento Profissional (CRM/CRF) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Documento Profissional (CRM/CRF)</label>
          <input
            type="text"
            defaultValue={profissional?.professionalDocument || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Especialidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Especialidade</label>
          <input
            type="text"
            defaultValue={profissional?.specialty || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Instituição de Formação */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Instituição de Formação</label>
          <input
            type="text"
            defaultValue={profissional?.institution || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Ano de Formação */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ano de Formação</label>
          <input
            type="number"
            defaultValue={profissional?.graduationYear || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DadosPessoais;