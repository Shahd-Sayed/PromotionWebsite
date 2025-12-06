import { ShoppingCart, Plus, Minus, ArrowLeft, Trash2, Package, Tag, CreditCard } from "lucide-react";
import { Container } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CartPage = ({ cart = [], removeFromCart, updateQuantity }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const APIBase = import.meta.env.VITE_API_URL;
  const [removingItem, setRemovingItem] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItem(null);
    }, 300);
  };

  return (
    <div
      className={`min-h-screen py-4 sm:py-6 lg:py-8 ${
        isDarkMode 
          ? "bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-linear-to-br from-gray-50 via-white to-gray-100"
      }`}>
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 animate-fadeIn">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
              isDarkMode 
                ? "bg-linear-to-br from-emerald-600 to-teal-600" 
                : "bg-linear-to-br from-emerald-500 to-teal-500"
            } shadow-lg animate-bounce-slow`}>
              <ShoppingCart size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <h1
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r ${
                  isDarkMode 
                    ? "from-emerald-400 to-teal-400" 
                    : "from-emerald-600 to-teal-600"
                } bg-clip-text text-transparent`}>
                Shopping Cart
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {cart.length > 0 ? "Review your items" : "Start adding products"}
              </p>
            </div>
          </div>
          {cart.length > 0 && (
            <div
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                isDarkMode 
                  ? "bg-linear-to-r from-emerald-600 to-teal-600" 
                  : "bg-linear-to-r from-emerald-500 to-teal-500"
              } text-white font-bold shadow-lg animate-pulse-slow backdrop-blur-sm`}>
              <span className="text-base sm:text-lg">{cartCount}</span>
              <span className="text-xs sm:text-sm ml-1 opacity-90">
                {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div
            className={`${
              isDarkMode 
                ? "bg-slate-800/50 backdrop-blur-xl border border-slate-700" 
                : "bg-white/80 backdrop-blur-xl border border-gray-200"
            } rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 text-center animate-fadeIn`}>
            <div
              className={`w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto mb-6 sm:mb-8 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? "bg-linear-to-br from-slate-700 to-slate-800" 
                  : "bg-linear-to-br from-gray-100 to-gray-200"
              } shadow-inner animate-float`}>
              <Package
                className={`${isDarkMode ? "text-slate-500" : "text-gray-400"} w-16 h-16 sm:w-20 sm:h-20`}
              />
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
              Your cart is empty
            </h2>
            <p
              className={`text-base sm:text-lg mb-8 sm:mb-10 px-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              Discover amazing products and start shopping now!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="group bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
              <span className="hidden sm:inline">Start Shopping</span>
              <span className="sm:hidden">Shop Now</span>
              <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={`${
                    isDarkMode 
                      ? "bg-slate-800/50 backdrop-blur-xl border border-slate-700" 
                      : "bg-white/80 backdrop-blur-xl border border-gray-200"
                  } rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-slideIn ${
                    removingItem === item.id ? "opacity-0 scale-95" : ""
                  }`}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="relative group mx-auto sm:mx-0">
                      {item.image ? (
                        <img
                          src={`${APIBase}/storage/${item.image}`}
                          alt={item.name}
                          className="w-full sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className={`w-full h-40 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl flex items-center justify-center ${
                          isDarkMode ? "bg-slate-700" : "bg-gray-200"
                        }`}>
                          <Package className="w-12 h-12 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                        </div>
                      )}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        isDarkMode ? "bg-emerald-600" : "bg-emerald-500"
                      } text-white text-xs font-bold shadow-lg`}>
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold mb-2 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}>
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Tag className={`w-4 h-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                          <p
                            className={`text-xl sm:text-2xl font-bold ${
                              isDarkMode ? "text-emerald-400" : "text-emerald-600"
                            }`}>
                            {item.price} EGP
                          </p>
                        </div>
                      </div>

                      {/* Mobile: Subtotal + Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className={`flex items-center gap-2 sm:gap-3 p-2 rounded-xl ${
                          isDarkMode ? "bg-slate-700/50" : "bg-gray-100"
                        } w-full sm:w-auto justify-center sm:justify-start`}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              isDarkMode
                                ? "bg-slate-600 hover:bg-slate-500 text-white"
                                : "bg-white hover:bg-gray-200 text-gray-700 shadow-sm"
                            } hover:scale-110 active:scale-95`}>
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span
                            className={`text-lg sm:text-xl font-bold min-w-[3ch] text-center ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              isDarkMode
                                ? "bg-slate-600 hover:bg-slate-500 text-white"
                                : "bg-white hover:bg-gray-200 text-gray-700 shadow-sm"
                            } hover:scale-110 active:scale-95`}>
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="flex-1 text-center sm:text-right">
                          <p
                            className={`text-xs uppercase tracking-wider ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            Subtotal
                          </p>
                          <p
                            className={`text-xl sm:text-2xl font-bold ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}>
                            {(item.price * item.quantity).toFixed(2)} EGP
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 mx-auto sm:mx-0 ${
                            isDarkMode
                              ? "text-red-400 hover:bg-red-900/30 hover:text-red-300"
                              : "text-red-500 hover:bg-red-50 hover:text-red-700"
                          }`}
                          aria-label="Remove item">
                          <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Sticky on desktop, normal on mobile */}
            <div className="lg:col-span-1">
              <div
                className={`${
                  isDarkMode 
                    ? "bg-slate-800/50 backdrop-blur-xl border border-slate-700" 
                    : "bg-white/80 backdrop-blur-xl border border-gray-200"
                } rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-8 animate-slideIn`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <CreditCard className={`w-6 h-6 sm:w-7 sm:h-7 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                  <h2
                    className={`text-xl sm:text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}>
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className={`flex justify-between p-3 sm:p-4 rounded-xl ${
                    isDarkMode ? "bg-slate-700/30" : "bg-gray-50"
                  }`}>
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Items ({cartCount})
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>
                      {cartTotal.toFixed(2)} EGP
                    </span>
                  </div>

                  <div className={`flex justify-between p-3 sm:p-4 rounded-xl ${
                    isDarkMode ? "bg-slate-700/30" : "bg-gray-50"
                  }`}>
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Shipping
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                      Free
                    </span>
                  </div>

                  <div
                    className={`h-px ${
                      isDarkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  />

                  <div className={`flex justify-between p-4 sm:p-5 rounded-xl ${
                    isDarkMode 
                      ? "bg-linear-to-r from-emerald-900/30 to-teal-900/30" 
                      : "bg-linear-to-r from-emerald-50 to-teal-50"
                  }`}>
                    <span
                      className={`font-bold text-lg sm:text-xl ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>
                      Total
                    </span>
                    <span
                      className={`font-bold text-xl sm:text-2xl bg-linear-to-r ${
                        isDarkMode 
                          ? "from-emerald-400 to-teal-400" 
                          : "from-emerald-600 to-teal-600"
                      } bg-clip-text text-transparent`}>
                      {cartTotal.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                <button className="group w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 mb-2 sm:mb-3 flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="hidden sm:inline">Proceed to Checkout</span>
                  <span className="sm:hidden">Checkout</span>
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className={`group w-full py-2.5 sm:py-3 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? "bg-slate-700 text-white hover:bg-slate-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } hover:scale-105`}>
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform w-4 h-4" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CartPage;