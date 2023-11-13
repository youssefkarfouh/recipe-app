import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import Pagination from "../components/Pagination";
import { useAppContext } from "../context/SharedData";


function Home() {

  const { setRecipes, recipes } = useAppContext()

  const [recipesPerPage, setRecipesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex)

  function paginate(nbr) {
    setCurrentPage(nbr)
  }

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
          recipes={currentRecipes}
        />
      </div>

      <Pagination currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
    </>
  );
}

export default Home;
