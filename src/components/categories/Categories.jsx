import React from "react";


function Categories({ setRandom, categories, getReciepesCateg }) {

  function handClick(categorie) {
    getReciepesCateg(categorie.strCategory)
    setRandom(false)
  }


  const listCategories = categories?.map((cat) => (
    <li key={cat.idCategory} onClick={()=>handClick(cat)}>
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
