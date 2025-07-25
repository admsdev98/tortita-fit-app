export const CATEGORIES = [
  { id: 'todos', name: 'Todos', icon: '🍽️' },
  { id: 'top3', name: 'Top 3', icon: '🏆' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'hamburguesa', name: 'Hamburguesa', icon: '🍔' },
  { id: 'kebab', name: 'Kebab', icon: '🥙' },
  { id: 'salado', name: 'Salado', icon: '🥪' },
  { id: 'dulce', name: 'Dulce', icon: '🍰' }
]

export const SORT_OPTIONS = [
  { id: 'default', label: 'Relevancia' },
  { id: 'rating', label: 'Valoración' },
  { id: 'time', label: 'Tiempo' },
  { id: 'calories', label: 'Calorías' },
  { id: 'name', label: 'Nombre' },
  { id: 'popular', label: 'Popularidad' }
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