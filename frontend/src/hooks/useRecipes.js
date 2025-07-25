import { useState, useEffect } from 'react'
import { recipesService } from '../services/recipesService'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecipes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await recipesService.getAllRecipes()
      setRecipes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const searchRecipes = async (query) => {
    if (!query.trim()) {
      return fetchRecipes()
    }
    
    setLoading(true)
    setError(null)
    try {
      const data = await recipesService.searchRecipes(query)
      setRecipes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getRecipesByCategory = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const data = await recipesService.getRecipesByCategory(category)
      setRecipes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    searchRecipes,
    getRecipesByCategory
  }
} 