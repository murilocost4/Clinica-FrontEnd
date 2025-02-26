import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Direitos Autorais */}
          <div className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} ClinicaMed. Todos os direitos reservados.
          </div>

          {/* Links Úteis */}
          <div className="flex space-x-4">
            <a
              href="/politica-de-privacidade"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos-de-uso"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Termos de Uso
            </a>
            <a
              href="/contato"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;