import * as monaco from "monaco-editor";

export const setupProse = () => {
  monaco.editor.defineTheme("Prose", {
    base: "vs",
    inherit: true,
    rules: [
      {
        token: "title",
        foreground: "ff48b3",
        fontStyle: "bold",
      },
      {
        token: "annotation",
        foreground: "09a1ed",
      },
      {
        token: "delimiter",
        foreground: "FF08F6",
      },
      {
        token: "dialog",
        foreground: "09a1ed",
      },
      {
        token: "emphasis",
        fontStyle: "italic",
      },
    ],
    colors: {
      "editor.background": "#FAF8F2",
      "editor.foreground": "#525252",
      "editorCursor.foreground": "#FF08F6",
      "editor.lineHighlightBackground": "#F4F4F4",
      "editorLineNumber.foreground": "#FF08F6",
      "editorLineNumber.activeForeground": "#FF08F6",
      "editor.selectionBackground": "#e8edb8",
      "editor.inactiveSelectionBackground": "#166775",
    },
  });

  monaco.editor.setTheme("Prose");
  monaco.languages.register({ id: "prose", extensions: [".md"] });

  monaco.languages.setMonarchTokensProvider("prose", {
    escapes: /\\(?:@control)/,
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    tokenizer: {
      root: [
        // headers (with #)
        [
          /^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/,
          ["white", "title", "title", "title"],
        ],
        // markup within lines
        { include: "@linecontent" },
        { include: "@annotations" },
        [/[—;:?!]/, "delimiter"],
      ],
      annotations: [
        [/^(\s{0,3})(@+)((?:[^\\@]|@escapes)+)((?:@+)?)/, "annotation"],
      ],
      linecontent: [
        // various markup
        [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, "strong"],
        [/\*([^\\*]|@escapes)+\*/, "emphasis"],
        [/“([^”]|@escapes)+”/, "dialog"],
        [/`([^\\`]|@escapes)+`/, "variable"],
      ],
      comment: [
        [/[^<\-]+/, "comment.content"],
        [/-->/, "comment", "@pop"],
        [/<!--/, "comment.content.invalid"],
        [/[<\-]/, "comment.content"],
      ],
    },
  });
};
