import { useEffect, useState } from "react";
import { LayoutDashboard, PackageSearch } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Container } from "react-bootstrap";
import axiosClient from "../../api/axiosClient";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

export default function HeroSection() {
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((res) => {
        setCategories(res.data.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const icons = [PackageSearch, LayoutDashboard];

  return (
    <section
      className={`${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      } transition-colors duration-300`}>
      <Container>
        <div className="max-w-7xl mx-auto py-5 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1
                className={`text-5xl lg:text-6xl font-bold leading-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                Welcome to Our Store
                <span className="block text-emerald-600">
                  Find Everything You Need
                </span>
              </h1>

              <p
                className={`text-lg lg:text-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } leading-relaxed`}>
                Explore our wide range of products and enjoy the best shopping
                experience.
              </p>

              <div className="flex flex-wrap gap-4">
               <Button name={"Shop Now"}  link={"/products"}/>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {loading ? (
                  <Loader />
                ) : (
                  categories.slice(0, 4).map((category, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                      <div
                        key={category.id}
                        className={`${
                          isDarkMode ? "bg-slate-700" : "bg-white"
                        } p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform ${
                          index % 2 !== 0 ? "mt-8" : ""
                        }`}>
                        <div
                          className={`${
                            isDarkMode ? "bg-slate-600" : "bg-emerald-100"
                          } w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                          <Icon
                            className={`${
                              isDarkMode ? "text-white" : "text-emerald-600"
                            }`}
                            size={32}
                          />
                        </div>
                        <h3
                          className={`text-xl font-bold mb-2 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {category.name}
                        </h3>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
