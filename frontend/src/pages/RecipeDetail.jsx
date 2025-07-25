import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockRecipes } from '../data/mock/recipes'
import { mockElaboration } from '../data/mock/elaboration'
import RecipeElaboration from '../components/recipes/RecipeElaboration'
import PageTransition from '../components/common/PageTransition'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [elaboration, setElaboration] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRecipeData = () => {
      setLoading(true)
      setError(false)

      // Simular delay de carga
      setTimeout(() => {
        const foundRecipe = mockRecipes.find(r => r.id === parseInt(id))
        const foundElaboration = mockElaboration[parseInt(id)]

        if (foundRecipe && foundElaboration) {
          setRecipe(foundRecipe)
          setElaboration(foundElaboration)
        } else {
          setError(true)
        }
        setLoading(false)
      }, 500)
    }

    fetchRecipeData()
  }, [id])

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando receta...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error || !recipe || !elaboration) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Receta no encontrada
            </h1>
            <p className="text-gray-600 mb-6">
              La receta que buscas no existe o ha sido eliminada.
            </p>
            <button
              onClick={() => navigate('/recipes')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
            >
              Volver a Recetas
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <RecipeElaboration recipe={recipe} elaboration={elaboration} />
    </PageTransition>
  )
}

export default RecipeDetail 