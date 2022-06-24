import * as monaco from "monaco-editor";
import { ReplaceParams } from "./ReplaceParams";

export const replaceSmartQuotes = ({ range, editor }: ReplaceParams) => {
  const previousCharacter = new monaco.Range(
    range.startLineNumber,
    range.startColumn,
    range.startLineNumber,
    range.startColumn + 1
  );

  let text = editor.getModel()?.getValueInRange(previousCharacter);

  if (!text || text.indexOf('"') === -1) {
    return;
  }

  let curlyQuote;
  const previousTextRange = new monaco.Range(
    range.startLineNumber,
    range.startColumn,
    0,
    0
  );

  const previousText = editor.getModel()?.getValueInRange(previousTextRange);

  if (
    !previousText ||
    previousText.lastIndexOf("“") > previousText.lastIndexOf("”")
  ) {
    curlyQuote = text.replace(/"/g, "”");
  } else {
    curlyQuote = text.replace(/"/g, "“");
  }

  editor.executeEdits(null, [
    {
      range: previousCharacter,
      text: curlyQuote,
    },
  ]);
};
