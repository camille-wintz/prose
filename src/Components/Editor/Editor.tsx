import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useEditorCommands } from "../../Hooks/useEditorCommands";
import { useQueryClient } from "react-query";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import Worker from "monaco-editor/esm/vs/editor/editor.worker?worker";

//@ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    return new Worker();
  },
};

monaco.editor.defineTheme("Prose", {
  base: "vs",
  inherit: true,
  rules: [{ background: "#2b274d", token: "#2b274d" }],
  colors: {
    "editor.foreground": "#e49321",
    "editor.background": "#261b4a",
    "editorCursor.foreground": "#8B0000",
    "editor.lineHighlightBackground": "#0000FF20",
    "editorLineNumber.foreground": "#a70bc6",
    "editor.selectionBackground": "#88000030",
    "editor.inactiveSelectionBackground": "#88000015",
  },
});
monaco.editor.setTheme("Prose");

export const Editor = ({
  onChange,
  className = "",
  value,
}: {
  className?: string;
  onChange: (v: string) => void;
  value: string;
}) => {
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const { currentFile } = useCurrentFile();

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.code === "KeyS" && (e.ctrlKey || e.metaKey)) {
      onChange(
        editor.current
          ?.getValue({ preserveBOM: false, lineEnding: "" })
          ?.replaceAll("\n\n", "\n") || ""
      );
      return;
    }
  };

  return (
    <div
      className={`${className} w-[680px] h-screen`}
      id="current-file-editor"
      onKeyDown={(e) => handleKey(e)}
      ref={(r) => {
        if (r && r.childNodes.length === 0) {
          editor.current = monaco.editor.create(r, {
            readOnly: false,
            value: currentFile?.content.replace(/\n/g, "\n\n"),
            fontSize: 16,
            lineHeight: 26,
            language: "markdown",
            wordWrap: "on",
            wordBasedSuggestions: false,
            "semanticHighlighting.enabled": false,
            occurrencesHighlight: false,
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", useShadows: false },
          });
        }
      }}
    ></div>
  );
};
