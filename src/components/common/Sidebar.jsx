import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Lista de itens da Sidebar
  const menuItems = [
    { path: '/', icon: 'home', label: 'Início' },
    { path: '/pacientes', icon: 'users', label: 'Pacientes' },
    { path: '/profissionais', icon: 'user-md', label: 'Profissionais' },
    { path: '/agendamentos', icon: 'calendar', label: 'Agendamentos' },
    { path: '/prontuarios', icon: 'file-medical', label: 'Prontuários' },
    { path: '/financeiro', icon: 'dollar-sign', label: 'Financeiro' },
    { path: '/convenios', icon: 'handshake', label: 'Convênios' },
    { path: '/usuarios', icon: 'user-cog', label: 'Usuários' },
    { path: '/auditoria', icon: 'shield-alt', label: 'Auditoria' },
    { path: '/backup', icon: 'database', label: 'Backup' },
    { path: '/relatorios', icon: 'chart-line', label: 'Relatórios' },
  ];

  return (
    <aside className="h-full bg-white">
      <div className="p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">ClinicaMed</span>
        </Link>
      </div>

      {/* Menu de Navegação */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors ${
              location.pathname === item.path ? 'bg-gray-100 text-blue-600' : ''
            }`}
          >
            <i className={`fas fa-${item.icon} mr-3`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;