import { useApp } from "../../utils/Provider";
import styles from "./CartIcon.module.css"; 

const CartIcon = () => {
  const { cart } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={styles.cartIconContainer}
      onClick={() => alert("Cart clicked!")}
    >
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="32"
        height="32"
      >
        <path d="M7 4h10l1 9H6l1-9zm-2 2H3v2h1l1 10h12l1-10h1V6h-2L17 4H7l-2 2zM7 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    
      {totalItems > 0 && (
        <span className={styles.badge}>{totalItems}</span>
      )}
    </div>
  );
};

export default CartIcon;
