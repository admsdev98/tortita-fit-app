import React, { useState, useEffect } from 'react'
import RecipesHeader from '../components/header/RecipesHeader'
import RecipeFilter from '../components/recipes/RecipeFilter'
import RecipesGrid from '../components/recipes/RecipesGrid'
import RecipesGridElements from '../components/recipes/RecipesGridElements'
import RecipeSort from '../components/recipes/RecipeSort'
import RecipeCard from '../components/recipes/RecipeCard'
import RecipePagination from '../components/recipes/RecipePagination'
import PageTransition from '../components/common/PageTransition'
import { mockRecipes } from '../data/mock/recipes'

const Recipes = () => {
  const [recipes, setRecipes] = useState(mockRecipes)
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes)
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSort, setCurrentSort] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isFilterSticky, setIsFilterSticky] = useState(false)
  const recipesPerPage = 8

  useEffect(() => {
    let filtered = recipes

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(recipe => {
        if (selectedCategory === 'top3') return recipe.isPopular
        if (selectedCategory === 'pizza') return recipe.subcategory === 'tortipizza'
        if (selectedCategory === 'hamburguesa') return recipe.subcategory === 'tortiguesa'
        if (selectedCategory === 'kebab') return recipe.subcategory === 'tortikebab'
        return recipe.category === selectedCategory
      })
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    switch (currentSort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'time':
        filtered.sort((a, b) => {
          const timeA = parseInt(a.totalTime.split(' ')[0])
          const timeB = parseInt(b.totalTime.split(' ')[0])
          return timeA - timeB
        })
        break
      case 'calories':
        filtered.sort((a, b) => a.calories - b.calories)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews)
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

  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  const handleSortChange = (sort) => {
    setCurrentSort(sort)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll suave hacia arriba cuando cambia la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const getPaginatedRecipes = () => {
    if (selectedCategory === 'top3') {
      return filteredRecipes.slice(0, 3)
    }
    const startIndex = (currentPage - 1) * recipesPerPage
    const endIndex = startIndex + recipesPerPage
    return filteredRecipes.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)



  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY
  //     setIsFilterSticky(scrollPosition > 120)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <RecipesHeader />
        
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
            <RecipeFilter
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />

            <div className="flex items-center justify-start mt-4">
              <RecipeSort onSortChange={handleSortChange} currentSort={currentSort} />
            </div>

            {selectedCategory !== 'todos' && selectedCategory !== 'top3' && (
              <div className="mb-4 mt-4">
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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 transition-all duration-500 ease-out">
          {selectedCategory === 'top3' && (
            <div className="text-center mb-6 animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Nuestro top 3 recetas
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Estas son las recetas más populares elegidas por los usuarios
              </p>
            </div>
          )}
          
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
            <div className="mt-8">
              <RecipePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default Recipes