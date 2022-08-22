import { useProject } from "@/hooks/project";
import { ProjectFile } from "@/interfaces/project-file";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

export const CurrentFileContext = React.createContext({
  current: undefined as { path: string } | undefined,
  setCurrentFile: (file?: { path: string }) => {},
});

export const useCurrentFile = () => {
  const client = useQueryClient();
  const { root } = useProject();

  const { data: current } = useQuery<ProjectFile | undefined>(
    ["getCurrentFile", root],
    () => {
      const lastOpened = localStorage.getItem("LastOpenedFile");

      if (lastOpened && lastOpened.indexOf(root || "") !== -1) {
        return { path: lastOpened, content: undefined, saved: true };
      }

      return undefined;
    }
  );

  const { data } = useQuery<ProjectFile | undefined>(
    ["getCurrentFileContent", current?.path],
    async () => {
      if (!current?.path) {
        return undefined;
      }
      try {
        const content = await Electron.filesystem.readFile(current?.path);

        return { content, path: current?.path, saved: true };
      } catch (e) {
        return { content: "", path: current?.path, saved: true };
      }
    }
  );

  const saveFile = async (content: string) => {
    if (!current) {
      return;
    }
    try {
      await Electron.filesystem.writeFile(current?.path, content);
      client.setQueryData<ProjectFile[] | undefined>(
        ["getChapters", root],
        (chapters) =>
          chapters?.map((c) =>
            root + "/chapters/" + c.path === current?.path
              ? { ...c, saved: true }
              : c
          )
      );

      client.setQueryData<ProjectFile[] | undefined>(
        ["getProjectFiles", root],
        (files) =>
          files?.map((f) =>
            root + "/" + f.path === current?.path ? { ...f, saved: true } : f
          )
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    current: data,
    applyChanges: (content: string) => {
      client.setQueryData<{ path?: string; content: string }>(
        ["getCurrentFileContent", current?.path],
        (current) => ({
          ...current,
          content,
        })
      );

      client.setQueryData<ProjectFile[] | undefined>(
        ["getChapters", root],
        (chapters) =>
          chapters?.map((c) =>
            root + "/chapters/" + c.path === current?.path
              ? { ...c, content, saved: false }
              : c
          )
      );

      client.setQueryData<ProjectFile[] | undefined>(
        ["getProjectFiles", root],
        (files) =>
          files?.map((f) =>
            root + "/" + f.path === current?.path ? { ...f, saved: false } : f
          )
      );
    },
    openFile: async (path: string) => {
      client.setQueryData(["getCurrentFile", root], undefined);
      setTimeout(() => {
        client.setQueryData(["getCurrentFile", root], {
          path: root + path,
        });

        localStorage.setItem("LastOpenedFile", root + path);
      }, 10);
    },
    saveFile,
  };
};
