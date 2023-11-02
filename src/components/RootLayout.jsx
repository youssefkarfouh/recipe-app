import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Aside from './Aside';

function RootLayout() {

  const [isOpened, setIsOpened] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isRandom, setRandom] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);


  useEffect(() => {

    function getSavedRecipes() {
      const data = JSON.parse(localStorage.getItem('recipes'))

      if (data) setSavedRecipes(data)
    }

    getSavedRecipes();
  }, [])





  return (

    <div className='App'>
      <Header setRandom={setRandom} setRecipes={setRecipes}
        savedRecipes={savedRecipes} setIsOpened={setIsOpened} />
      <main>
        <Aside setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes} setIsOpened={setIsOpened} isOpened={isOpened} />

        <Outlet context={{ savedRecipes, setSavedRecipes, isOpened, setIsOpened, recipes, setRecipes, isRandom, setRandom }} />
      </main>
    </div>


  )
}

export default RootLayout