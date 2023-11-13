import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Aside from './Aside';
import { useAppContext } from '../context/SharedData';
import Categories from './Categories';
import axios from 'axios';

function RootLayout() {

  const { setSavedRecipes, setRecipes } = useAppContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    getSavedRecipes();
  }, [])

  function getSavedRecipes() {
    const data = JSON.parse(localStorage.getItem('recipes'))

    if (data) setSavedRecipes(data)
  }

  function fetchCategories() {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => {
        setCategories(res.data.categories);
      });
  }

  function getReciepesCateg(categorie) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
      .then((res) => {
        setRecipes(res.data.meals);
      });
  }

  return (
    <div className='App'>
      <Header />
      <main>
        <Aside />
        <div className="container">
          <Categories
            categories={categories}
            getReciepesCateg={getReciepesCateg}
          />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default RootLayout