import React from 'react'
import RecipeCard from './RecipeCard'

const RecipesGrid = ({ recipes, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg animate-pulse">
            <div className="h-24 sm:h-32 md:h-40 lg:h-48 bg-gray-200 rounded-t-xl sm:rounded-t-2xl"></div>
            <div className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2 md:space-y-3">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-12 px-4 md:px-6">
        <div className="text-4xl md:text-6xl mb-4">🍽️</div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 text-center">
          No se encontraron recetas
        </h3>
        <p className="text-gray-600 text-center max-w-md text-sm md:text-base">
          Intenta ajustar los filtros o la búsqueda para encontrar más recetas deliciosas.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="animate-fadeIn"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}

export default RecipesGrid
