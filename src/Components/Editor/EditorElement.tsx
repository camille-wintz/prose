import { ELEMENT_BLOCKQUOTE, ELEMENT_H1, ELEMENT_H2 } from "@udecode/plate";
import React from "react";
import { Subtitle, Title } from "../Typography";

export const EditorElement = ({ element, attributes, children }: any) => {
  switch (element.type) {
    case ELEMENT_H1:
      return <h1 {...attributes}>{children}</h1>;
    case ELEMENT_H2:
      return <h2 {...attributes}>{children}</h2>;
    case ELEMENT_BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>;
    case "signet":
      return (
        <div className="signet" {...attributes}>
          {children}
        </div>
      );
    case "scene":
      return (
        <div className="scene" {...attributes}>
          {children}
        </div>
      );
    case "end":
      return (
        <div className="end" {...attributes}>
          {children}
        </div>
      );
    case "todo":
      return (
        <div className="todo" {...attributes}>
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
