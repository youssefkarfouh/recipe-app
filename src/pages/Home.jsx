import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import axios from "axios";

function Home() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  
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
      <Header />
      <main>
        <aside>
          <button className="close">
            <i className="fas fa-close"></i>
          </button>
          <h3>Favorite Meals</h3>
          <ul className="fav-meals"></ul>
        </aside>
        <div className="container">
          <Categories
            categories={categories}
            getReciepesCateg={getReciepesCateg}
          />
          <div className="meals-container">
            <Recipes recipes={recipes} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
