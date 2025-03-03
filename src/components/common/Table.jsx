import React from 'react';

const Table = ({ columns, data, onRowDoubleClick }) => {
  if (!Array.isArray(columns)) {
    console.error('Erro: "columns" não é um array.', columns);
    return <p>Erro: Colunas inválidas.</p>;
  }

  if (!Array.isArray(data)) {
    console.error('Erro: "data" não é um array.', data);
    return <p>Nenhum dado disponível.</p>;
  }

  console.log("Dados passados para a tabela:", data); // Depuração

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)}
              className="hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-800">
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor] || "—"
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;