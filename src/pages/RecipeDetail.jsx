import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoCheckbox } from "react-icons/io5";

function RecipeDetail() {
  const { id } = useParams();

  console.log("id" ,  useParams())
  const [recipeDetail, setRecipeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { strTags, strInstructions } = recipeDetail;

  const listTags = strTags?.split(",").map((tag, index) => {
    return <span key={index}>{tag}</span>;
  });

  const listInstructions = strInstructions?.split(".").map((instruct, index) => {
      return (
        instruct && (
          <li key={index} className="icon-wrap">
            <IoCheckbox />
            {instruct}
          </li>
        )
      );
    });

  const listIngredients = Array.from({ length: 20 }, (v, i) => {
  
    return (
      <>
        {recipeDetail[`strIngredient${i + 1}`] && (
          <li key={i}>
            <IoCheckbox /> 
            {`${recipeDetail[`strMeasure${i + 1}`]} 
            ${recipeDetail[`strIngredient${i + 1}`]}`}
          </li>
        )}
      </>
    );
  });

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setRecipeDetail(res.data.meals[0]);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading">
        Loading ...
      </div>
    );
  }

  return (
    <article className="single-meal-page">
      <div className="container">
        <article className="meal">
          <h1>{recipeDetail.strMeal}</h1>
          <div className="meal-header">
            <img
              src={recipeDetail.strMealThumb}
              alt={recipeDetail.strMeal}
              title={recipeDetail.strMeal}
            />
          </div>

          {listTags?.length > 0 && <div className="tags">{listTags}</div>}

          <div className="meal-infos">
            <h2>Ingredients</h2>
            <ul>{listIngredients}</ul>

            <h2>Instructions</h2>
            <ul>{listInstructions}</ul>
          </div>
        </article>
      </div>
    </article>
  );
}

export default RecipeDetail;
