import React from 'react'

const RecipeSort = ({ onSortChange, currentSort }) => {
  const sortOptions = [
    { value: 'default', label: 'Por defecto', icon: '📋' },
    { value: 'rating', label: 'Mejor valoradas', icon: '⭐' },
    { value: 'time', label: 'Más rápidas', icon: '⏱️' },
    { value: 'name', label: 'Alfabético', icon: '🔤' }
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 px-4 md:px-6 mb-4">
      <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
      <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`flex items-center space-x-1 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
              currentSort === option.value
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xs md:text-sm">{option.icon}</span>
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sm:hidden">{option.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecipeSort 