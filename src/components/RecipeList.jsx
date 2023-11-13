import React from 'react'
import RecipeCard from './RecipeCard'

function RecipeList({ isRandom,recipes }) {

    
    return (

        recipes?.map((recipe) => (
            <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isRandom={isRandom}
            />
        ))
    )
}

export default RecipeList