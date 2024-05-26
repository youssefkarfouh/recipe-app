import React from "react";
import RecipeList from "../components/RecipeList";
import { useParams } from "react-router-dom";
import { recipesByCategory } from "../api/endpoints";
import { useQuery } from "@tanstack/react-query";

function Category() {
  const { name } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recipesByCategory"],
    queryFn: () => recipesByCategory(name),
  });

  if (isPending) {
    return <p>.... isLoading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <RecipeList recipes={data?.meals} />
      </div>
    </>
  );
}

export default Category;
