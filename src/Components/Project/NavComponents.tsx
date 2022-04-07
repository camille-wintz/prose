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
      className={`hover:text-white transition-all flex ${className}`}
    >
      {children}
    </button>
  );
};

export const NavHeader = ({
  children,
  className = "mt-5",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h3 className={`text-white font-bold text-lg mb-2 ${className}`}>
    {children}
  </h3>
);

export const Add = ({
  children,
  onClick,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex mb-2 text-label hover:text-white transition-all navLine ${className}`}
    onClick={onClick}
  >
    <FaPlusCircle className="mr-2" />
    <button>{children}</button>
  </div>
);
