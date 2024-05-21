import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageFallback from "./ImageFallback";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/endpoints";

function Categories() {
  
  const navigate = useNavigate();
  
  const { data, isPending, isError , error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });


  function handClick(strCategory) {
    navigate(`/category/${strCategory}`);
  }

  const listCategories = data?.categories?.map((cat) => (
    <div
      key={cat.idCategory}
      className={`cursor-pointer text-center font-bold `}
      onClick={() => handClick(cat.strCategory)}
    >
      <ImageFallback
        src={cat.strCategoryThumb}
        alt={cat.strCategory}
        className="mx-auto block size-40 rounded-full object-cover shadow-[0_5px_19px_-10px_#0000006e] dark:bg-white"
      />
      <span className="mt-4 block text-center text-darkColor hover:text-main  dark:text-main-50 dark:hover:text-main">
        {cat.strCategory}
      </span>
    </div>
  ));

  if (isPending) {
    return <div>Loading ...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {listCategories}
    </div>
  );
}

export default Categories;
