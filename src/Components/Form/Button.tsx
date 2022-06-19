import React, { ReactNode, useContext, useState } from "react";

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
  const outlineColor = disabled
    ? "bg-black2"
    : theme === "minor"
    ? "bg-black2"
    : "bright-blue-to-purple";

  const buttonColors = disabled
    ? "text-label bg-black2"
    : theme === "minor"
    ? "text-iconwhite bg-black hover:bg-black2/90"
    : "text-iconwhite bg-black hover:bg-black2/90";
  const buttonLayout = "relative block text-center rounded-md py-2 px-4 w-full";
  const classes = `transition-all duration-300 ${buttonColors} ${buttonLayout}`;

  return (
    <div className={`${outlineColor} rounded-md p-0.5`}>
      <button
        type={type}
        onClick={onClick}
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
