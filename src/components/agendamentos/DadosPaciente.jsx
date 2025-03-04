import React, { useState, useEffect } from 'react';
import { getPacientes } from '../../services/Pacientes';
import { getProfissionais } from '../../services/Profissionais';
import { getSalas } from '../../services/Salas';

const DadosPaciente = ({ dados, onChange, disabled }) => {
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [pacienteBusca, setPacienteBusca] = useState('');
  const [profissionalBusca, setProfissionalBusca] = useState('');
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(false);
  const [loadingProfissionais, setLoadingProfissionais] = useState(false);
  const [salas, setSalas] = useState([]);
  const [loadingSalas, setLoadingSalas] = useState(false);

  const [formData, setFormData] = useState({
    paciente: dados?.paciente || null,
    profissional: dados?.profissional || null,
    sala: dados?.sala || null,
    dateTime: dados?.dateTime || new Date().toISOString().slice(0, 16),
    status: dados?.status || 'solicitado',
    notes: dados?.notes || ''
  });

  // Busca pacientes ao digitar
  useEffect(() => {
    if (pacienteBusca) {
      setLoadingPacientes(true);
      getPacientes(pacienteBusca)
        .then((data) => {
          setPacientesFiltrados(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error('Erro ao buscar pacientes:', error);
          setPacientesFiltrados([]);
        })
        .finally(() => {
          setLoadingPacientes(false);
        });
    } else {
      setPacientesFiltrados([]);
    }
  }, [pacienteBusca]);

  // Busca profissionais ao digitar
  useEffect(() => {
    if (profissionalBusca) {
      setLoadingProfissionais(true);
      getProfissionais(profissionalBusca)
        .then((data) => {
          setProfissionaisFiltrados(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error('Erro ao buscar profissionais:', error);
          setProfissionaisFiltrados([]);
        })
        .finally(() => {
          setLoadingProfissionais(false);
        });
    } else {
      setProfissionaisFiltrados([]);
    }
  }, [profissionalBusca]);

  // Busca salas ao montar o componente
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        setLoadingSalas(true);
        const salasData = await getSalas();
        setSalas(Array.isArray(salasData) ? salasData : []);
      } catch (error) {
        console.error('Erro ao carregar salas:', error);
        setSalas([]);
      } finally {
        setLoadingSalas(false);
      }
    };

    fetchSalas();
  }, []);

  // Atualiza o formData quando os dados externos mudam
  useEffect(() => {
    if (dados) {
      setFormData(dados);
      if (dados.paciente) setPacienteBusca(dados.paciente.nome || '');
      if (dados.profissional) setProfissionalBusca(dados.profissional.nome || '');
    }
  }, [dados]);

  // Função para selecionar um paciente
  const selecionarPaciente = (paciente) => {
    const novoFormData = {
      ...formData,
      paciente: paciente
    };
    setFormData(novoFormData);
    setPacienteBusca(paciente.nome || '');
    setPacientesFiltrados([]);
    onChange(novoFormData);
  };

  // Função para selecionar um profissional
  const selecionarProfissional = (profissional) => {
    const novoFormData = {
      ...formData,
      profissional: profissional
    };
    setFormData(novoFormData);
    setProfissionalBusca(profissional.nome || '');
    setProfissionaisFiltrados([]);
    onChange(novoFormData);
  };

  // Função para selecionar uma sala
  const handleSalaChange = (e) => {
    const salaId = e.target.value;
    const salaSelecionada = salas.find((sala) => sala.id === salaId);
    
    const novoFormData = {
      ...formData,
      sala: salaSelecionada || null
    };
    
    setFormData(novoFormData);
    onChange(novoFormData);
  };

  // Função para atualizar o campo de busca de pacientes
  const handlePacienteBuscaChange = (e) => {
    setPacienteBusca(e.target.value);
    if (!e.target.value) {
      const novoFormData = {
        ...formData,
        paciente: null
      };
      setFormData(novoFormData);
      onChange(novoFormData);
    }
  };

  // Função para atualizar o campo de busca de profissionais
  const handleProfissionalBuscaChange = (e) => {
    setProfissionalBusca(e.target.value);
    if (!e.target.value) {
      const novoFormData = {
        ...formData,
        profissional: null
      };
      setFormData(novoFormData);
      onChange(novoFormData);
    }
  };

  // Função para atualizar outros campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const novoFormData = {
      ...formData,
      [name]: value
    };
    setFormData(novoFormData);
    onChange(novoFormData);
  };

  return (
    <div className="space-y-4">
      {/* Campo de busca de paciente */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Paciente *</label>
        <input
          type="text"
          value={pacienteBusca}
          onChange={handlePacienteBuscaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome do paciente"
          disabled={disabled}
          required
        />
        {loadingPacientes && <p className="text-sm text-gray-500 mt-1">Carregando...</p>}
        {pacientesFiltrados.length > 0 && !disabled && (
          <ul className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {pacientesFiltrados.map((paciente) => (
              <li
                key={paciente.id}
                onClick={() => selecionarPaciente(paciente)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {paciente.nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Campo de busca de profissional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profissional *</label>
        <input
          type="text"
          value={profissionalBusca}
          onChange={handleProfissionalBuscaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome do profissional"
          disabled={disabled}
          required
        />
        {loadingProfissionais && <p className="text-sm text-gray-500 mt-1">Carregando...</p>}
        {profissionaisFiltrados.length > 0 && !disabled && (
          <ul className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {profissionaisFiltrados.map((profissional) => (
              <li
                key={profissional.id}
                onClick={() => selecionarProfissional(profissional)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {profissional.nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Campo de seleção de sala */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sala *</label>
        <select
          name="sala"
          value={formData.sala?.id || ''}
          onChange={handleSalaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled || loadingSalas}
          required
        >
          <option value="">Selecione uma sala</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.name || sala.nome || `Sala ${sala.id}`}
            </option>
          ))}
        </select>
        {loadingSalas && <p className="text-sm text-gray-500 mt-1">Carregando salas...</p>}
      </div>

      {/* Data e Hora */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora *</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
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