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

  const saveFile = async (content: string) => {
    if (!currentFile) {
      return;
    }
    try {
      await Electron.filesystem.writeFile(currentFile?.path, content);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    currentFile,
    openFile: async (path: string) => {
      setCurrentFile(undefined);
      const content = await Electron.filesystem.readFile(root + path);
      setCurrentFile({
        path: root + path,
        content,
        wordCount: content.split(" ").length,
      });
    },
    saveFile,
  };
};
