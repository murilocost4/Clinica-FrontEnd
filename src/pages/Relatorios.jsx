import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2'; // Para gráficos
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Chart.js para gráficos
import 'chart.js/auto'; // Importando o estilo do Chart.js

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Relatorios = () => {
  const [filtroPeriodo, setFiltroPeriodo] = useState('mensal'); // Filtro de período para relatórios
  const [data, setData] = useState({
    reservas: 250,
    solicitacoesPendentes: 15,
    solicitacoesConfirmadas: 220,
    salasMaisUsadas: [
      { sala: 'Sala 101', reservas: 80 },
      { sala: 'Sala 102', reservas: 70 },
      { sala: 'Sala 103', reservas: 100 },
    ],
    profissionaisMaisRequisitados: [
      { profissional: 'Dr. João Silva', reservas: 100 },
      { profissional: 'Dra. Ana Costa', reservas: 150 },
    ],
  });

  // Gráficos de Reservas por Sala
  const chartDataSala = {
    labels: data.salasMaisUsadas.map((item) => item.sala),
    datasets: [
      {
        label: 'Reservas por Sala',
        data: data.salasMaisUsadas.map((item) => item.reservas),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Gráficos de Profissionais Mais Requisitados
  const chartDataProfissional = {
    labels: data.profissionaisMaisRequisitados.map((item) => item.profissional),
    datasets: [
      {
        label: 'Reservas por Profissional',
        data: data.profissionaisMaisRequisitados.map((item) => item.reservas),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Indicadores gerais de reservas e solicitações
  const indicadores = [
    { title: 'Total de Reservas', value: data.reservas },
    { title: 'Solicitações Pendentes', value: data.solicitacoesPendentes },
    { title: 'Solicitações Confirmadas', value: data.solicitacoesConfirmadas },
  ];

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios Gerais</h1>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor="filtroPeriodo" className="mr-4 text-gray-700">Período:</label>
          <select
            id="filtroPeriodo"
            value={filtroPeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="mensal">Mensal</option>
            <option value="semanal">Semanal</option>
            <option value="diario">Diário</option>
            <option value="anual">Anual</option>
          </select>
        </div>
      </div>

      {/* Indicadores gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {indicadores.map((indicator) => (
          <div
            key={indicator.title}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h3 className="text-xl font-semibold text-gray-700">{indicator.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{indicator.value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservas por Sala</h3>
          <Bar data={chartDataSala} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservas por Profissional</h3>
          <Bar data={chartDataProfissional} options={{ responsive: true }} />
        </div>
      </div>

      {/* Relatório de Solicitações */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatório de Solicitações</h3>
        <Pie
          data={{
            labels: ['Pendente', 'Confirmada', 'Cancelada'],
            datasets: [
              {
                data: [
                  data.solicitacoesPendentes,
                  data.solicitacoesConfirmadas,
                  0, // Valor fictício para 'Cancelada' (poderia ser adicionado no estado)
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 159, 64, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Relatorios;
