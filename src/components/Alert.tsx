import { useApp } from "./Provider";
import { AlertProps } from "../types/types";

const Alert = ({ message, isVisible, onClose }: AlertProps) => {
  const { setHeaderText } = useApp();

  const handleOnClose = () => {
    setHeaderText("Product List");
    onClose();
  };

  if (!isVisible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <button
          onClick={handleOnClose}
          className="gradient-button"
          style={{ marginTop: "1rem" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
