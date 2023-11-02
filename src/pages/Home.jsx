import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import axios from "axios";
import Aside from "../components/Aside";
import RecipeList from "../components/RecipeList";
import Pagination from "../components/Pagination";

function Home() {
  const [categories, setCategories] = useState([]);
  const [recipesPerPage, setRecipesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex)



  function paginate(nbr) {
    setCurrentPage(nbr)
  }



  function getReciepesCateg(categorie) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
      .then((res) => {
        setRecipes(res.data.meals);
      });
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
   
    fetchCategories();
    fetchRandomRecipe();
   

  }, []);

  return (
    <>

      <div className="container">
        <Categories
          categories={categories}
          getReciepesCateg={getReciepesCateg}
        // setRandom={setRandom}

        />
        <div className="meals-container">
          <RecipeList
          // setRecipes={setRecipes}
          // savedRecipes={savedRecipes}
          // setSavedRecipes={setSavedRecipes}
           recipes={currentRecipes} 
          />
        </div>

        <Pagination currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
      </div>


    </>
  );
}

export default Home;
