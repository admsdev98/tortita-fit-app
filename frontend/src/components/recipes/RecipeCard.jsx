import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex items-center space-x-1">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-white text-sm font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-full">
            {recipe.rating}
          </span>
        </div>
        {recipe.isPopular && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              POPULAR
            </span>
          </div>
        )}
        {recipe.isFeatured && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              DESTACADA
            </span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <span>⏱️</span>
            <span>{recipe.totalTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👥</span>
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🔥</span>
            <span>{recipe.calories} cal</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link 
            to={`/recipe/${recipe.id}`}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 text-sm flex items-center justify-center"
          >
            Ver Receta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
