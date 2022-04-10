import {
  AutoformatRule,
  ELEMENT_CODE_BLOCK,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_HR,
  insertNodes,
  PlateEditor,
  setNodes,
} from "@udecode/plate";
import {
  AutoformatBlockRule,
  ELEMENT_CODE_LINE,
  getParent,
  isElement,
  isType,
  TEditor,
  toggleList,
  unwrapList,
} from "@udecode/plate";
import { MARK_BOLD, MARK_ITALIC } from "@udecode/plate";

export const clearBlockFormat: AutoformatBlockRule["preFormat"] = (editor) =>
  unwrapList(editor as PlateEditor);

export const format = (editor: TEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParent(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (
      isElement(node) &&
      !isType(editor as PlateEditor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor as PlateEditor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: TEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor as PlateEditor, {
      type: elementType,
    })
  );
};

export const formatText = (editor: TEditor, text: string) => {
  format(editor, () => editor.insertText(text));
};

export const autoformatRules: AutoformatRule[] = [
  {
    mode: "mark",
    type: MARK_BOLD,
    match: "**",
  },

  {
    mode: "mark",
    type: MARK_ITALIC,
    match: "*",
  },
];
