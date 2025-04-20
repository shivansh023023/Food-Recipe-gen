import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { Heart } from "lucide-react";

export default function RecipeItem({ item }) {
  const { favoritesList, handleAddToFavorite } = useContext(GlobalContext);
  
  const isFavorite = favoritesList && favoritesList.some(fav => fav.id === item.id);

  return (
    <div className="recipe-card group">
      <div className="card-image-container">
        <img src={item?.image_url} alt={item?.title} className="card-image" />
        {/* Favorite button */}
        <button 
          onClick={() => handleAddToFavorite(item)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${
            isFavorite ? 'bg-orange-600 text-white' : 'bg-white text-orange-600 hover:bg-orange-50'
          }`}
        >
          <Heart size={20} fill={isFavorite ? "white" : "none"} />
        </button>
      </div>
      <div className="card-content">
        <span className="card-publisher">{item?.publisher}</span>
        <h3 className="card-title">{item?.title}</h3>
        <Link
          to={`/recipe-item/${item?.id}`}
          className="btn btn-primary mt-auto self-start mt-4"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}