import { useLocation } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { useScrollRefs } from "./hooks/useScrollRefs";
import { useEffect } from "react";
import { AppRoutes } from "./Routes/AppRoutes";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/layout/Header";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartItemsCount } =
    useCart();
  const { scrollToSection } = useScrollRefs();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen">
          {!hideHeaderFooter && (
            <Header
              scrollToSection={scrollToSection}
              cartItemsCount={cartItemsCount}
            />
          )}

          <AppRoutes
            addToCart={addToCart}
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />

          {!hideHeaderFooter && <Footer />}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
