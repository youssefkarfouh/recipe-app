import React, { useEffect } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import { useAppContext } from "../context/SharedData";



function Home() {

  const { setRecipes, recipes } = useAppContext();


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
