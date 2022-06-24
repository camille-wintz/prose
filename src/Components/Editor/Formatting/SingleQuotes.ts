import * as monaco from "monaco-editor";
import { ReplaceParams } from "./ReplaceParams";

export const replaceSingleQuotes = ({ range, editor }: ReplaceParams) => {
  const previousCharacter = new monaco.Range(
    range.startLineNumber,
    range.startColumn,
    range.startLineNumber,
    range.startColumn + 1
  );

  let text = editor.getModel()?.getValueInRange(previousCharacter);

  if (!text || text.indexOf("'") === -1) {
    return;
  }

  editor.executeEdits(null, [
    {
      range: previousCharacter,
      text: "’",
    },
  ]);
};
