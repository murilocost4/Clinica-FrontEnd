import React from 'react';

const Table = ({ columns, data, onRowDoubleClick }) => {
  return (
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
            onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)} // Adiciona o evento de double-click
            className="hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 text-sm text-gray-800">
                {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;