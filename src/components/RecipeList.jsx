import React from 'react'
import RecipeCard from './RecipeCard'

function RecipeList({recipes }) {

    
    return (

        recipes?.map((recipe) => (
            <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
               
            />
        ))
    )
}

export default RecipeList