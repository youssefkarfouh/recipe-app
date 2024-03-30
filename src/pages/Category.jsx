import React, { useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAxios from "../hooks/useAxios";

function Category() {
  const [response, error, loading, axiosFetch] = useAxios();
  const { name } = useParams();

  useEffect(() => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: `/filter.php`,
      requestConfig: {
        params: {
          c: name,
        },
      },
    });
  }, [name]);

  if (loading) {
    return <p>.... isLoading</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <RecipeList recipes={response?.meals} />
      </div>
    </>
  );
}

export default Category;
