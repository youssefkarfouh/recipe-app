import React from "react";
import RecipeCard from "./RecipeCard";

function Recipes({ recipes }) {
  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </>
  );
}

export default Recipes;
