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
      className={`hover:text-white font-thin text-sm transition-all flex ${className}`}
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

export const Add = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <div
    className={`flex mb-2 mt-8 text-label hover:text-white transition-all justify-center items-center ${className}`}
    onClick={onClick}
  >
    <FaPlusCircle className="mr-2 text-yellow h-8 w-8" />
  </div>
);
