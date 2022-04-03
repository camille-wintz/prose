import React, { useContext, useState } from "react";

export const Input = ({
  type,
  onChange,
  value,
  className,
  label,
}: {
  type: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  label: string;
}) => {
  return (
    <>
      <div className={`flex justify-between mb-1 ${className}`}>
        <div className="input-text-label text-lg">{label}</div>
      </div>
      <input
        value={value}
        type={type}
        className="input-text w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
