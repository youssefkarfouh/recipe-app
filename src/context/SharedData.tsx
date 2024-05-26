import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const SharedData = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const contextValue = {
    savedRecipes,
    setSavedRecipes,
    isOpened,
    setIsOpened,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  console.log("context value:", context);

  if (!context) {
    throw new Error("useAppContext must be used within an SharedData");
  }

  return context;
};
