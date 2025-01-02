import { Product } from "../../types/types";
import { useApp } from "../Provider";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useApp();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        background: "white",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "4px",
        }}
      />
      <h3>{product.title}</h3>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <p>${product.price.toFixed(2)}</p>
      <button
        className="gradient-button"
        onClick={() => addToCart(product)}
        style={{ marginTop: "1rem" }}
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
