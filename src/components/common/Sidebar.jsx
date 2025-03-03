import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null); // Estado para controlar submenus abertos

  // Lista de itens da Sidebar
  const menuItems = [
    { path: '/', icon: 'home', label: 'Início' },
    { path: '/pacientes', icon: 'users', label: 'Pacientes' },
    { path: '/profissionais', icon: 'user-md', label: 'Profissionais' },
    {
      label: 'Agendamentos',
      icon: 'calendar',
      subItems: [
        { path: '/agendamentos', label: 'Solicitações' },
        { path: '/atendimentos', label: 'Atendimentos' },
      ],
    },
    { path: '/prontuarios', icon: 'file-medical', label: 'Prontuários' },
    { path: '/salas', icon: 'door-open', label: 'Salas' },
    {
      label: 'Financeiro',
      icon: 'dollar-sign',
      subItems: [
        { path: '/financeiro', label: 'Transações' },
        { path: '/financeiro/repasse', label: 'Repasse para Profissionais' },
        { path: '/financeiro/taxas', label: 'Taxas da Clínica' },
        { path: '/financeiro/relatorios', label: 'Relatórios Financeiros' },
      ],
    },
    {
      label: 'Configurações',
      icon: 'cog',
      subItems: [
        { path: '/usuarios', label: 'Usuários' },
        { path: '/convenios', label: 'Convênios' },
        { path: '/auditoria', label: 'Auditoria' },
        { path: '/relatorios', label: 'Relatórios Gerais' },
      ],
    },
  ];

  // Função para alternar submenus
  const toggleSubMenu = (label) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <aside className="h-full bg-gray-900 text-white shadow-lg">
      <div className="p-4 flex items-center justify-center">
      </div>

      {/* Menu de Navegação */}
      <nav className="mt-8">
        {menuItems.map((item) => (
          <div key={item.label} className="relative">
            {/* Item sem submenu */}
            {!item.subItems && (
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md text-white hover:bg-gray-700 transition-colors ${
                  location.pathname === item.path ? 'bg-gray-700' : ''
                }`}
              >
                <i className={`fas fa-${item.icon} mr-3 text-lg`}></i>
                <span className="font-medium">{item.label}</span>
              </Link>
            )}

            {/* Item com submenu */}
            {item.subItems && (
              <div>
                <div
                  onClick={() => toggleSubMenu(item.label)}
                  className={`flex items-center justify-between px-4 py-2 rounded-md text-white hover:bg-gray-700 transition-colors cursor-pointer ${
                    openSubMenu === item.label ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`fas fa-${item.icon} mr-3 text-lg`}></i>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {/* Ícone de seta */}
                  <i
                    className={`fas fa-chevron-${openSubMenu === item.label ? 'down' : 'right'} text-lg`}
                  ></i>
                </div>

                {/* Subitens */}
                {openSubMenu === item.label && (
                  <div className="pl-6 transition-all duration-300 ease-in-out">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-4 py-2 text-white hover:bg-gray-600 transition-colors ${
                          location.pathname === subItem.path ? 'bg-gray-600' : ''
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
