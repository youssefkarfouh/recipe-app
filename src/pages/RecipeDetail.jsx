import React from "react";
import { useParams } from "react-router-dom";
import { IoCheckbox, IoSquare } from "react-icons/io5";
import { IconContext } from "react-icons";
import ImageFallback from "../components/ImageFallback";
import { recipeById } from "../api/endpoints";
import { useQuery } from "@tanstack/react-query";

function RecipeDetail() {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recipeById" , id],
    queryFn: () => recipeById(id),
  });


  if (isPending) {
    return <div className="">Loading ...</div>;
  }

  if (isError) {
    return <div className="">Error: {error.message}</div>;
  }


  const meal = data?.meals[0];

  const listTags = meal.strTags?.split(",").map((tag, index) => {
    return (
      Boolean(tag) && (
        <span
          key={index}
          className="mr-2 inline-block rounded  bg-main px-2 py-1 text-sm font-normal text-white"
        >
          {tag}
        </span>
      )
    );
  });

  const listInstructions = meal.strInstructions
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
        {meal[`strIngredient${i + 1}`] && (
          <li key={i} className="mb-2">
            <IoSquare className="mr-2 inline-block" />
            {`${meal[`strMeasure${i + 1}`]} 
          ${meal[`strIngredient${i + 1}`]}`}
          </li>
        )}
      </>
    );
  });

  return (
    <IconContext.Provider value={{ className: "text-main" }}>
      <article className="grid gap-10 dark:text-main-50">
        <h1 className="mb-4 text-4xl font-bold ">{meal.strMeal}</h1>
        <div>
          <ImageFallback
            className="size-60 object-cover"
            src={meal.strMealThumb}
            alt={meal.strMeal}
            title={meal.strMeal}
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
