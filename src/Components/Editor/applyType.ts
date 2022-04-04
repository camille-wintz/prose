import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_HR,
} from "@udecode/plate";

const types = {
  "#": ELEMENT_H1,
  "##": ELEMENT_H2,
  "=": ELEMENT_BLOCKQUOTE,
  "---": ELEMENT_HR,
} as { [key: string]: string };

export const getTextNode = (b: string) => {
  const nodeType = getNodeType(b);
  return { type: nodeType, children: [{ text: b }] };
};
export const getNodeType = (block: string) => {
  let nodeType: string = ELEMENT_DEFAULT;
  for (let start in types) {
    if (block.trim().startsWith(start)) {
      nodeType = types[start];
    }
  }

  return nodeType;
};
