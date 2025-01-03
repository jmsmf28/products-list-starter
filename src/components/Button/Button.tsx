import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;  
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button className={styles.gradientButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
