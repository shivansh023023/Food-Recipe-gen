import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  image_url: string;
  publisher: string;
}

interface GlobalContextType {
  searchParam: string;
  loading: boolean;
  recipeList: Recipe[];
  favoritesList: Recipe[];
  recipeDetailsData: any;
  setSearchParam: (param: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  setRecipeDetailsData: (data: any) => void;
  handleAddToFavorite: (item: Recipe) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalStateProps {
  children: ReactNode;
}

export default function GlobalState({ children }: GlobalStateProps) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState<Recipe[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!searchParam.trim()) return;
    
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        setSearchParam("");
        navigate('/');
      }
    } catch (e) {
      console.error("Error fetching recipes:", e);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorite(getCurrentItem: Recipe) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList = cpyFavoritesList.filter(item => item.id !== getCurrentItem.id);
    }

    setFavoritesList(cpyFavoritesList);
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