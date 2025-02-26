// src/App.jsx
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
import Convenios from './pages/Convenios';
import Usuarios from './pages/Usuarios';
import Auditoria from './pages/Auditoria';
import Backup from './pages/Backup';
import Relatorios from './pages/Relatorios';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar Fixa */}
        <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-grow flex flex-col ml-64"> {/* ml-64 para compensar a largura da Sidebar */}
          {/* Header Fixo */}
          <div className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 z-10">
            <Header />
          </div>

          {/* Conteúdo com Scroll */}
          <main className="flex-grow mt-16 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/profissionais" element={<Profissionais />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/prontuarios" element={<Prontuarios />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/convenios" element={<Convenios />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/auditoria" element={<Auditoria />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="*" element={<NotFound />} /> {/* Rota para página não encontrada */}
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;