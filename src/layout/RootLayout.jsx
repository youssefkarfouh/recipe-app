import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
function RootLayout() {
  return (
    <div className="App">
      <Header />
      <main className="pb-10 pt-28">
        <Aside />
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
