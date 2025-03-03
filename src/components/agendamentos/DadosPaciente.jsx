import React, { useState, useEffect } from 'react';

// Simulating a service that would fetch patients
import { getPacientes } from '../../services/Pacientes';

const DadosPaciente = ({ dados, onChange, disabled }) => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState(['Dr. Ana', 'Dr. Carlos', 'Dr. João']);
  const [salas, setSalas] = useState(['Sala 1', 'Sala 2', 'Sala 3']);
  const [loadingPacientes, setLoadingPacientes] = useState(false);
  
  const [formData, setFormData] = useState({
    paciente: dados?.paciente || '',
    profissional: dados?.profissional || '',
    sala: dados?.sala || '',
    dateTime: dados?.dateTime || new Date().toISOString().slice(0, 16),
    status: dados?.status || 'solicitado',
    notes: dados?.notes || ''
  });

  useEffect(() => {
    fetchPacientes();
  }, []);

  useEffect(() => {
    if (dados) {
      setFormData({
        paciente: dados.paciente || '',
        profissional: dados.profissional || '',
        sala: dados.sala || '',
        dateTime: dados.dateTime || new Date().toISOString().slice(0, 16),
        status: dados.status || 'solicitado',
        notes: dados.notes || ''
      });
    }
  }, [dados]);

  const fetchPacientes = async () => {
    try {
      setLoadingPacientes(true);
      // Este seria um exemplo de chamada à API
      // Aqui você substituiria por uma chamada real à sua API
      const data = await getPacientes();
      setPacientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      setPacientes([{ id: 1, nome: 'João Silva' }, { id: 2, nome: 'Maria Souza' }]); // Dados de fallback
    } finally {
      setLoadingPacientes(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Envia os dados atualizados para o componente pai
    onChange({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Paciente */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paciente *
        </label>
        <select
          name="paciente"
          value={formData.paciente}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled || loadingPacientes}
          required
        >
          <option value="">Selecione um paciente</option>
          {loadingPacientes ? (
            <option disabled>Carregando pacientes...</option>
          ) : (
            pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.nome}>
                {paciente.nome}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Médico */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profissional *
        </label>
        <select
          name="profissional"
          value={formData.profissional}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
          required
        >
          <option value="">Selecione um profissional</option>
          {medicos.map((medico, index) => (
            <option key={index} value={medico}>
              {medico}
            </option>
          ))}
        </select>
      </div>

      {/* Sala */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sala *
        </label>
        <select
          name="sala"
          value={formData.sala}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
          required
        >
          <option value="">Selecione uma sala</option>
          {salas.map((sala, index) => (
            <option key={index} value={sala}>
              {sala}
            </option>
          ))}
        </select>
      </div>

      {/* Data e Hora */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data e Hora *
        </label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
        >
          <option value="solicitado">Solicitado</option>
          <option value="confirmado">Confirmado</option>
          <option value="realizado">Realizado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observações
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
          placeholder="Observações adicionais sobre o agendamento..."
        />
      </div>

      <p className="text-sm text-gray-500">* Campos obrigatórios</p>
    </div>
  );
};

export default DadosPaciente;