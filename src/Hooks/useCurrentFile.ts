import React, { useContext } from "react";
import { useProject } from "./useProject";

export const CurrentFileContext = React.createContext({
  currentFile: undefined as
    | { path: string; content: string; wordCount: number }
    | undefined,
  setCurrentFile: (file?: {
    path: string;
    content: string;
    wordCount: number;
  }) => {},
});

export const useCurrentFile = () => {
  const { root } = useProject();
  const { currentFile, setCurrentFile } = useContext(CurrentFileContext);

  return {
    currentFile,
    openFile: async (path: string) => {
      setCurrentFile(undefined);
      const content = await Neutralino.filesystem.readFile(root + path);
      setCurrentFile({
        path: root + path,
        content,
        wordCount: content.split(" ").length,
      });
    },
    saveFile: async (content: string) => {
      if (!currentFile) {
        return;
      }
      try {
        await Neutralino.filesystem.writeFile(currentFile?.path, content);
      } catch (e) {
        console.log(e);
      }
    },
  };
};
