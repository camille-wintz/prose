import { useRef } from "react";
import * as monaco from "monaco-editor";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import Worker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import * as formatters from "./Formatting";
import { setupProse } from "./Prose/Setup";

//@ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    return new Worker();
  },
};

setupProse();

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
  const { currentFile, applyChanges } = useCurrentFile();

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
      className={`${className} w-[680px] h-full`}
      id="current-file-editor"
      onKeyDown={(e) => handleKey(e)}
      ref={(r) => {
        if (r && r.childNodes.length === 0) {
          editor.current = monaco.editor.create(r, {
            readOnly: false,
            value: currentFile?.content
              .replace(/\n/g, "\n\n")
              .replace(/@(.*)\n\n@/g, "@$1\n@"),
            fontSize: 16,
            lineHeight: 26,
            language: "prose",
            wordWrap: "on",
            wordBasedSuggestions: false,
            occurrencesHighlight: false,
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", useShadows: false },
            lineNumbers: "off",
            padding: {
              top: 120,
            },
          });

          editor.current.getModel()?.onDidChangeContent((e) => {
            for (let prop in formatters) {
              (formatters as any)[prop]({
                range: e.changes[0].range,
                editor: editor.current as monaco.editor.IStandaloneCodeEditor,
              });
            }

            applyChanges(
              editor.current
                ?.getValue({ preserveBOM: false, lineEnding: "" })
                ?.replaceAll("\n\n", "\n") || ""
            );
          });
        }
      }}
    ></div>
  );
};
