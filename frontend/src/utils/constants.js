export const CATEGORIES = [
  { id: 'todos', name: 'Todos', icon: '🍽️' },
  { id: 'top3', name: 'Top 3', icon: '🏆' },
  { id: 'dulce', name: 'Dulce', icon: '🍰' },
  { id: 'salado', name: 'Salado', icon: '🥪' }
]

export const SORT_OPTIONS = [
  { id: 'default', label: 'Por defecto' },
  { id: 'popular', label: 'Popularidad' },
  { id: 'name', label: 'Nombre' }
]

export const RECIPES_PER_PAGE = 8

export const API_ENDPOINTS = {
  RECIPES: '/recipes',
  RECIPE_DETAIL: (id) => `/recipes/${id}`,
  RECIPES_BY_CATEGORY: (category) => `/recipes/category/${category}`,
  SEARCH_RECIPES: (query) => `/recipes/search?q=${encodeURIComponent(query)}`,
  POPULAR_RECIPES: '/recipes/popular',
  TOP3_RECIPES: '/recipes/top3'
} 