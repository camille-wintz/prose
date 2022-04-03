import React, { ReactNode } from "react";

export const Title = ({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: any;
}) => {
  return (
    <h1 style={style} className={`text-white font-display ${className}`}>
      {children}
    </h1>
  );
};

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
    <h2 style={style} className={`text-label font-sans ${className}`}>
      {children}
    </h2>
  );
};

export const Divider = ({
  className = "bright-blue-to-purple",
}: {
  className?: string;
  style?: any;
}) => (
  <hr className={`border-0 h-2 w-full rounded-md mt-4 mb-4 ${className}`} />
);
