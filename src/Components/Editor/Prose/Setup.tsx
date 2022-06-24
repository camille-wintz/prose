import * as monaco from "monaco-editor";

export const setupProse = () => {
  monaco.editor.defineTheme("Prose", {
    base: "vs",
    inherit: true,
    rules: [
      {
        token: "title",
        foreground: "73daca",
        fontStyle: "bold",
      },
      {
        token: "delimiter",
        foreground: "e0af68",
      },
      {
        token: "dialog",
        foreground: "2ac3de",
      },
      {
        token: "emphasis",
        foreground: "a9b1d6",
        fontStyle: "italic",
      },
    ],
    colors: {
      "editor.foreground": "#a9b1d6",
      "editor.background": "#24283b",
      "editorCursor.foreground": "#f7768e",
      "editor.lineHighlightBackground": "#1a1b26",
      "editorLineNumber.foreground": "#f7768e",
      "editorLineNumber.activeForeground": "#f7768e",
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
        [/[;:?!]/, "delimiter"],
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
