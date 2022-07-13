import * as monaco from "monaco-editor";

export const setupProse = () => {
  monaco.editor.defineTheme("Prose", {
    base: "vs",
    inherit: true,
    rules: [
      {
        token: "title",
        foreground: "FF08F6",
        fontStyle: "bold",
      },
      {
        token: "delimiter",
        foreground: "FF08F6",
      },
      {
        token: "dialog",
        foreground: "CE00C6",
      },
      {
        token: "emphasis",
        fontStyle: "italic",
      },
    ],
    colors: {
      "editor.background": "#FAFAFA",
      "editor.foreground": "#525252",
      "editorCursor.foreground": "#FF08F6",
      "editor.lineHighlightBackground": "#F4F4F4",
      "editorLineNumber.foreground": "#FF08F6",
      "editorLineNumber.activeForeground": "#FF08F6",
      "editor.selectionBackground": "#166775",
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
        [/[—;:?!]/, "delimiter"],
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
