import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">ClinicaMed</div>

        {/* Botões de Ação */}
        <div className="flex items-center space-x-4">
          {/* Botão de Notificações */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Botão de Perfil */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <img
                src="https://via.placeholder.com/40"
                alt="Perfil"
                className="w-8 h-8 rounded-full"
              />
              <span>Usuário</span>
              <i className="fas fa-chevron-down"></i>
            </button>

            {/* Dropdown do Perfil */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
              <a
                href="/perfil"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Meu Perfil
              </a>
              <a
                href="/configuracoes"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Configurações
              </a>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b-lg">
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