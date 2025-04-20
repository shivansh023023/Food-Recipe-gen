import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Details from "./pages/details";

function App() {
  return (
    <div className="min-h-screen bg-[#f9f7f3] text-gray-800">
      <Navbar />
      <main className="pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200 bg-white">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} FoodRecipe - Find your next culinary adventure</p>
        </div>
      </footer>
    </div>
  );
}

export default App;