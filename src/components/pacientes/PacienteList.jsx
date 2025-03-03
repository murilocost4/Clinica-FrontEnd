import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { getPacientes } from '../../services/Pacientes';

const PacienteList = ({ onEditar, onExcluir }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar pacientes
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await getPacientes();
        console.log("Dados recebidos da API:", response); // Para depuração

        // Extrai o array `data` da resposta
        setPacientes(response.data || []); // Usa o array diretamente
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        setError(error.message || "Erro ao buscar pacientes."); // Exibe a mensagem de erro
        setPacientes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []); // Dependências vazias para evitar loop infinito

  const handleDoubleClick = (paciente) => {
    onEditar(paciente); // Passa o objeto completo do paciente
  };

  // Colunas da tabela
  const columns = [
    { header: "Nome", accessor: "name" }, // Nome do paciente
    { header: "CPF", accessor: "cpf" }, // CPF do paciente
    { header: "Telefone", accessor: "phone" }, // Telefone do paciente
    { header: "Email", accessor: "email" }, // Email do paciente
    {
      header: "Ações",
      accessor: "id",
      render: (id, row) => (
        <button
          onClick={() => onExcluir(row)} // Passa o objeto completo do paciente
          className="text-red-600 hover:text-red-800"
        >
          Excluir
        </button>
      ),
    },
  ];

  // Exibe mensagem de carregamento ou erro
  if (loading) return <div className="text-center text-gray-500">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <Table
        columns={columns}
        data={pacientes}
        onRowDoubleClick={(row) => handleDoubleClick(row)} // Passa o objeto completo
      />
    </div>
  );
};

export default PacienteList;