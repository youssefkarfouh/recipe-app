import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import axios from "axios";
import Aside from "../components/Aside";
import RecipeList from "../components/RecipeList";
import Pagination from "../components/Pagination";

function Home() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isRandom, setRandom] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [recipesPerPage, setRecipesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex)


  function getReciepesCateg(categorie) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
      .then((res) => {
        setRecipes(res.data.meals);
      });
  }

  function paginate(nbr) {
    setCurrentPage(nbr)
  }


  useEffect(() => {

    function fetchCategories() {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then((res) => {
          setCategories(res.data.categories);
        });
    }
    function fetchRandomRecipe() {
      axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res) => {
        setRecipes(res.data.meals);


      });
    }
    function getSavedRecipes() {
      const data = JSON.parse(localStorage.getItem('recipes'))

      if (data) setSavedRecipes(data)
    }
    fetchCategories();
    fetchRandomRecipe();
    getSavedRecipes();
    // Clean up the event listener when the component unmounts

  }, []);

  return (
    <>
      <Header setRandom={setRandom} setRecipes={setRecipes} savedRecipes={savedRecipes} setIsOpened={setIsOpened} />
      <main>
        <Aside setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes} setIsOpened={setIsOpened} isOpened={isOpened} />
        <div className="container">
          <Categories
            categories={categories}
            getReciepesCateg={getReciepesCateg}
            setRandom={setRandom}

          />
          <div className="meals-container">
            <RecipeList
              isRandom={isRandom}
              setRecipes={setRecipes}
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
              recipes={currentRecipes} />
          </div>

          <Pagination  currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
        </div>
      </main>
    </>
  );
}

export default Home;
