import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context";
import { ChefHat, Search, X } from "lucide-react";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-600">
            <NavLink to={"/"} className="flex items-center gap-2">
              <ChefHat size={28} className="text-orange-600" />
              <span className="hidden sm:block">FoodRecipe</span>
            </NavLink>
          </h2>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Search */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                name="search"
                value={searchParam}
                onChange={(event) => setSearchParam(event.target.value)}
                placeholder="Search recipes..."
                className="input-search"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Nav Links */}
            <ul className="flex gap-8">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/favorites"}
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Search size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 lg:hidden">
            <form onSubmit={handleSubmit} className="relative mb-4">
              <input
                type="text"
                name="search"
                value={searchParam}
                onChange={(event) => setSearchParam(event.target.value)}
                placeholder="Search recipes..."
                className="input-search w-full"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600"
              >
                <Search size={20} />
              </button>
            </form>
            <ul className="flex gap-8 justify-center py-3 border-t border-gray-100">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/favorites"}
                  className={({ isActive }) => 
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}