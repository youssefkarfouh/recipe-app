import React from 'react'
import RecipeList from '../components/RecipeList'
import Pagination from '../components/Pagination'

function Category() {
    return (

        <>
            <div className="meals-container">
                <RecipeList
                    recipes={currentRecipes}
                />
            </div>

            <Pagination currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} />
        </>
    )
}

export default Category