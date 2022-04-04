import React, { useEffect, useMemo, useRef, useState } from "react";
import { createEditor, Descendant, Transforms } from "slate";
import {
  ELEMENT_DEFAULT,
  Plate,
  createPlateEditor,
  usePlateEditorRef,
} from "@udecode/plate";
import { withReact } from "slate-react";
import { createPreviewPlugin } from "./createPreviewPlugin";
import { plugins } from "./plugins";
import { getTextNode } from "./applyType";
import { paste, copy, cut } from "./clipboard";

const isCustomText = (v: CustomText | any): v is CustomText => {
  return v.text;
};

type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Element: { type?: string; children: CustomText[] };
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
  const [refresh, setRefresh] = useState(false);
  const editor = usePlateEditorRef("CurrentFile");
  const currentValue = useRef<Descendant[]>();
  const [initialValue, setInitialValue] = useState<Descendant[]>();

  const editorPlugins = [...plugins.basicNodes, createPreviewPlugin()];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();

    if (e.key === "'") {
      e.preventDefault();
      editor.insertText("’");
      return;
    }

    if (!editor.selection) {
      return;
    }

    const selected = editor.children[editor.selection.anchor.path[0]];
    const text = isCustomText(selected)
      ? selected.text
      : selected.children[0].text;

    if (e.key === '"') {
      e.preventDefault();

      const lastQuote = text.lastIndexOf("“");
      const lastClosingQuote = text.lastIndexOf("”");
      editor.insertText(lastQuote > lastClosingQuote ? "”" : "“");
    }
    if (e.code === "KeyV" && (e.ctrlKey || e.metaKey)) {
      paste(editor);
      return;
    }
    if (e.code === "KeyC" && (e.ctrlKey || e.metaKey) && selection) {
      copy(selection.toString());
      return;
    }
    if (e.code === "KeyX" && (e.ctrlKey || e.metaKey) && selection) {
      cut(editor, selection.toString());
      return;
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
      return;
    }

    console.log(selected);
    if (selected && !isCustomText(selected)) {
      const targetNode = getTextNode(text);
      console.log(targetNode);
      if (targetNode.type !== selected.type) {
        Transforms.setNodes(editor, targetNode);
      }
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const blocks = value.split("\n");
      const desc: Descendant[] = blocks.map((b) => getTextNode(b));

      setInitialValue((val) => desc);
      setTimeout(() => setRefresh(true), 500);
    }
  }, [value]);

  return (
    <div className={className}>
      <Plate
        id="CurrentFile"
        editor={editor}
        plugins={editorPlugins}
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
