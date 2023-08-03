import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import axios from "axios";
import Aside from "../components/aside/Aside";
import RecipeCard from "../components/recipeCard/RecipeCard";

function Home() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isRandom, setRandom] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([])

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
      <Header setRecipes={setRecipes} savedRecipes={savedRecipes} setIsOpened={setIsOpened} />
      <main>
        <Aside setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes} setIsOpened={setIsOpened} isOpened={isOpened} />
        <div className="container">
          <Categories
            categories={categories}
            getReciepesCateg={getReciepesCateg}
            setRandom={setRandom}

          />
          <div className="meals-container">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                isRandom={isRandom}
                recipe={recipe}
                setSavedRecipes={setSavedRecipes}
                savedRecipes={savedRecipes}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
