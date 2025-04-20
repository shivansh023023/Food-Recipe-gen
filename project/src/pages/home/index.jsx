import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
import Loading from "../../components/loading";
import EmptyState from "../../components/empty-state";
import { Salad, Search } from "lucide-react";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) return <Loading />;

  return (
    <section className="section">
      {recipeList && recipeList.length > 0 ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Discover Delicious Recipes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Found {recipeList.length} amazing recipes for you to try at home
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipeList.map((item, index) => (
              <RecipeItem key={item.id || index} item={item} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState 
          message="Nothing to show. Please search something" 
          icon={<Search size={64} strokeWidth={1.5} />}
        />
      )}
    </section>
  );
}