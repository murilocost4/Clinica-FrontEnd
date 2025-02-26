import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Table from '../components/common/Table';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registre os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  // Dados para as métricas rápidas
  const metrics = [
    { title: 'Pacientes Cadastrados', value: '1,234' },
    { title: 'Agendamentos Hoje', value: '45' },
    { title: 'Receita do Mês', value: 'R$ 12,345' },
  ];

  // Dados para o gráfico de barras (Agendamentos por dia da semana)
  const barChartData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Agendamentos',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: '#3B82F6',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de pizza (Distribuição de pacientes por gênero)
  const pieChartData = {
    labels: ['Masculino', 'Feminino', 'Outros'],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: ['#3B82F6', '#EF4444', '#10B981'],
        hoverBackgroundColor: ['#2563EB', '#DC2626', '#059669'],
      },
    ],
  };

  // Dados para a tabela de últimos agendamentos
  const lastAppointments = [
    { id: 1, paciente: 'João Silva', profissional: 'Dr. Ana', data: '2023-10-01 10:00' },
    { id: 2, paciente: 'Maria Souza', profissional: 'Dr. Carlos', data: '2023-10-01 11:00' },
    { id: 3, paciente: 'Pedro Oliveira', profissional: 'Dr. Ana', data: '2023-10-01 14:00' },
  ];

  const columns = [
    { header: 'Paciente', accessor: 'paciente' },
    { header: 'Profissional', accessor: 'profissional' },
    { header: 'Data', accessor: 'data' },
  ];

  return (
    <div className="p-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-600">{metric.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Agendamentos por Dia da Semana
          </h3>
          <div className="h-64"> {/* Altura fixa para o gráfico */}
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Distribuição de Pacientes por Gênero
          </h3>
          <div className="h-64"> {/* Altura fixa para o gráfico */}
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      {/* Últimos Agendamentos */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Últimos Agendamentos</h3>
        <Table columns={columns} data={lastAppointments} />
      </div>

      {/* Informações Úteis */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Informações Úteis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/pacientes"
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-xl font-bold text-blue-600 mb-2">Pacientes</h4>
            <p className="text-gray-600">Gerencie os pacientes da clínica.</p>
          </a>
          <a
            href="/agendamentos"
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-xl font-bold text-blue-600 mb-2">Agendamentos</h4>
            <p className="text-gray-600">Visualize e gerencie os agendamentos.</p>
          </a>
          <a
            href="/financeiro"
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h4 className="text-xl font-bold text-blue-600 mb-2">Financeiro</h4>
            <p className="text-gray-600">Acompanhe as finanças da clínica.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;