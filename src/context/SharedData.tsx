import React, { ReactNode, createContext, useContext, useState } from "react";
import { I_SharedData } from "../interfaces/sharedData";

const AppContext = createContext<I_SharedData>({
  isOpened : false,
  savedRecipes : [],
  setSavedRecipes: () => {},
  setIsOpened: () => {},

});


export const SharedData = ({ children }:{ children: ReactNode }) => {
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
