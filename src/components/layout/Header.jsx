import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Container } from "react-bootstrap";
import { Menu, Moon, ShoppingCart, Sun, User, LogOut, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; 
export default function Header({ cartItemsCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`${
        isDarkMode
          ? "bg-slate-900"
          : "bg-linear-to-r from-emerald-600 to-teal-600"
      } py-4 shadow-lg duration-300 sticky top-0 z-50`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h3
              onClick={() => navigate("/")}
              className="text-2xl font-serif text-white font-bold cursor-pointer"
            >
              Capital Agro
            </h3>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/")}
              className="text-white text-sm font-medium uppercase text-decoration-none hover:text-emerald-100 cursor-pointer"
            >
              Home
            </a>

            <a
              onClick={() => navigate("/categories")}
              className="text-white text-sm font-medium uppercase text-decoration-none hover:text-emerald-100 cursor-pointer"
            >
              Categories
            </a>

            <a
              onClick={() => navigate("/products")}
              className="text-white text-sm font-medium uppercase text-decoration-none hover:text-emerald-100 cursor-pointer"
            >
              Products
            </a>
          </div>

          <div className="flex items-center space-x-4 gap-2">
            <button
              onClick={toggleTheme}
              className="text-white hover:text-emerald-100 hover:scale-110 transition"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <button
                onClick={logout}
                className="text-white hover:text-emerald-100 hidden md:flex items-center gap-1"
              >
                <LogOut size={20} /> Logout
              </button>
            ) : (
              <button
                className="text-white hover:text-emerald-100 hidden md:block"
                onClick={() => navigate("/login")}
              >
                <User size={20} />
              </button>
            )}

            <button
              onClick={() => navigate("/cart")}
              className="relative text-white hover:text-emerald-100 hidden md:block"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button onClick={toggleMenu} className="md:hidden text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <Container
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="backdrop-blur-sm rounded-lg space-y-3">
            <button
              onClick={() => {
                navigate("/");
                toggleMenu();
              }}
              className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate("/categories");
                toggleMenu();
              }}
              className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
            >
              Categories
            </button>

            <button
              onClick={() => {
                navigate("/products");
                toggleMenu();
              }}
              className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
            >
              Products
            </button>

            <button
              onClick={() => {
                navigate("/cart");
                toggleMenu();
              }}
              className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
            >
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-2 bg-red-500 text-xs font-bold text-white rounded-full px-2 py-1">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
                className="block w-full text-left text-white hover:text-emerald-100 uppercase py-2"
              >
                Login
              </button>
            )}
          </div>
        </Container>
      </Container>
    </nav>
  );
}
