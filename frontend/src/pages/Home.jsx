import React from "react";
import RotatingText from "../components/common/reactbits/RotatingText/RotatingText";
import HomeHeader from "../components/header/HomeHeader";
import PageTransition from "../components/common/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div className="h-screen md:overflow-hidden">
        <HomeHeader />
        <div className="min-h-screen bg-gradient-to-br">
          <div className="max-w-4xl mx-auto text-center space-y-10 pt-12 px-6">
            <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
              <p>
                Cuando estamos en etapa de pérdida de peso o simplemente buscamos
                mejorar nuestro físico, muchos platos se ganan injustamente la
                etiqueta de "comida basura".
              </p>
              <p>Pero, ¿y si ambas cosas pudiesen ir de la mano?</p>
              <p>
                Por eso, hemos creado{" "}
                <span className="font-bold text-orange-500">Tu Tortita Fit</span>,
                porque creemos que comer sano no tiene por qué ser aburrido, y
                porque sabemos lo frustrante que es seguir una dieta que se siente
                como un castigo.
              </p>
              <p>
                Os enseñamos a preparar vuestros antojos favoritos de una manera{" "}
                <span className="font-bold text-orange-500">
                  saludable, sabrosa y sin complicaciones
                </span>
                .
              </p>
              <p>
                Con ingredientes{" "}
                <span className="font-bold text-orange-500">
                  sencillos, económicos y fáciles de encontrar
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-baseline justify-center gap-2 pt-8">
              <h2 className="text-4xl font-bold text-gray-900">Porque comer</h2>

              <div className="bg-gradient-to-br from-green-400 to-orange-400 text-white px-6 py-4 rounded-xl shadow-lg">
                <h2 className="text-4xl font-bold">
                  <RotatingText
                    texts={["rico", "dulce", "sabroso", "indulgente"]}
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    bold
                    backgroundColor="bg-white"
                    textColor="text-orange-500"
                    fontSize="text-4xl"
                    fontWeight="font-bold"
                    fontFamily="font-sans"
                    fontStyle="font-normal"
                    fontVariant="font-normal"
                  />
                </h2>
              </div>

              <h2 className="text-4xl font-bold text-orange-500">
                puede ser saludable.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
