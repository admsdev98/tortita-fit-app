import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer z-50"
      >
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      <div className={`absolute right-0 top-12 w-64 bg-white shadow-lg rounded-lg transition-all duration-300 transform z-50 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <nav className="py-4">
          <Link 
            to="/" 
            className="block px-6 py-3 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-chewy text-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            to="/recipes" 
            className="block px-6 py-3 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-chewy text-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Recetas
          </Link>
          <Link 
            to="/calculator" 
            className="block px-6 py-3 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-chewy text-lg transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Calculadora de macros
          </Link>
        </nav>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navigation; 