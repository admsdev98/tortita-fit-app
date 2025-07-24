import React from 'react'
import RecipeCard from './RecipeCard'

const RecipesGridElements = ({ recipes, title, subtitle, type = 'featured' }) => {
  if (!recipes || recipes.length === 0) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'featured':
        return {
          container: 'bg-gradient-to-r from-purple-50 to-pink-50',
          title: 'text-purple-800',
          subtitle: 'text-purple-600'
        }
      case 'popular':
        return {
          container: 'bg-gradient-to-r from-orange-50 to-red-50',
          title: 'text-orange-800',
          subtitle: 'text-orange-600'
        }
      default:
        return {
          container: 'bg-gray-50',
          title: 'text-gray-800',
          subtitle: 'text-gray-600'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className={`${styles.container} py-6 md:py-8 px-4 md:px-6 rounded-2xl mb-6 md:mb-8`}>
      <div className="text-center mb-4 md:mb-6">
        <h2 className={`text-xl md:text-2xl font-bold ${styles.title} mb-2`}>
          {title}
        </h2>
        <p className={`text-xs md:text-sm ${styles.subtitle}`}>
          {subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipesGridElements
