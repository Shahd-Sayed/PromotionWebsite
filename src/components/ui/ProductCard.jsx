import { useState } from "react";
import { ShoppingCart, Check, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart, isDarkMode }) {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const APIBase = import.meta.env.VITE_API_URL;

  const hasActivePromo = product.promotions?.some(
    (promo) => promo.status === "active"
  );

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const goToDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={goToDetails}
      className={`cursor-pointer ${
        isDarkMode ? "bg-slate-800" : "bg-white"
      } rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02]`}>
      {hasActivePromo && (
        <div className="bg-red-500 text-white px-3 py-1 text-sm font-bold absolute z-10 m-2 rounded-full">
          Special Offer
        </div>
      )}

      {product.image ? (
        <img
          src={`${APIBase}/storage/${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-300 rounded-t-xl">
          <Package className="w-16 h-16 text-gray-500" />
        </div>
      )}

      <div className="p-4">
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-2xl font-bold ${
              isDarkMode ? "text-emerald-400" : "text-emerald-600"
            }`}>
            {product.price} EGP
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAdded}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdded
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : isDarkMode
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          } shadow-md hover:shadow-lg transform ${
            isAdded ? "scale-100" : "hover:scale-[1.02]"
          }`}>
          {isAdded ? (
            <>
              <Check size={20} className="animate-bounce" />
              <span>Added to cart</span>
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              <span>Add to cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
