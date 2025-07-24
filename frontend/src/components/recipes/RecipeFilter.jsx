import React, { useState, useEffect, useRef } from 'react'

const RecipeFilter = ({ onFilterChange, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🍽️' },
    { id: 'top3', name: 'Top 3', icon: '🏆' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'hamburguesa', name: 'Hamburguesa', icon: '🍔' },
    { id: 'kebab', name: 'Kebab', icon: '🥙' },
    { id: 'salado', name: 'Salado', icon: '🥪' },
    { id: 'dulce', name: 'Dulce', icon: '🍰' }
  ]

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onFilterChange(category)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchTerm('')
      onSearchChange('')
    }
  }

  const closeSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false)
      setSearchTerm('')
      onSearchChange('')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch()
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  return (
    <div className="flex items-center justify-between w-full bg-white rounded-full shadow-lg p-2 md:p-3">
      <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide flex-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
              selectedCategory === category.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-base md:text-lg">{category.icon}</span>
            <span className="font-medium hidden sm:inline">{category.name}</span>
            <span className="font-medium sm:hidden">{category.name.length > 4 ? category.name.substring(0, 4) : category.name}</span>
          </button>
        ))}
      </div>

      <div className="relative ml-2" ref={searchRef}>
        <button
          onClick={toggleSearch}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ease-out transform hover:scale-105 ${
            isSearchOpen ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
          }`}
        >
          🔍
        </button>
        
        <div className={`absolute right-0 top-0 transition-all duration-500 ease-out ${
          isSearchOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}>
          <input
            type="text"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64 md:w-80 pl-4 pr-12 py-2 rounded-full border-2 border-orange-500 bg-white shadow-lg text-sm md:text-base focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default RecipeFilter