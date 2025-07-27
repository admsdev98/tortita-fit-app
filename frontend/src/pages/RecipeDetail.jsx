import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { recipesService } from '../services/recipesService'
import RecipeElaboration from '../components/recipes/RecipeElaboration'
import PageTransition from '../components/common/PageTransition'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [elaboration, setElaboration] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Función para transformar datos del backend al formato que espera el frontend
  const transformRecipeData = (backendRecipe) => {
    const elaborationData = {
      images: [backendRecipe.image], // Usar la imagen de la receta
      ingredients: [
        // Por ahora ingredientes vacíos, luego podemos añadir tabla de ingredientes
        { name: "Ingredientes en desarrollo", amount: "Ver instrucciones", category: "info" }
      ],
      steps: backendRecipe.instructions?.map(instruction => ({
        step: instruction.step_number,
        description: instruction.instruction_text,
        time: "5 min", // Tiempo por defecto, luego podemos añadir tabla de tiempos
        tips: "Sigue las instrucciones cuidadosamente" // Tips por defecto
      })) || [],
      tips: ["Receta en desarrollo", "Más información próximamente"],
      nutritionInfo: {
        calories: backendRecipe.calories || 0,
        protein: "15g", // Por defecto, luego podemos añadir tabla nutricional
        carbs: "30g",
        fat: "10g",
        fiber: "5g",
        sugar: "8g"
      }
    }
    
    return elaborationData
  }

  useEffect(() => {
    const fetchRecipeData = async () => {
      setLoading(true)
      setError(false)

      try {
        const foundRecipe = await recipesService.getRecipeById(parseInt(id))

        if (foundRecipe) {
          setRecipe(foundRecipe)
          // Transformar datos del backend al formato esperado
          const elaborationData = transformRecipeData(foundRecipe)
          setElaboration(elaborationData)
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
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