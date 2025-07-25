import api from './api'

export const recipesService = {
  // Obtener todas las recetas
  getAllRecipes: async () => {
    const response = await api.get('/recipes')
    return response.data
  },

  // Obtener una receta por ID
  getRecipeById: async (id) => {
    const response = await api.get(`/recipes/${id}`)
    return response.data
  },

  // Obtener recetas por categoría
  getRecipesByCategory: async (category) => {
    const response = await api.get(`/recipes/category/${category}`)
    return response.data
  },

  // Buscar recetas
  searchRecipes: async (query) => {
    const response = await api.get(`/recipes/search?q=${encodeURIComponent(query)}`)
    return response.data
  },

  // Obtener recetas populares
  getPopularRecipes: async () => {
    const response = await api.get('/recipes/popular')
    return response.data
  },

  // Obtener top 3 recetas
  getTop3Recipes: async () => {
    const response = await api.get('/recipes/top3')
    return response.data
  }
} 