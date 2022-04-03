import React from "react";
import { Subtitle, Title } from "../Typography";
import { NodeType } from "./Editor";

export const EditorElement = ({ element, attributes, children }: any) => {
  switch (element.type as NodeType) {
    case "Header":
      return (
        <Title className="text-4xl" {...attributes}>
          {children}
        </Title>
      );
    case "SubHeader":
      return (
        <Subtitle className="text-3xl" {...attributes}>
          {children}
        </Subtitle>
      );
    case "Note":
      return (
        <blockquote className="text-label font-sans" {...attributes}>
          {children}
        </blockquote>
      );
    default:
      return (
        <p className="text-xl" {...attributes}>
          {children}
        </p>
      );
  }
};
