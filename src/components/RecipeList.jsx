import React from 'react'
import RecipeCard from './RecipeCard'

function RecipeList({ recipes , savedRecipes, setSavedRecipes }) {


    return (

        recipes?.map((recipe) => (
            <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                setSavedRecipes={setSavedRecipes}
                savedRecipes={savedRecipes}
            />
        ))
    )
}

export default RecipeList