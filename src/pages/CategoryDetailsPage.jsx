import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Loader from "../components/ui/Loader";
import HeroSection from "../components/ui/HeroSection";
import ProductGrid from "../components/ui/ProductGrid";
import { Container } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import { useParams } from "react-router-dom"; 

export default function CategoryDetailsPage() {
  const { isDarkMode } = useTheme();
  const { id } = useParams(); 
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/categories/${id}`); 
        setCategory(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className={`text-center py-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {error}
      </div>
    );
  if (!category) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Container>
        <HeroSection item={category} type="category" />
        <ProductGrid products={category.products} />
      </Container>
    </div>
  );
}
