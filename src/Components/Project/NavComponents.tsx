import React, { ReactNode } from "react";
import { FaPlusCircle } from "react-icons/fa";

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
    <button
      onClick={onClick}
      className={`text-grey-4 font-thin text-sm transition-all flex items-center ${className}`}
    >
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
