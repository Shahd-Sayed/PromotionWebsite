import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Loader from "../components/ui/Loader";
import HeroSection from "../components/ui/HeroSection";
import { Container } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import { useParams } from "react-router-dom";
import PromotionGrid from "../components/ui/PromotionGrid";

export default function ProductDetailsPage() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Container>
        <HeroSection item={product} type="product" />

        <PromotionGrid promotions={product.promotions} />
      </Container>
    </div>
  );
}
