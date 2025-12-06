import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CardComponent({
  item,
  Icon,
  gradient,
  isDarkMode,
  linkTo,
  description,
  children,
}) {
  return (
    <Link
      to={linkTo}
      className={`${
        isDarkMode
          ? "bg-slate-900 border-slate-800 hover:border-emerald-500"
          : "bg-linear-to-br from-white to-gray-50 border-gray-200 hover:border-emerald-500"
      }  text-decoration-none border-2 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden`}>
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      <h3
        className={`relative text-xl font-bold my-3 ${
          isDarkMode ? "text-white" : "text-black"
        } group-hover:text-emerald-600 transition-colors`}>
        {item.name}
      </h3>
      {children}

      <p
        className={`relative text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } mb-4`}>
        {description || `Explore ${item.name.toLowerCase()} products`}
      </p>

      <div className="relative flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
        <span>View More</span>
        <ArrowRight
          size={16}
          className="transform group-hover:translate-x-1 transition-transform"
        />
      </div>

      <div
        className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${gradient} opacity-10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300`}></div>
    </Link>
  );
}
