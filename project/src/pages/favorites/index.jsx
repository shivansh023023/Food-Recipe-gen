import { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";
import EmptyState from "../../components/empty-state";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <section className="section">
      {favoritesList && favoritesList.length > 0 ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Your Favorite Recipes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You have saved {favoritesList.length} recipes to try later
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritesList.map((item, index) => (
              <RecipeItem key={item.id || index} item={item} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState 
          message="Nothing is added in favorites" 
          icon={<Heart size={64} strokeWidth={1.5} />} 
        />
      )}
    </section>
  );
}