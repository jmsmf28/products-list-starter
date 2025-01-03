import { useState, useEffect } from "react";
import { useApp } from "../../utils/Provider";
import Dialog from "../Dialog/Dialog";
import Alert from "../Alert/Alert";
import styles from "./Cart.module.css";
import Button from "../Button/Button";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setHeaderText } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setIsClient(true); // Ensure this component only renders cart data on the client
  }, []);

  const handleOrderSubmit = () => {
    setHeaderText("Order Confirmed");
    setIsAlertVisible(true);
    setAlertMessage("Your order is confirmed!");
  };

  if (!isClient) return null; // Prevent SSR rendering

  return (
    <main className={styles.cartContainer}>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item: any) => (
            <div key={item.product.id} className={styles.cartItem}>
              <div className={styles.cartItemHeader}>
                <span style={{ fontWeight: "bold" }}>{item.product.title}</span>
                <span style={{ fontWeight: "bold" }}>
                  ${item.product.price.toFixed(2)}
                </span>
              </div>
              <div className={styles.cartItemBody}>
                <div className={styles.qtyContainer}>
                  <button
                    className={styles.qtyButton}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.qtyButton}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={styles.confirmButtonContainer}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setHeaderText("Confirm Order");
              }}
              label={"Confirm Order"}
            />
          </div>
        </div>
      )}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
      {isAlertVisible && (
        <Alert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => setIsAlertVisible(false)}
        />
      )}
    </main>
  );
};

export default Cart;
