import { CurrentFileContext } from "@/Hooks/useCurrentFile";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useProject } from "./useProject";

export interface Chapter {
  path: string;
  content: string;
  saved: boolean;
}

export const useChapters = () => {
  const { currentFile, setCurrentFile } = useContext(CurrentFileContext);
  const { root, main, saveMain } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<Chapter[]>(
    ["getChapters", root],
    async () => {
      if (!main) {
        return [];
      }

      try {
        const chapterFiles = await Electron.filesystem.readDirectory(
          root + "/chapters"
        );
        const missingChapters = chapterFiles.filter(
          (f) => !main.chapters?.some((c) => c === f)
        );

        if (missingChapters.length > 0) {
          saveMain({
            ...main,
            chapters: [...(main.chapters || []), ...missingChapters],
          });
        }

        const chapters = [...(main.chapters || []), ...missingChapters];
        const result = [];
        for (let chapter of chapters) {
          const content = await Electron.filesystem.readFile(
            root + "/chapters/" + chapter
          );
          result.push({
            path: chapter,
            content,
            saved: true,
          });
        }

        return result;
      } catch (e: any) {
        Electron.filesystem.createDirectory(root + "/chapters");

        return [];
      }
    }
  );

  const addChapter = async (title: string) => {
    root + "/chapters/" + title + ".md";
    await Electron.filesystem.writeFile(
      root + "/chapters/" + title + ".md",
      "# " + title + "\n "
    );
    client.setQueryData<Chapter[]>(["getChapters", root], (chapters) => [
      ...(chapters || []),
      {
        path: title + ".md",
        content: "# " + title + "\n ",
        saved: true,
      },
    ]);
  };

  const deleteChapter = async (c: Chapter) => {
    await Electron.filesystem.deleteFile(root + "/chapters/" + c.path);

    client.setQueryData<Chapter[]>(["getChapters", root], (chapters) =>
      (chapters || []).filter((ch) => ch.path !== c.path)
    );

    if (currentFile?.path === root + "/chapters/" + c.path) {
      setCurrentFile(undefined);
    }
  };

  return {
    chapters: data,
    isLoading: status === "loading",
    addChapter,
    deleteChapter,
  };
};
