import React from 'react'

const RecipePagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 shadow-sm hover:shadow-md'
        }`}
      >
        ← Anterior
      </button>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
              page === '...'
                ? 'text-gray-400 cursor-default'
                : page === currentPage
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 shadow-sm hover:shadow-md'
        }`}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default RecipePagination 