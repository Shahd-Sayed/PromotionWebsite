import { Package, ShoppingCart, Eye } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products = [] }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const APIBase = import.meta.env.VITE_API_URL;

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div
        className={`text-center py-16 rounded-2xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3
          className={`text-xl font-semibold mb-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          No Products Yet
        </h3>
        <p className="text-gray-500">Products will be added soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
      {products.map((product) => (
        <div
          key={product.id}
          className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div
            onClick={() => navigate(`/products/${product.id}`)}
            className="relative h-48 overflow-hidden"
          >
            {product.image ? (
              <img
                src={`${APIBase}/storage/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-300">
                <Package className="w-16 h-16 text-gray-500" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30">
                <Eye className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30">
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p
              className={`text-sm mb-3 line-clamp-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600">
                {product.price} EGP
              </span>
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded-lg"
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
