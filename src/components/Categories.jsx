import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";


function Categories() {

  const [selectedCateg, setSelectedCateg] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    function fetchCategories() {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then((res) => {
          setCategories(res.data.categories);
        });
    }


    fetchCategories();

  }, [])


  function handClick(strCategory) {

    navigate(`/category/${strCategory}`)

    setSelectedCateg(strCategory);
  }



  const listCategories = categories?.map((cat) => (

    <div key={cat.idCategory}
      className={`category-item ${cat.strCategory === selectedCateg ? "active" : ""}`}
      onClick={() => handClick(cat.strCategory)}>
      <img src={cat.strCategoryThumb} alt={cat.strCategory} />
      <span className='category-name'>{cat.strCategory}</span>
    </div>
  ));

  return (
    <div className="categories">
      {listCategories}
    </div>
  );
}

export default Categories;
