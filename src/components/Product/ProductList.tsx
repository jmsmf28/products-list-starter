import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api";
import ProductCard from "./ProductCard";
import { Product } from "../../types/types";
import styles from "./ProductList.module.css"; // Import the CSS Module

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
    return <p className={styles.errorMessage}>{error}</p>;
  }

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
