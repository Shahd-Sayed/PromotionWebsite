import { Route, Routes } from "react-router-dom";
import Home from "./../Pages/Home";
import CategoryPage from "./../Pages/CategoryPage";
import CategoryDetailsPage from "../pages/CategoryDetailsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import RegisterPage from "./../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

export const AppRoutes = ({
  addToCart,
  cart,
  removeFromCart,
  updateQuantity,
  refs,
}) => (
  <Routes>
    <Route path="/" element={<Home refs={refs} addToCart={addToCart} />} />
    <Route path="/products" element={<ProductPage addToCart={addToCart} />} />
    <Route path="/categories" element={<CategoryPage />} />
    <Route path="/categories/:id" element={<CategoryDetailsPage />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </ProtectedRoute>
      }
    />
  </Routes>
);
