import React from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";

function RecipeCard({ recipe }) {
  const { idMeal, strMealThumb, strMeal } = recipe;
  return (
    <div className="meal">
      <div className="meal-header">
        <span className="random">Random recipe</span>
        <Link to={`/recipe/${idMeal}`} target="_blank">
          <img
            src={strMealThumb}
            alt="Chick-Fil-A Sandwich"
            title="Chick-Fil-A Sandwich"
          />
        </Link>
      </div>
      <div className="meal-body">
        <h5>{strMeal}</h5>
        <button className="fav-btn">
          <IoHeartOutline />
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
