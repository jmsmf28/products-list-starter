import { useState, useEffect } from "react";
import { useApp } from "../Provider";
import Dialog from "../Dialog";
import Alert from "../Alert";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    setHeaderText,
  } = useApp();
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
    <main>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item: any) => (
            <div
              key={item.product.id}
              className="cart-item"
              style={{ marginBottom: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{item.product.title}</span>
                <span style={{ fontWeight: "bold" }}>
                  ${item.product.price.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    className="qty-button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="gradient-button"
              onClick={() => {
                setIsModalOpen(true);
                setHeaderText("Confirm Order");
              }}
              style={{ marginTop: "1rem" }}
            >
              Confirm Order
            </button>
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
