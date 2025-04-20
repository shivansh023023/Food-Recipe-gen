import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState(() => {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchParam.trim()) return;
    
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setSearchParam("");
        navigate('/');
      }
    } catch (e) {
      console.error("Error fetching recipes:", e);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList = cpyFavoritesList.filter(item => item.id !== getCurrentItem.id);
    }

    setFavoritesList(cpyFavoritesList);
    // Save to localStorage
    localStorage.setItem("favoriteRecipes", JSON.stringify(cpyFavoritesList));
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}