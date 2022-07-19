import { ReactNode } from "react";
import styles from "@/Components/Form/Button.module.scss";

export const Button = ({
  onClick,
  children,
  className,
  theme = "primary",
  type = "button",
  disabled,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  to?: string;
  theme?: "primary" | "minor";
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  return (
    <div
      className={`${className || ""} ${styles.button} ${styles[theme]} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <button
        type={type}
        onClick={onClick}
        className={styles.inner}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
