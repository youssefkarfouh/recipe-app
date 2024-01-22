import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ImageFallback from "./ImageFallback";


function Categories() {
  const [selectedCateg, setSelectedCateg] = useState("");
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
  }, []);

  function handClick(strCategory) {
    navigate(`/category/${strCategory}`);

    setSelectedCateg(strCategory);
  }



  const listCategories = categories?.map((cat) => (
    <div
      key={cat.idCategory}
      className={`text-center cursor-pointer hover:text-main font-bold ${cat.strCategory === selectedCateg ? "active" : ""}`}
      onClick={() => handClick(cat.strCategory)}
    >
      <ImageFallback
        src={cat.strCategoryThumb}
        alt={cat.strCategory}
        className="mx-auto block size-40 rounded-full object-cover shadow-[0_5px_19px_-10px_#0000006e]"
      />
      <span className="block text-center mt-4">{cat.strCategory}</span>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {listCategories}
    </div>
  );
}

export default Categories;
