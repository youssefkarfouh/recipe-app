import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoCheckbox, IoSquare } from "react-icons/io5";
import { IconContext } from "react-icons";
import ImageFallback from "../components/ImageFallback";

function RecipeDetail() {
  const { id } = useParams();

  const [recipeDetail, setRecipeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { strTags, strInstructions } = recipeDetail;

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log("res", res);
        console.log("id", id);
        setRecipeDetail(res.data.meals[0]);
        setIsLoading(false);
      });
  }, [id]);

  const listTags = strTags?.split(",").map((tag, index) => {
    return (
      <span
        key={index}
        className="mr-2 inline-block rounded  bg-main px-2 py-1 text-sm font-normal text-white"
      >
        {tag}
      </span>
    );
  });

  const listInstructions = strInstructions
    ?.split(".")
    .map((instruct, index) => {
      return (
        instruct && (
          <li key={index} className="mb-2">
            <IoCheckbox className="mr-2 inline-block" />
            {instruct}
          </li>
        )
      );
    });

  const listIngredients = Array.from({ length: 20 }, (v, i) => {
    return (
      <>
        {recipeDetail[`strIngredient${i + 1}`] && (
          <li key={i} className="mb-2">
            <IoSquare className="mr-2 inline-block" />
            {`${recipeDetail[`strMeasure${i + 1}`]} 
            ${recipeDetail[`strIngredient${i + 1}`]}`}
          </li>
        )}
      </>
    );
  });

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <IconContext.Provider value={{ className: "text-main" }}>
      <article className="grid gap-10">
        <h1 className="mb-4 text-4xl font-bold">{recipeDetail.strMeal}</h1>
        <div>
          <ImageFallback
            className="size-60 object-cover"
            src={recipeDetail.strMealThumb}
            alt={recipeDetail.strMeal}
            title={recipeDetail.strMeal}
          ></ImageFallback>
        </div>

        {listTags?.length > 0 && <div>{listTags}</div>}

        <div>
          <h2 className="mb-4 text-xl font-medium">Ingredients</h2>
          <ul>{listIngredients}</ul>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-medium">Instructions</h2>
          <ul>{listInstructions}</ul>
        </div>
      </article>
    </IconContext.Provider>
  );
}

export default RecipeDetail;
