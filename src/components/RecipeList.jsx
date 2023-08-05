import React from 'react'
import RecipeCard from './RecipeCard'

function RecipeList({savedRecipes, setSavedRecipes , isRandom , recipes}) {
    return (

        recipes.map((recipe) => (
            <RecipeCard
                key={recipe.idMeal}
                isRandom={isRandom}
                recipe={recipe}
                setSavedRecipes={setSavedRecipes}
                savedRecipes={savedRecipes}
            />
        ))
    )
}

export default RecipeList