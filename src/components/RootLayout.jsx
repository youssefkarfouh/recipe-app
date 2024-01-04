import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Aside from './Aside';
function RootLayout() {




  return (
    <div className='App'>

      <Header />
      <main>
        <Aside />
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default RootLayout