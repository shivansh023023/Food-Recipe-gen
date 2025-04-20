import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { Clock, Users, Heart, ChefHat, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecipeDetails() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();

        if (data?.data) {
          setRecipeDetailsData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  if (loading) return <Loading />;

  const recipe = recipeDetailsData?.recipe;
  const isFavorite = favoritesList && favoritesList.some(item => item.id === recipe?.id);

  if (!recipe) return <div className="text-center py-12">Recipe not found</div>;

  return (
    <section className="section">
      <Link to="/" className="inline-flex items-center gap-1 text-gray-600 hover:text-orange-600 mb-4 transition-colors">
        <ArrowLeft size={16} /> Back to recipes
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="h-[400px] lg:h-auto overflow-hidden">
            <div className="h-full w-full group">
              <img
                src={recipe.image_url}
                className="detail-image group-hover:scale-105"
                alt={recipe.title}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="mb-4 flex items-center">
              <span className="text-green-700 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
                {recipe.publisher}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} className="text-orange-500" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} className="text-orange-500" />
                <span>Serves 4</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ChefHat size={18} className="text-orange-500" />
                <span>Medium</span>
              </div>
            </div>

            <button
              onClick={() => handleAddToFavorite(recipe)}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 mb-8 ${
                isFavorite
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-white border border-orange-600 text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Heart size={18} fill={isFavorite ? "white" : "none"} />
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>

            <div className="mt-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h3>
              <ul className="flex flex-col gap-1 bg-orange-50 p-4 rounded-lg">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-marker"></span>
                    <span className="ingredient-text">
                      {ingredient.quantity && <span className="font-medium">{ingredient.quantity} </span>}
                      {ingredient.unit && <span>{ingredient.unit} </span>}
                      <span>{ingredient.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}