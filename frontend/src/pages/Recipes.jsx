import React, { useState, useEffect } from 'react'
import RecipesHeader from '../components/header/RecipesHeader'
import RecipeFilter from '../components/recipes/RecipeFilter'
import RecipesGrid from '../components/recipes/RecipesGrid'
import RecipeSort from '../components/recipes/RecipeSort'
import RecipeCard from '../components/recipes/RecipeCard'
import RecipePagination from '../components/recipes/RecipePagination'
import PageTransition from '../components/common/PageTransition'
import { useRecipes } from '../hooks/useRecipes'
import { CATEGORIES, SORT_OPTIONS, RECIPES_PER_PAGE } from '../utils/constants'

const Recipes = () => {
  const { recipes, loading, error, searchRecipes } = useRecipes()
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSort, setCurrentSort] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

  // Estados para los modales laterales
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSortModalOpen, setIsSortModalOpen] = useState(false)
  const [tempSelectedCategory, setTempSelectedCategory] = useState('todos')
  const [tempSortSelected, setTempSortSelected] = useState('default')

  // Inicializar filteredRecipes cuando recipes cambie
  useEffect(() => {
    setFilteredRecipes(recipes)
  }, [recipes])

  // Bloquear scroll cuando hay modales abiertos
  useEffect(() => {
    if (isSearchOpen || isFilterModalOpen || isSortModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSearchOpen, isFilterModalOpen, isSortModalOpen])

  useEffect(() => {
    let filtered = recipes

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(recipe => {
        if (selectedCategory === 'top3') return recipe.is_popular
        if (selectedCategory === 'dulce') return recipe.category === 'dulce'
        if (selectedCategory === 'salado') return recipe.category === 'salado'
        return false
      })
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        (recipe.description && recipe.description.toLowerCase().includes(searchLower))
      )
    }

    switch (currentSort) {
      case 'popular':
        filtered.sort((a, b) => b.visits - a.visits)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredRecipes(filtered)
    setCurrentPage(1)
  }, [recipes, selectedCategory, searchTerm, currentSort])

  const handleFilterChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = async (term) => {
    setSearchTerm(term)
    if (term.trim()) {
      await searchRecipes(term)
    }
  }

  const handleSortChange = (sort) => {
    setCurrentSort(sort)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const getPaginatedRecipes = () => {
    if (selectedCategory === 'top3') {
      return filteredRecipes.slice(0, 3)
    }
    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE
    const endIndex = startIndex + RECIPES_PER_PAGE
    return filteredRecipes.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE)

  // Funciones para los modales laterales
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setIsFilterModalOpen(false) // ← Cerrar modal inmediatamente
  }

  const handleApplyFilters = () => {
    setSelectedCategory(tempSelectedCategory)
    setIsFilterModalOpen(false)
  }

  const handleSortSelect = (sort) => {
    setCurrentSort(sort)
    setIsSortModalOpen(false) // ← Cerrar modal inmediatamente
  }

  const handleApplySort = () => {
    setCurrentSort(tempSortSelected)
    setIsSortModalOpen(false)
  }

  // Modal genérico
  const Modal = ({ open, onClose, children }) => (
    open ? (
      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
        <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
        <div className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-6 pb-8 animate-fadeInUp">
          {children}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors duration-300 text-base"
          >
            Cerrar
          </button>
        </div>
      </div>
    ) : null
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <RecipesHeader />
        
        {/* Barra de búsqueda en header */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-40 flex items-start justify-center pt-4" onClick={() => setIsSearchOpen(false)}>
            <div className="flex items-center gap-3 bg-white rounded-full shadow-lg p-2 max-w-md w-full mt-4" onClick={(e) => e.stopPropagation()}>
              <input
                autoFocus
                type="text"
                placeholder="Buscar recetas..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border-2 border-orange-500 bg-white text-sm focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-orange-500 text-2xl font-bold px-3 py-2 rounded-full hover:bg-orange-100"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
            <RecipeFilter
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
            />

            <div className="flex items-center justify-start mt-2">
              <RecipeSort onSortChange={handleSortChange} currentSort={currentSort} />
            </div>

            {selectedCategory !== 'todos' && selectedCategory !== 'top3' && (
              <div className="mb-2 mt-2">
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleFilterChange('todos')}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 transition-all duration-500 ease-out relative">
          {selectedCategory === 'top3' && (
            <div className="text-center mb-4 animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Nuestro top 3 recetas
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Estas son las recetas más populares elegidas por los usuarios
              </p>
            </div>
          )}
          
          {/* Botones laterales derechos */}
          <div className="absolute -right-16 top-0 flex flex-col gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-orange-500"
              aria-label="Buscar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            
            <button
              onClick={() => {
                setTempSelectedCategory(selectedCategory)
                setIsFilterModalOpen(true)
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-orange-500"
              aria-label="Filtrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" />
              </svg>
            </button>
            
            <button
              onClick={() => {
                setTempSortSelected(currentSort)
                setIsSortModalOpen(true)
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-orange-500"
              aria-label="Ordenar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4M8 17l4 4 4-4" />
              </svg>
            </button>
          </div>
          
          <div className="transition-all duration-500 ease-out">
            {selectedCategory === 'top3' ? (
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl">
                  {getPaginatedRecipes().map((recipe, index) => (
                    <div
                      key={recipe.id}
                      className="animate-fadeIn"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <RecipesGrid recipes={getPaginatedRecipes()} loading={loading} />
            )}
          </div>
          
          {totalPages > 1 && selectedCategory !== 'top3' && (
            <div className="mt-6">
              <RecipePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Modal de filtros */}
        <Modal open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">Filtrar recetas</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)} // ← Aplicar inmediatamente
                className={`flex flex-col items-center justify-center w-full h-24 md:h-28 rounded-xl border-2 transition-all duration-200
                  ${tempSelectedCategory === category.id ? 'bg-orange-100 border-orange-400 text-orange-600 font-bold scale-105' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
              >
                <span className="text-2xl md:text-3xl mb-2">{category.icon}</span>
                <span className="text-xs md:text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
          {/* ← Eliminar botón "Aplicar filtros" */}
        </Modal>

        {/* Modal de ordenar */}
        <Modal open={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}>
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">Ordenar recetas</h3>
          <div className="flex flex-col gap-3 md:gap-4">
            {SORT_OPTIONS.map(opt => (
              <button 
                key={opt.id} 
                onClick={() => handleSortSelect(opt.id)} // ← Aplicar inmediatamente
                className={`flex items-center px-4 md:px-6 py-4 md:py-5 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105
                  ${tempSortSelected === opt.id ? 'bg-orange-100 border-orange-400 text-orange-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
              >
                <span className="text-base md:text-lg">{opt.label}</span>
              </button>
            ))}
          </div>
          {/* ← Eliminar botón "Aplicar orden" */}
        </Modal>
      </div>
    </PageTransition>
  )
}

export default Recipes