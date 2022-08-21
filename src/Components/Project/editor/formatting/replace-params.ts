import * as monaco from "monaco-editor";

export interface ReplaceParams {
  range: monaco.IRange;
  editor: monaco.editor.IStandaloneCodeEditor;
}
