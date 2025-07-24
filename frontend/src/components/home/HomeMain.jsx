import React from "react";
import { Link } from "react-router-dom";

const HomeMain = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 -mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Bienvenido a Tu Tortita Fit
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          ¿Te apetece comer ese capricho, pero quieres que sea saludable?
        </p>
        <div className="pt-4">
          <Link 
            to="/recipes" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
          >
            Descubre Nuestras Recetas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;