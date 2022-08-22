import { ReactNode } from "react";
import styles from "@/components/form/button.module.scss";

export const Button = ({
  onClick,
  children,
  className,
  type = "button",
  disabled,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  to?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  return (
    <div
      className={`${className || ""} ${styles.button} ${
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
