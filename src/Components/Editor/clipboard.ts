import { ELEMENT_DEFAULT } from "@udecode/plate";
import { Editor } from "slate";

export const paste = async (editor: Editor) => {
  const clip = await Neutralino.clipboard.readText();
  const paragraphs = clip.split("\n");
  for (let para in paragraphs) {
    editor.insertNode({ type: ELEMENT_DEFAULT, children: [{ text: para }] });
  }
};

export const copy = async (text: string) => {
  await Neutralino.clipboard.writeText(text);
};

export const cut = async (editor: Editor, text: string) => {
  const clip = await Neutralino.clipboard.writeText(text);
  editor.deleteFragment();
};
