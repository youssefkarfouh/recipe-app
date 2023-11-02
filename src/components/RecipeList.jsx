import React from 'react'
import RecipeCard from './RecipeCard'
import { useOutletContext } from 'react-router-dom';

function RecipeList({ savedRecipes, setSavedRecipes }) {
    const { isOpened, setIsOpened, recipes, setRecipes, isRandom, setRandom } = useOutletContext(); 


    console.log("tttt", isOpened);
    return (

        recipes?.map((recipe) => (
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