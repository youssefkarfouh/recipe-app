import React from "react";

function Categories({ categories, getReciepesCateg }) {
  const listCategories = categories?.map((cat) => (
    <li key={cat.idCategory} onClick={() => getReciepesCateg(cat.strCategory)}>
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
