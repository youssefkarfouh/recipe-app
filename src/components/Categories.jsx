import React, { useState } from "react";


function Categories({ setRandom, categories, getReciepesCateg }) {

const [selectedCateg , setSelectedCateg] = useState('');

  function handClick(category) {
    getReciepesCateg(category.strCategory)
    setRandom(false)
    setSelectedCateg(category.strCategory);
  }


  const listCategories = categories?.map((cat) => (
    <li key={cat.idCategory} className={cat.strCategory === selectedCateg ? "active" : "" } onClick={()=>handClick(cat)}>
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
