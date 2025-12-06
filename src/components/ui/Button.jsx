import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

function Button({ link, name }) {
  const { isDarkMode } = useTheme();

  return (
    <Link
      to={link}
      className={`${
        isDarkMode
          ? "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          : "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
      } text-white text-decoration-none inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      {name}
      <ArrowRight size={20} />
    </Link>
  );
}

export default Button;
