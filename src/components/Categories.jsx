import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAppContext } from "../context/SharedData";


function Categories() {

  const [selectedCateg, setSelectedCateg] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    fetchCategories();
  
  }, [])


  function handClick(category) {
    
    navigate(`/category/${category.strCategory}`)

    setSelectedCateg(category.strCategory);
  }

  function fetchCategories() {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => {
        setCategories(res.data.categories);
      });
  }



  const listCategories = categories?.map((cat) => (
    <li key={cat.idCategory} className={cat.strCategory === selectedCateg ? "active" : ""} onClick={() => handClick(cat)}>
      <img src={cat.strCategoryThumb} alt={cat.strCategory} />
      <span>{cat.strCategory}</span>
    </li>
  ));

  return (
    <div className="categories">
      <ul>{listCategories}</ul>
    </div>
  );
}

export default Categories;
