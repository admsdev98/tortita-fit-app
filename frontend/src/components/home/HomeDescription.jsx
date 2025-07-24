import React from "react";

const HomeDescription = () => {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-10">
      <div className="space-y-8">
        <h1 className="text-3xl md:text-5xl text-gray-800 leading-tight font-bold">
          Tu <span className="text-orange-500">pizza</span>, tu <span className="text-orange-500">hamburguesa</span>, 
          tu <span className="text-orange-500">kebab</span>... 
          <br />pero <span className="text-orange-500">fit</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          La vida ya es lo suficientemente complicada, como para quitarte esos caprichos. 
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-16">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">No necesitas ser chef</h3>
          <p className="text-gray-600">
            Recetas sencillas y rápidas. Olvidate de esos platos que te llevan horas.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Económico</h3>
          <p className="text-gray-600">
            Ingredientes del día a día, y economicos.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💭</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Directo al plato</h3>
          <p className="text-gray-600">
            ¿No sabes qué cocinar? ¿Cansado del "Lo que te apetezca"? Nosotros te ayudamos!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDescription;