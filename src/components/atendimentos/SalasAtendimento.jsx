import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  'Não iniciado': 'bg-gray-400',
  'Em andamento': 'bg-blue-500 animate-pulse',
  'Finalizado': 'bg-green-500',
};

const SalasAtendimento = ({ salas = [] }) => {
  const navigate = useNavigate();

  const handleVerDetalhes = (salaId) => {
    navigate(`/atendimento-details/${salaId}`); // Navegar para a página de detalhes do atendimento
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salas.length > 0 ? (
        salas.map((sala) => (
          <div key={sala.id} className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${statusColors[sala.status]}`}></span>
              <span className="text-sm text-gray-600 font-medium">{sala.status}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{sala.professionalId}</h2>
            <p className="text-gray-600">{new Date(sala.startDateTime).toLocaleTimeString()} - {new Date(sala.endDateTime).toLocaleTimeString()}</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleVerDetalhes(sala.id)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg text-center cursor-pointer hover:bg-blue-700"
            >
              Ver detalhes
            </motion.div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Nenhuma sala disponível.</p>
      )}
    </div>
  );
};

export default SalasAtendimento;