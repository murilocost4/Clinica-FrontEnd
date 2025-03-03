import React, { useEffect, useState } from 'react';
import Table from '../common/Table';
import { getProfissionais } from '../../services/Profissionais';

const ProfissionalList = ({ onEditar, onExcluir, recarregarLista }) => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await getProfissionais();
        console.log("Resposta completa da API:", response); // Depuração

        // Verifica se a resposta é um array
        if (Array.isArray(response)) {
          setProfissionais(response); // Define os profissionais com os dados recebidos
        } else {
          console.warn("Dados inválidos recebidos da API:", response); // Depuração
          setProfissionais([]); // Define como array vazio se não houver dados válidos
        }
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
        setError("Erro ao buscar profissionais.");
        setProfissionais([]); // Define como array vazio em caso de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProfissionais();
  }, [recarregarLista]); // Recarrega quando recarregarLista mudar

  console.log("Dados no ProfissionalList:", profissionais); // Verifique se os dados estão corretos

  const handleDoubleClick = (profissional) => {
    onEditar(profissional); // Passa o objeto completo do profissional
  };

  const columns = [
    { header: "Nome", accessor: "name" }, // Nome do profissional
    { header: "Documento Profissional", accessor: "professionalDocument" }, // Documento profissional
    { header: "Email", accessor: "email" }, // Email do profissional
    { header: "Especialidade", accessor: "specialty" }, // Especialidade do profissional
    {
      header: "Ações",
      accessor: "id",
      render: (id, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onExcluir(row)} // Passa o objeto completo do profissional
            className="text-red-600 hover:text-red-800"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center text-gray-500">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <Table
        columns={columns}
        data={profissionais} // Passa o array diretamente
        onRowDoubleClick={(row) => handleDoubleClick(row)} // Passa o objeto completo
      />
      {console.log("Dados passados para a tabela:", profissionais)}
    </div>
  );
};

export default ProfissionalList;