import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Pacientes from './pages/Pacientes';
import Profissionais from './pages/Profissionais';
import Agendamentos from './pages/Agendamentos';
import Prontuarios from './pages/Prontuarios';
import Financeiro from './pages/Financeiro';
import Auditoria from './pages/Auditoria';
import Backup from './pages/Backup';
import Relatorios from './pages/Relatorios';
import NotFound from './pages/NotFound';
import Atendimentos from './pages/Atendimentos';
import AtendimentoDetails from './pages/AtendimentoDetails';
import Salas from './pages/Salas';
import ConfiguradorUsuarios from './pages/ConfiguradorUsuarios';
import ConfiguradorConvenios from './pages/ConfiguradorConvenios';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header Fixo */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Layout principal com Sidebar e Conteúdo */}
        <div className="flex flex-grow">
          {/* Sidebar Fixa à Esquerda */}
          <div className="w-64 bg-white border-r border-gray-200 z-20">
            <Sidebar />
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-grow mt-16 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/profissionais" element={<Profissionais />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/atendimentos" element={<Atendimentos />} />
              <Route path="/atendimento-details/:id" element={<AtendimentoDetails />} />
              <Route path="/prontuarios" element={<Prontuarios />} />
              <Route path="/salas" element={<Salas />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/convenios" element={<ConfiguradorConvenios />} />
              <Route path="/usuarios" element={<ConfiguradorUsuarios />} />
              <Route path="/auditoria" element={<Auditoria />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>

      </div>
    </Router>
  );
};

export default App;
