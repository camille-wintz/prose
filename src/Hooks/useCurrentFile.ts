import React, { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Chapter } from "./useChapters";
import { useProject } from "./useProject";

export const CurrentFileContext = React.createContext({
  currentFile: undefined as { path: string } | undefined,
  setCurrentFile: (file?: { path: string }) => {},
});

export const useCurrentFile = () => {
  const client = useQueryClient();
  const { root } = useProject();

  const { data: currentFile } = useQuery("getCurrentFile", () => {
    const lastOpened = localStorage.getItem("LastOpenedFile");

    if (lastOpened && lastOpened.indexOf(root || "") !== -1) {
      return { path: lastOpened };
    }

    return undefined;
  });

  const { data } = useQuery(
    ["getCurrentFileContent", currentFile?.path],
    async () => {
      if (!currentFile?.path) {
        return undefined;
      }
      try {
        const content = await Electron.filesystem.readFile(currentFile?.path);

        return { content, path: currentFile?.path };
      } catch (e) {
        return { content: "", path: currentFile?.path };
      }
    }
  );

  const saveFile = async (content: string) => {
    if (!currentFile) {
      return;
    }
    try {
      await Electron.filesystem.writeFile(currentFile?.path, content);
      client.setQueryData<Chapter[] | undefined>(
        ["getChapters", root],
        (chapters) =>
          chapters?.map((c) =>
            root + "/chapters/" + c.path === currentFile?.path
              ? { ...c, saved: true }
              : c
          )
      );

      client.setQueryData<Chapter[] | undefined>(
        ["getProjectFiles", root],
        (files) =>
          files?.map((f) =>
            root + "/" + f.path === currentFile?.path
              ? { ...f, saved: true }
              : f
          )
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    currentFile: data,
    applyChanges: (content: string) => {
      client.setQueryData<{ path?: string; content: string }>(
        ["getCurrentFileContent", currentFile?.path],
        (currentFile) => ({
          ...currentFile,
          content,
        })
      );

      client.setQueryData<Chapter[] | undefined>(
        ["getChapters", root],
        (chapters) =>
          chapters?.map((c) =>
            root + "/chapters/" + c.path === currentFile?.path
              ? { ...c, content, saved: false }
              : c
          )
      );

      client.setQueryData<Chapter[] | undefined>(
        ["getProjectFiles", root],
        (files) =>
          files?.map((f) =>
            root + "/" + f.path === currentFile?.path
              ? { ...f, saved: false }
              : f
          )
      );
    },
    openFile: async (path: string) => {
      client.setQueryData("getCurrentFile", undefined);
      setTimeout(() => {
        client.setQueryData("getCurrentFile", {
          path: root + path,
        });

        localStorage.setItem("LastOpenedFile", root + path);
      }, 10);
    },
    saveFile,
  };
};
