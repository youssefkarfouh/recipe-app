import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { IoCheckbox, IoSquare } from "react-icons/io5";
import { IconContext } from "react-icons";
import ImageFallback from "../components/ImageFallback";
import useAxios from "../hooks/useAxios";

function RecipeDetail() {
  const { id } = useParams();
  const [response, error, loading, axiosFetch] = useAxios();

  console.log("loading", loading);

  useEffect(() => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: `/lookup.php`,
      requestConfig: {
        params: {
          i: id,
        },
      },
    });
  }, [id]);

  if (loading) {
    return <div className="">Loading ...</div>;
  }

  if (error) {
    return <div className="">Error: {error.message}</div>;
  }

  if (!response || !response.meals || response.meals.length === 0) {
    return <div>No data available</div>;
  }

  const meal = response.meals[0];

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
