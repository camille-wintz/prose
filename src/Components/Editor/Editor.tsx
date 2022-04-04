import React, { useCallback, useEffect, useRef, useState } from "react";
import { BaseEditor, Descendant } from "slate";
import {
  createDeserializeMdPlugin,
  createHorizontalRulePlugin,
  createSelectOnBackspacePlugin,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_HR,
  Plate,
  usePlateEditorRef,
} from "@udecode/plate";
import { ReactEditor } from "slate-react";
import { EditorElement } from "./EditorElement";
import { createPreviewPlugin } from "./createPreviewPlugin";
import { plugins } from "./plugins";

const isCustomText = (v: CustomText | any): v is CustomText => {
  return v.text;
};

type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: { type?: string; children: CustomText[] };
    Text: CustomText;
  }
}

const types = {
  "#": ELEMENT_H1,
  "##": ELEMENT_H2,
  "=": ELEMENT_BLOCKQUOTE,
} as { [key: string]: string };

export const Editor = ({
  onChange,
  className = "",
  value,
}: {
  className?: string;
  onChange: (v: string) => void;
  value: string;
}) => {
  const editor = usePlateEditorRef();
  const currentValue = useRef<Descendant[]>();
  const [initialValue, setInitialValue] = useState<Descendant[]>();

  const editorPlugins = [
    ...plugins.basicNodes,
    createHorizontalRulePlugin(),
    createSelectOnBackspacePlugin({
      options: { query: { allow: [ELEMENT_HR] } },
    }),
    createPreviewPlugin(),
    createDeserializeMdPlugin(),
  ];

  const getNodeType = (block: string) => {
    let nodeType: string = ELEMENT_DEFAULT;
    for (let start in types) {
      if (block.trim().startsWith(start)) {
        nodeType = types[start];
      }
    }

    return nodeType;
  };

  const paste = async () => {
    const clip = await Neutralino.clipboard.readText();
    const paragraphs = clip.split("\n");
    for (let para in paragraphs) {
      editor.insertNode({ type: ELEMENT_DEFAULT, children: [{ text: para }] });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "'") {
      e.preventDefault();
      editor.insertText("’");
      return;
    }
    if (e.key === '"') {
      e.preventDefault();
      if (!editor.selection) {
        return;
      }
      const selected = editor.children[editor.selection.anchor.path[0]];

      const lastQuote = selected.children[0].text.lastIndexOf("“");
      const lastClosingQuote = selected.children[0].text.lastIndexOf("”");
      editor.insertText(lastQuote > lastClosingQuote ? "”" : "“");
    }
    if (e.code === "KeyV" && (e.ctrlKey || e.metaKey)) {
      paste();
    }
    if (e.code === "KeyC" && (e.ctrlKey || e.metaKey)) {
      paste();
    }
    if (e.code === "KeyX" && (e.ctrlKey || e.metaKey)) {
      paste();
    }
    if (e.code === "KeyS" && (e.ctrlKey || e.metaKey)) {
      if (!currentValue.current) {
        return;
      }
      onChange(
        currentValue.current
          .map((d) => (isCustomText(d) ? d.text : d.children[0].text))
          .join("\n")
      );
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const blocks = value.split("\n");
      const desc: Descendant[] = blocks.map((b) => {
        const nodeType = getNodeType(b);
        return { type: nodeType, children: [{ text: b }] };
      });

      setInitialValue((val) => desc);
    }
  }, [value]);

  return (
    <div className={className}>
      <Plate
        plugins={editorPlugins}
        editor={editor}
        initialValue={initialValue}
        onChange={(newValue) => {
          currentValue.current = newValue;
        }}
        editableProps={{
          onKeyDown,
        }}
      />
    </div>
  );
};
