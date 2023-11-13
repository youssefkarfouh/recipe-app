import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const SharedData = ({ children }) => {
	const [ isRandom, setRandom ] = useState(false);
	const [ recipes, setRecipes ] = useState([]);
	const [ savedRecipes , setSavedRecipes] = useState([]);
	const [ isOpened, setIsOpened ] = useState(false);

	const contextValue = {
		isRandom ,
		setRandom,
		recipes,
		setRecipes,
		setSavedRecipes,
		savedRecipes,
		setIsOpened,
		isOpened
	};

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('useAppContext must be used within an SharedData');
	}

	return context;
};
