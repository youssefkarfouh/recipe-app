import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import Pagination from "../components/Pagination";
import { useAppContext } from "../context/SharedData";


function Home() {

  const { setRecipes, recipes } = useAppContext()


  useEffect(() => {
    fetchRandomRecipe()
  }, []);

  function fetchRandomRecipe() {
    axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res) => {
      setRecipes(res.data.meals);
    });
  }

  return (
    <>
      <div className="meals-container">
        <RecipeList
          isRandom={true}
          recipes={recipes}
        />
      </div>
    </>
  );
}

export default Home;
