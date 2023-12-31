import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Aside from './Aside';
import { useAppContext } from '../context/SharedData';
import Categories from './Categories';
import useAuth from '../hooks/useAuth';

function RootLayout() {

  const { setSavedRecipes, setRecipes } = useAppContext();
  const { persist } = useAuth()

  useEffect(() => {
    getSavedRecipes();
    console.log('persist in layout' , persist)
  }, [])

  function getSavedRecipes() {
    const data = JSON.parse(localStorage.getItem('recipes'))

    if (data) setSavedRecipes(data)
  }


  return (
    <div className='App'>

      <Header />
      <main>
        <Aside />
        <div className="container">
          <Categories />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default RootLayout