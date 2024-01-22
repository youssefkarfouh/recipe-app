import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { useAppContext } from "../context/SharedData";
import ImageFallback from "./ImageFallback";


function RecipeCard({ recipe }) {

  const { name } = useParams();


  const { setSavedRecipes, savedRecipes } = useAppContext()

  function isMealExist(savedData, idMeal) {

    return savedData.some(recipe => recipe.idMeal === idMeal);

  }

  function saveRecipe(recipe) {
    const { strMealThumb, strMeal, idMeal } = recipe;
    const recipeObj = { strMealThumb, idMeal, strMeal }
    const isRecipeExist = isMealExist(savedRecipes, idMeal)

    // if exist delete it 
    if (isRecipeExist) {
      const filteredData = savedRecipes.filter(ele => ele.idMeal !== idMeal)
      setSavedRecipes(prev => filteredData)
      localStorage.setItem("recipes", JSON.stringify(filteredData))
    }
    // otherwise  save it 
    else {
      setSavedRecipes(prev => [...prev, recipeObj])
      localStorage.setItem("recipes", JSON.stringify([...savedRecipes, recipeObj]))
    }


  }


  return (
    <div className="shadow-[0_0_10px_2px_#3333331a]" >
      <div className="relative" >

        <Link to={`/category/${name}/${recipe.idMeal}`}  >
          <ImageFallback
            src={recipe.strMealThumb}
            alt={`${recipe.strMeal}`}
            title={`${recipe.strMeal}`}
          />

        </Link>
      </div>
      <div className="flex items-center justify-between py-6 px-4">
        <h5 className="whitespace-nowrap text-ellipsis overflow-hidden max-w-56 text-base">{recipe.strMeal} </h5>
        <button className={`p-0 border-0 bg-transparent cursor-pointer text-lg  transition-all`}>
          <IoHeart size={25} className={`hover:text-main transition-colors ${isMealExist(savedRecipes, recipe.idMeal) ? 'text-main':'text-slate-200'}`} onClick={() => saveRecipe(recipe)} />
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
