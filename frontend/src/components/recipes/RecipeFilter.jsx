import React, { useRef, useState } from 'react'
import { CATEGORIES, SORT_OPTIONS } from '../../utils/constants'

const RecipeFilter = ({ onFilterChange, onSearchChange, onSortChange, desktopMode }) => { // ← Añadir onSortChange
  // Estados para filtros
  const [currentCategory, setCurrentCategory] = useState('todos')
  const [tempCategory, setTempCategory] = useState('todos')
  
  // Estados para ordenar
  const [currentSort, setCurrentSort] = useState('default') // ← Nuevo
  const [tempSort, setTempSort] = useState('default') // ← Nuevo
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSortModalOpen, setIsSortModalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortSelected, setSortSelected] = useState('relevancia')
  const searchRef = useRef(null)

  // Funciones para filtros (ya están bien)
  const handleCategorySelect = (category) => {
    setCurrentCategory(category)
    onFilterChange(category)
    setIsFilterModalOpen(false)
  }

  const handleOpenFilterModal = () => {
    setTempCategory(currentCategory)
    setIsFilterModalOpen(true)
  }

  const handleCloseFilterModal = () => {
    setTempCategory(currentCategory)
    setIsFilterModalOpen(false)
  }

  // Funciones para ordenar (nuevas)
  const handleSortSelect = (sort) => {
    setCurrentSort(sort)
    onSortChange(sort) // ← Aplicar inmediatamente
    setIsSortModalOpen(false) // ← Cerrar modal
  }

  const handleOpenSortModal = () => {
    setTempSort(currentSort)
    setIsSortModalOpen(true)
  }

  const handleCloseSortModal = () => {
    setTempSort(currentSort)
    setIsSortModalOpen(false)
  }

  const handleApplySort = () => {
    setIsSortModalOpen(false)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  // Modal genérico
  const Modal = ({ open, onClose, children }) => (
    open ? (
      <div className="fixed inset-0 z-40 flex items-end justify-center md:items-center md:justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
        <div className="relative w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-6 pb-8 animate-fadeInUp">
          {children}
        </div>
      </div>
    ) : null
  )

  return (
    <div className={`w-full flex items-center justify-center gap-3 ${desktopMode ? 'md:flex flex-col' : 'md:hidden'}`}>
      {isSearchOpen ? (
        <div className={`flex items-center ${desktopMode ? 'w-full' : 'w-full'} bg-white rounded-full shadow-lg p-2`}>
          <input
            autoFocus
            type="text"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={handleSearchChange}
            onBlur={() => setIsSearchOpen(false)}
            className="w-full px-4 py-2 rounded-full border-2 border-orange-500 bg-white shadow text-sm focus:outline-none"
          />
          <button
            onClick={() => { setIsSearchOpen(false); setSearchTerm(''); onSearchChange(''); }}
            className="ml-2 text-orange-500 text-2xl font-bold px-2 py-1 rounded-full hover:bg-orange-100"
            tabIndex={-1}
          >
            ×
          </button>
        </div>
      ) : (
        <>
          {/* Embudo (filtros) */}
          <button
            onClick={handleOpenFilterModal} // ← Usar nueva función
            className={`flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 ${desktopMode ? 'w-12 h-12' : 'w-12 h-12'}`}
            aria-label="Abrir filtros"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" />
            </svg>
          </button>
          {/* Ordenar (flechas verticales) */}
          <button
            onClick={handleOpenSortModal}
            className={`flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 ${desktopMode ? 'w-12 h-12' : 'w-12 h-12'}`}
            aria-label="Ordenar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4 4 4M8 17l4 4 4-4" />
            </svg>
          </button>
          {/* Lupa (buscar) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 ${desktopMode ? 'w-12 h-12' : 'w-12 h-12'}`}
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </>
      )}
      {/* Modal de filtros */}
      <Modal open={isFilterModalOpen} onClose={handleCloseFilterModal}>
        <h3 className="text-lg font-bold mb-4 text-center">Filtrar recetas</h3>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2
                ${tempCategory === category.id ? 'bg-orange-100 border-orange-400 text-orange-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
              style={{ transition: 'none' }}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </Modal>
      {/* Modal de ordenar - SIN botón "Aplicar" */}
      <Modal open={isSortModalOpen} onClose={handleCloseSortModal}>
        <h3 className="text-lg font-bold mb-4 text-center">Ordenar recetas</h3>
        <div className="flex flex-col gap-3">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleSortSelect(opt.id)} // ← Cambiar a función nueva
              className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${tempSort === opt.id ? 'bg-orange-100 border-orange-400 text-orange-600 font-bold' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Modal>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.3s; }
      `}</style>
    </div>
  )
}

export default RecipeFilter