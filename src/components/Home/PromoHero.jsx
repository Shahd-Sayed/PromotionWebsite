import { Container } from "react-bootstrap";
import { useTheme } from "../../contexts/ThemeContext";
import { Gift, Sparkles, TrendingUp } from "lucide-react";
import Button from '../ui/Button';

function PromoHero({ setCurrentPage }) {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${
        isDarkMode ? "bg-slate-800" : "bg-white"
      } transition-colors duration-300 relative overflow-hidden py-4`}>
    
      
      <div
        className={`md:p-12 relative z-10
         ${isDarkMode ? "bg-slate-800" : "bg-white"}
          `}>
        <Container>
          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              ${
                isDarkMode
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
              }
            `}>
              <Sparkles size={16} />
              Hot Deals
            </span>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              ${
                isDarkMode
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              }
            `}>
              <TrendingUp size={16} />
              Trending Now
            </span>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              ${
                isDarkMode
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                  : "bg-purple-100 text-purple-700 border border-purple-200"
              }
            `}>
              <Gift size={16} />
              Limited Time
            </span>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}>
            {isDarkMode
              ? "Limited-Time Deals Just for You"
              : "Exclusive Offers for a Limited Time!"}
          </h1>

          <p
            className={`text-xl mb-6
              ${isDarkMode ? "text-gray-300" : "text-gray-600"}
            `}>
            Save up to 50% on selected products
          </p>

          <Button
            onClick={() => setCurrentPage("promotions")}
            name={"Discover Offers Now"} 
            link={"/products"}
          />
        </Container>
      </div>
    </section>
  );
}

export default PromoHero;