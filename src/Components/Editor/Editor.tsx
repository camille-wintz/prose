import React, { useEffect, useRef, useState } from "react";
import { Descendant, Transforms } from "slate";
import { Plate, usePlateEditorRef } from "@udecode/plate";
import { createPreviewPlugin } from "./createPreviewPlugin";
import { plugins } from "./plugins";
import { commandTypes, getTextNode, isCustomText } from "./applyType";
import { EditorElement } from "./EditorElement";
import { useEditorCommands } from "../../Hooks/useEditorCommands";
import { useQueryClient } from "react-query";
import { useCurrentFile } from "../../Hooks/useCurrentFile";

export const Editor = ({
  onChange,
  className = "",
  value,
}: {
  className?: string;
  onChange: (v: string) => void;
  value: string;
}) => {
  const { currentFile } = useCurrentFile();
  const [, setRefresh] = useState(false);
  const editor = usePlateEditorRef("CurrentFile");
  const currentValue = useRef<Descendant[]>();
  const [initialValue, setInitialValue] = useState<Descendant[]>();
  const { commands } = useEditorCommands();
  const client = useQueryClient();

  const editorPlugins = [...plugins.basicNodes, createPreviewPlugin()];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

      const lastQuote = text
        .substring(0, editor.selection.anchor.offset - 1)
        .lastIndexOf("“");
      const lastClosingQuote = text
        .substring(0, editor.selection.anchor.offset - 1)
        .lastIndexOf("”");
      editor.insertText(lastQuote > lastClosingQuote ? "”" : "“");
    }

    if (
      e.code === "Equal" &&
      text[editor.selection.anchor.offset - 1] === "-"
    ) {
      e.preventDefault();
      editor.deleteBackward("character");
      editor.insertText("—");
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

    if (selected && !isCustomText(selected)) {
      const targetNode = getTextNode(text);
      if (targetNode.type !== selected.type) {
        Transforms.setNodes(editor, targetNode);
      }
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      const blocks = value.split("\n");
      const desc: Descendant[] = blocks.map((b) => getTextNode(b));

      setInitialValue(() => desc);
      setTimeout(() => {
        const newCommands = editor.children.filter(
          (c) =>
            !isCustomText(c) &&
            c.type &&
            Object.values(commandTypes).includes(c.type)
        );

        setRefresh(true);
        client.setQueryData(
          ["getEditorCommands", currentFile?.path],
          newCommands
        );
      }, 250);
    }
  }, [value]);

  return (
    <div className={`${className}`} id="current-file-editor">
      <Plate
        id="CurrentFile"
        editor={editor}
        plugins={editorPlugins}
        initialValue={initialValue}
        onChange={(newValue) => {
          currentValue.current = newValue;
          const newCommands = editor.children.filter(
            (c) =>
              !isCustomText(c) &&
              c.type &&
              Object.values(commandTypes).includes(c.type)
          );
          if (newCommands.length !== commands?.length) {
            client.setQueryData(
              ["getEditorCommands", currentFile?.path],
              newCommands
            );
          }
        }}
        editableProps={{
          onKeyDown,
          renderElement: (e) => <EditorElement {...e} />,
        }}
      />
    </div>
  );
};
