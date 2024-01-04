import React, { useEffect, useRef } from 'react'

import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoRemoveCircleSharp } from "react-icons/io5";
import useClickOutside from '../hooks/useClickOutside';
import { useAppContext } from '../context/SharedData';


const Aside = () => {

    const { savedRecipes, setSavedRecipes, isOpened, setIsOpened } = useAppContext()

    useEffect(() => {

        function getSavedRecipes() {
            const data = JSON.parse(localStorage.getItem('recipes'))
    
            if (data) setSavedRecipes(data)
        }
        getSavedRecipes();
    }, [])

   


    const ref = useClickOutside(() => {
        setIsOpened(false)
    });

    function removeMeal(idMeal) {

        const filteredData = savedRecipes.filter(ele => ele.idMeal !== idMeal)
        setSavedRecipes(prev => filteredData)
        localStorage.setItem("recipes", JSON.stringify(filteredData))

    }

    const savedData = savedRecipes.map((ele, index) => {
        return <li key={index}>
            <Link to={`/recipe/${ele.idMeal}`}>
                <img src={ele.strMealThumb} alt={ele} />
            </Link>
            <span className="removeMeal" onClick={() => removeMeal(ele.idMeal)}>
                <IoRemoveCircleSharp />
            </span>
        </li>
    })


    return (
        <aside ref={ref} className={isOpened ? "show" : ""}>
            <button className="close" onClick={() => setIsOpened(false)}>
                <IoClose />
            </button>
            <h5>Favorite Meals</h5>
            <ul className="fav-meals">
                {savedData}
            </ul>
        </aside>
    )
}

export default Aside