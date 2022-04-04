import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Text,
  Transforms,
  Editor as SlateEditor,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { unified } from "unified";
import markdown from "remark-parse";
import slate, { serialize } from "remark-slate";
import { addMarkdown, decorateMarkdown } from "./Prism";
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

const types = {
  "#": "Header",
  "##": "SubHeader",
  "=": "Note",
  "Include:": "Include",
} as { [key: string]: NodeType };

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
  const decorate = useCallback(decorateMarkdown, []);
  const getNodeType = (block: string) => {
    let nodeType: NodeType = "Paragraph";
    for (let start in types) {
      if (block.trim().startsWith(start)) {
        nodeType = types[start];
      }
    }

    return nodeType;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "'") {
      e.preventDefault();
      editor.insertText("’");
    }

    const selection = editor.selection;
    if (selection !== null && selection.anchor !== null) {
      const selected = editor.children[selection.anchor.path[0]];
      if (isCustomText(selected)) {
        return;
      }
      const nodeType = getNodeType(selected.children[0].text);
      if (nodeType !== selected.type) {
        Transforms.setNodes(
          editor,
          { type: nodeType },
          { match: (n) => SlateEditor.isBlock(editor, n) }
        );
      }
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const blocks = value.split("\n");
      const desc: Descendant[] = blocks.map((b) => {
        const nodeType = getNodeType(b);
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
