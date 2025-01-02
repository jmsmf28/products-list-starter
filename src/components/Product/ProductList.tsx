import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api";
import ProductCard from "./ProductCard";
import { Product } from "../../types/types";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products); 
      } catch (err) {
        setError("Failed to load products. Please try again.");
      }
    };

    loadProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

