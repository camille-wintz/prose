import React, { ReactNode } from "react";
import styles from "./Nav.module.scss";

export const NavLink = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button onClick={onClick} className={`${styles.link} ${className}`}>
      {children}
    </button>
  );
};

export const NavHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h3 className={`text-white font-bold text-lg ${className}`}>{children}</h3>
);
