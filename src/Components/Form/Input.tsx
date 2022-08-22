import React, { InputHTMLAttributes, useContext, useState } from "react";

export const Input = ({
  onTextChange,
  value,
  className,
  label,
  type = "text",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onTextChange: (val: string) => void;
  className?: string;
  label: string;
}) => {
  return (
    <>
      <div className={`flex justify-between mb-1 ${className}`}>
        <div className="text-content-2 text-sm font-bold">{label}</div>
      </div>
      <input
        {...rest}
        type={type}
        value={value}
        className="border-2 border-solid rounded-full text-pink w-full"
        onChange={(e) => onTextChange(e.target.value)}
      />
    </>
  );
};
