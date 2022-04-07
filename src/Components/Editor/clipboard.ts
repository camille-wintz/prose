import { ELEMENT_DEFAULT } from "@udecode/plate";
import { Editor } from "slate";

export const paste = async (editor: Editor) => {
  document.execCommand("paste");
};

export const copy = async (text: string) => {
  document.execCommand("copy");
};

export const cut = async (editor: Editor, text: string) => {
  document.execCommand("cut");
};
