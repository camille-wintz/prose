import React, { InputHTMLAttributes, useContext, useState } from "react";

export const Input = ({
  onTextChange,
  value,
  className,
  label,
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
        <div className="text-content-2 text-md">{label}</div>
      </div>
      <input
        {...rest}
        value={value}
        className="input-text w-full"
        onChange={(e) => onTextChange(e.target.value)}
      />
    </>
  );
};
