import { useApp } from "../Provider";

const CartIcon = () => {
    const { cart } = useApp();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
      <div
        style={{
          position: "absolute", 
          top: "1rem",      
          right: "1rem", 
          cursor: "pointer",
        }}
        onClick={() => alert("Cart clicked!")}
      >
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="32"
          height="32"
        >
          <path d="M7 4h10l1 9H6l1-9zm-2 2H3v2h1l1 10h12l1-10h1V6h-2L17 4H7l-2 2zM7 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {/* Badge */}
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "0.3rem 0.6rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    );
  };

  export default CartIcon
  