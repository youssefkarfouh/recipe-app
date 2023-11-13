import React from "react";
import {useNavigate } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { useAppContext } from "../context/SharedData";


function RecipeCard({ recipe }) {

  const navigate = useNavigate();
  const { isRandom , setSavedRecipes, savedRecipes } = useAppContext()


  function isMealExist(savedData, idMeal) {

    for (let i = 0; i < savedData.length; i++) {
      if (savedData[i].idMeal === idMeal) {
        return true;
      }
    }
    return false;
  }

  function saveRecipe(recipe) {
    const { strMealThumb, strMeal, idMeal } = recipe;
    const recipeObj = { strMealThumb, idMeal, strMeal }
    const result = isMealExist(savedRecipes, idMeal)

    if (result) {
      const filteredData = savedRecipes.filter(ele => ele.idMeal !== idMeal)
      setSavedRecipes(prev => filteredData)
      localStorage.setItem("recipes", JSON.stringify(filteredData))
    }
    else {
      setSavedRecipes(prev => [...prev, recipeObj])
      localStorage.setItem("recipes", JSON.stringify([...savedRecipes, recipeObj]))
    }


  }

  function navigateToDetail(idMeal){

    console.log("idmeal" , idMeal)

    navigate(`/recipe/${idMeal}`);
  }
  

  return (
    <div className="meal" onClick={(e) => navigateToDetail(recipe.idMeal)}>
      <div className="meal-header">
        {isRandom && <span className="random">Random recipe</span>}
        {/* <Link to={`/recipe/${recipe.idMeal}`}  > */}
        <img
          src={recipe.strMealThumb}
          alt={`${recipe.strMeal}`}
          title={`${recipe.strMeal}`}
        />
        {/* </Link> */}
      </div>
      <div className="meal-body">
        <h5>{recipe.strMeal}</h5>
        <button className={`fav-btn ${isMealExist(savedRecipes, recipe.idMeal) ? 'active' : ''}`} onClick={() => saveRecipe(recipe)}>
          <IoHeart />
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
