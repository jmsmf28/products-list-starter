import Image from "next/image";
import { Product } from "../../types/types";
import { useApp } from "../../utils/Provider";
import styles from "./ProductCard.module.css";
import Button from "../Button/Button";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useApp();

  return (
    <div className={styles.productCard}>
      <Image
        src={product.thumbnail || "/placeholder.png"}
        alt={product.title || "Product Image"}
        width={200}
        height={200}
        className={styles.productThumbnail}
        placeholder="blur"
        blurDataURL="/placeholder.png"
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>
          ${product.price?.toFixed(2) || "N/A"}
        </p>
      </div>
      <Button onClick={() => addToCart(product)} label={"Add to Cart"} />
    </div>
  );
};

export default ProductCard;
