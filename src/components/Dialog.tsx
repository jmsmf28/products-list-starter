import { useState } from "react";
import {
  validateEmail,
  validateAddress,
  validateName,
} from "../utils/validation";
import { useApp } from "./Provider";
import { DialogProps } from "../types/types";

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

  const validateField = (field: string, value: string) => {
    let error;
    switch (field) {
      case "name":
        if (!value) error = "Name is required";
        else if (!validateName(value))
          error = "Name should be at least 5 characters long";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!validateEmail(value)) error = "Invalid email format";
        break;
      case "address":
        if (!value) error = "Address is required";
        else if (!validateAddress(value))
          error = "Address should be at least 5 characters long";
        break;
      default:
        break;
    }
    return error;
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
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = () => {
    const validationErrors: typeof errors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) validationErrors[field as keyof typeof errors] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && onSubmit) {
      onSubmit(formData);
      setFormData({ name: "", email: "", address: "" });
      onClose();
      setHeaderText("Order Confirmed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Confirm your order</h3>
          <button onClick={onClose} className="close-button">
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
                <p
                  className="error-text"
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: field !== "address" ? "-0.9rem" : "0.1rem",
                  }}
                >
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </>
          ))}
          <div>
            <button
              className="gradient-button"
              onClick={handleSubmit}
              style={{ marginTop: "1rem" }}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
