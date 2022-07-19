import React, { ReactNode } from "react";

export const Subtitle = ({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: any;
}) => {
  return (
    <h2
      style={style}
      className={`content-3 font-semibold font-sans ${className}`}
    >
      {children}
    </h2>
  );
};

export const ListDot = () => (
  <div className="h-2 w-2 bg-pink rounded-full mr-2 inline-block align-middle" />
);

export const Li = ({ children }: { children: React.ReactNode }) => (
  <li>
    <ListDot />
    {children}
  </li>
);
