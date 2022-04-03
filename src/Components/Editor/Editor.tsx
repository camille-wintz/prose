import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BaseEditor, createEditor, Descendant, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { unified } from "unified";
import markdown from "remark-parse";
import slate, { serialize } from "remark-slate";
import { addMarkdown } from "./Prism";
import Prism from "prismjs";
import { Leaf } from "./Leaf";
import { withHistory } from "slate-history";
import { EditorElement } from "./EditorElement";

addMarkdown();

const isCustomText = (v: CustomText | any): v is CustomText => {
  return v.text;
};

export type NodeType =
  | "Paragraph"
  | "Header"
  | "SubHeader"
  | "Note"
  | "Include";
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: { type: NodeType; children: CustomText[] };
    Text: CustomText;
  }
}

export const Editor = ({
  onChange,
  className = "",
  value,
}: {
  className?: string;
  onChange: (v: string) => void;
  value: string;
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorValue, setEditorValue] = useState<Descendant[]>();

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback(
    ({ attributes, children, element }) => (
      <EditorElement element={element} attributes={attributes}>
        {children}
      </EditorElement>
    ),
    []
  );
  const decorate = useCallback(([node, path]) => {
    const ranges: any[] = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token: any) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "'") {
      e.preventDefault();
      editor.insertText("’");
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const types = {
        "#": "Header",
        "##": "SubHeader",
        "=": "Note",
        "Include:": "Include",
      } as { [key: string]: NodeType };

      const blocks = value.split("\n");
      const desc: Descendant[] = blocks.map((b) => {
        let nodeType: NodeType = "Paragraph";
        for (let start in types) {
          if (b.trim().startsWith(start)) {
            nodeType = types[start];
          }
        }
        return { type: nodeType, children: [{ text: b }] };
      });

      setEditorValue((val) => desc);
    }
  }, [value]);

  useEffect(() => {
    if (!editorValue) {
      return;
    }
    onChange(
      editorValue
        .map((d) => (isCustomText(d) ? d.text : d.children[0].text))
        .join("\n")
    );
  }, [editorValue]);

  if (!editorValue) {
    return null;
  }

  return (
    <div className={className}>
      <Slate
        editor={editor}
        value={editorValue}
        onChange={(newValue) => {
          setEditorValue(newValue);
        }}
      >
        <Editable
          onKeyDown={(e) => onKeyDown(e)}
          decorate={decorate}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  );
};
