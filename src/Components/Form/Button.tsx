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
    ? "bg-dark2"
    : theme === "minor"
    ? "bg-dark2"
    : "bright-blue-to-purple";

  const buttonColors = disabled
    ? "text-label bg-dark1"
    : theme === "minor"
    ? "text-iconwhite bg-dark2 hover:bg-dark1/90"
    : "text-iconwhite bg-dark1 hover:bg-dark1/90";
  const buttonLayout = "relative block text-center rounded-md py-2 px-4 w-full";
  const classes = `font-display transition-all duration-300 ${buttonColors} ${buttonLayout}`;

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
