import { ShoppingCart, Plus, Minus, ArrowLeft, Trash2 } from "lucide-react";
import { Container } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

const CartPage = ({ cart, setCurrentPage, removeFromCart, updateQuantity }) => {
  const { isDarkMode } = useTheme();
  const APIBase = import.meta.env.VITE_API_URL;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      } transition-colors duration-300 py-8`}
    >
      <Container className="animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <ShoppingCart
              className={`${
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
              size={32}
            />
            <h1
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Shopping Cart
            </h1>

            {cart.length > 0 && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isDarkMode
                    ? "bg-emerald-900 text-emerald-200"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            )}
          </div>

         
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div
              className={`mb-6 p-8 rounded-full ${
                isDarkMode ? "bg-slate-800" : "bg-gray-200"
              }`}
            >
              <ShoppingCart
                size={80}
                className={isDarkMode ? "text-slate-600" : "text-gray-400"}
              />
            </div>

            <h2
              className={`text-2xl font-semibold mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your cart is empty
            </h2>

            <p
              className={`mb-6 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You haven’t added any products yet.
            </p>

            <button
              onClick={() => setCurrentPage("home")}
              className="bg-linear-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className={`${
                    isDarkMode ? "bg-slate-800" : "bg-white"
                  } rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 animate-slideIn`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {item.image && (
                      <img
                        src={`${APIBase}/storage/${item.image}`}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}

                    <div className="text-center md:text-right">
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.name}
                      </h3>

                      <p
                        className={`text-2xl font-bold mb-4 ${
                          isDarkMode
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }`}
                      >
                        {item.price} EGP
                      </p>

                      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isDarkMode
                              ? "bg-slate-700 hover:bg-slate-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          } hover:scale-110`}
                        >
                          <Minus size={20} />
                        </button>

                        <span
                          className={`text-xl font-bold w-16 text-center ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isDarkMode
                              ? "bg-slate-700 hover:bg-slate-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          } hover:scale-110`}
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <div className="text-center md:text-right">
                        <p
                          className={`text-sm mb-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Subtotal
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            isDarkMode
                              ? "text-emerald-400"
                              : "text-emerald-600"
                          }`}
                        >
                          {(item.price * item.quantity).toFixed(2)} EGP
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`text-red-500 hover:text-red-700 p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                        isDarkMode ? "hover:bg-red-900/20" : "hover:bg-red-50"
                      }`}
                      aria-label="Remove item"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div
                className={`${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                } rounded-xl shadow-lg p-6 sticky top-24 animate-slideUp`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 text-center ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Items
                    </span>
                    <span
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Subtotal
                    </span>
                    <span
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {totalPrice.toFixed(2)} EGP
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Shipping
                    </span>
                    <span
                      className={`text-lg font-semibold ${
                        isDarkMode
                          ? "text-emerald-400"
                          : "text-emerald-600"
                      }`}
                    >
                      Free
                    </span>
                  </div>

                  <div
                    className={`border-t pt-4 ${
                      isDarkMode ? "border-slate-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Total
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          isDarkMode
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }`}
                      >
                        {totalPrice.toFixed(2)} EGP
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-bold text-lg">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => setCurrentPage("home")}
                  className={`w-full mt-3 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    isDarkMode
                      ? "bg-slate-700 text-white hover:bg-slate-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; opacity: 0; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default CartPage;
