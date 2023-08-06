import React from 'react'

function Pagination({ currentPage,recipesPerPage, totalRecipes  , paginate}) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {

        pageNumbers.push(i);
    }

    return (
        <ul className='pagination mt-5 pagination-md'>
            {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} >
                    <button onClick={()=>paginate(number)} href='!#' className='page-link'>
                        {number}
                    </button>
                    
                </li>
            ))}
        </ul>
    )
}

export default Pagination