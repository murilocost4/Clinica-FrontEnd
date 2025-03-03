import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-sm p-4 border-b-1 border-slate-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ml-8">
          <span className="text-3xl font-semibold">ClinicaMed</span>
        </Link>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-6">
          {/* Botão de Notificações */}
          <button className="relative p-2 text-white hover:text-blue-400 transition-colors">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Botão de Perfil */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <img
                src="https://via.placeholder.com/40"
                alt="Perfil"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Usuário</span>
              <i className="fas fa-chevron-down text-lg"></i>
            </button>

            {/* Dropdown do Perfil */}
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hidden group-hover:block">
              <a
                href="/perfil"
                className="block px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
              >
                Meu Perfil
              </a>
              <a
                href="/configuracoes"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Configurações
              </a>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700 rounded-b-lg">
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
