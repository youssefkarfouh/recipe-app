import axios from "./axios";

export const fetchCategories = async () => {
  const { data } = await axios.get('/categories.php');
  return data;
};
export const recipesByCategory = async (name:string) => {
  const { data } = await axios.get('/filter.php',{
    params: {
      c: name,
    },
  });
  return data;
};
export const recipeById = async (id:string) => {
  const { data } = await axios.get('/lookup.php',{
    params: {
      i : id
    },
  });
  return data;
};
export const searchRecipe = async (searchTerm:string) => {
  const { data } = await axios.get('/search.php',{
    params: {
      s: searchTerm,
    },
  });
  return data;
};