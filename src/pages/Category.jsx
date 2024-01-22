import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'
import { useAppContext } from '../context/SharedData';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function Category() {

    const { name } = useParams();
    const { recipes, setRecipes } = useAppContext();


    useEffect(() => {

        const isMounted = true;
        const controller = new AbortController();
        const getReciepesCateg = async (categorie) => {

            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`, { signal: controller.signal })
                isMounted && setRecipes(response.data.meals);
            }
            catch (error) {

                console.log(error)
            }

        }

        getReciepesCateg(name)

        return () => {
            controller.abort();
        };

    }, [name])



    return (

        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <RecipeList recipes={recipes} />
            </div>

        </>
    )
}

export default Category