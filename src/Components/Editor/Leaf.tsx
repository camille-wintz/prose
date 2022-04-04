import React, { ReactNode } from "react";

export const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: ReactNode;
  leaf: any;
}) => {
  const props = {
    bold: "font-bold",
    italic: "italic",
    hr: "block h-1 bg-blue",
  } as { [leaf: string]: string };
  let className = "";

  for (let prop in leaf) {
    className += " " + props[prop];
  }

  return (
    <span {...attributes} className={className}>
      {children}
    </span>
  );
};
