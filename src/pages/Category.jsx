import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'
import Pagination from '../components/Pagination'
import { useAppContext } from '../context/SharedData';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function Category() {

    const { name } = useParams();
    const { recipes, setRecipes } = useAppContext();
    const [recipesPerPage, setRecipesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex)

    function paginate(nbr) {
        setCurrentPage(nbr)
    }

    useEffect(() => {

        getReciepesCateg(name)

    }, [name])

    function getReciepesCateg(categorie) {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
            .then((res) => {
                setRecipes(res.data.meals);
            });
    }

    return (

        <>
            <div className="meals-container">
                <RecipeList recipes={currentRecipes} isRandom={false} />
            </div>
            <Pagination currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
        </>
    )
}

export default Category