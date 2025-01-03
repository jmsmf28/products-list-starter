import { useApp } from "../../utils/Provider";
import { AlertProps } from "../../types/types";
import styles from "./Alert.module.css";
import Button from "../Button/Button";

const Alert = ({ message, isVisible, onClose }: AlertProps) => {
  const { setHeaderText } = useApp();

  const handleOnClose = () => {
    setHeaderText("Product List");
    onClose();
  };

  if (!isVisible) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{message}</h3>
        <Button onClick={handleOnClose} label={"Close"} />
      </div>
    </div>
  );
};

export default Alert;
