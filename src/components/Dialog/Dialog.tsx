import { useState } from "react";
import {
  validateEmail,
  validateAddress,
  validateName,
} from "../../utils/validation";
import { useApp } from "../../utils/Provider";
import { DialogProps } from "../../types/types";
import styles from "./Dialogue.module.css"
import Button from "../Button/Button";

const Dialog = ({ isOpen, onClose, onSubmit }: DialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    address?: string;
  }>({});
  const { setHeaderText } = useApp();

  const validateField = (field: keyof typeof formData, value: string) => {
    switch (field) {
      case "name":
        return !value
          ? "Name is required"
          : validateName(value)
            ? ""
            : "Name is too short";
      case "email":
        return !value
          ? "Email is required"
          : validateEmail(value)
            ? ""
            : "Invalid email format";
      case "address":
        return !value
          ? "Address is required"
          : validateAddress(value)
            ? ""
            : "Invalid address";
      default:
        return "";
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    };

  const handleSubmit = () => {
    const newErrors = Object.entries(formData).reduce(
      (acc, [field, value]) => ({
        ...acc,
        [field]: validateField(field as keyof typeof formData, value),
      }),
      {} as typeof errors
    );

    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err) && onSubmit) {
      onSubmit(formData);
      setFormData({ name: "", email: "", address: "" });
      onClose();
      setHeaderText("Order Confirmed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Confirm your order</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <span style={{ color: "#3f2b96", fontWeight: "bold" }}>X</span>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {["name", "email", "address"].map((field) => (
            <>
              {field !== "address" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange(field as keyof typeof formData)}
                  onBlur={() => handleBlur(field as keyof typeof formData)}
                />
              ) : (
                <textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange("address")}
                  onBlur={() => handleBlur("address")}
                />
              )}
              {errors[field as keyof typeof errors] && (
                <p className={styles.errorText}>
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </>
          ))}
          <Button onClick={handleSubmit} label={"Submit Order"} />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
