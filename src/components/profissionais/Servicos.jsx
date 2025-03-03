import React from 'react';

const Servicos = ({ profissional }) => {
  // Exemplo de estrutura de dados para serviços
  const servicos = Array.isArray(profissional?.servicos) ? profissional.servicos : [
    {
      descricao: 'Consulta Clínica',
      valores: {
        ConvênioA: 150,
        ConvênioB: 120,
        Particular: 200,
      },
    },
    {
      descricao: 'Exame de Sangue',
      valores: {
        ConvênioA: 80,
        ConvênioB: 70,
        Particular: 100,
      },
    },
  ];
  

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Serviços Oferecidos</label>
        <div className="mt-4 space-y-6">
          {servicos.map((servico, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{servico.descricao}</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(servico.valores).map(([convenio, valor]) => (
                  <div key={convenio} className="flex justify-between text-sm text-gray-600">
                    <span>{convenio}</span>
                    <span>R$ {valor.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicos;