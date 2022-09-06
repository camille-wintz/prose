import { CurrentFileContext } from "@/hooks/current-file";
import { useProject } from "@/hooks/project";
import { ProjectFile } from "@/interfaces/project-file";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

export const useChapters = () => {
  const { current, setCurrentFile } = useContext(CurrentFileContext);
  const { root, main, saveMain } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<ProjectFile[]>(
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

        const deletedChapters = main.chapters?.filter(
          (f) => !chapterFiles.includes(f)
        );

        if (deletedChapters.length > 0) {
          saveMain({
            ...main,
            chapters: main.chapters.filter((f) => !deletedChapters.includes(f)),
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
    client.setQueryData<ProjectFile[]>(["getChapters", root], (chapters) => [
      ...(chapters || []),
      {
        path: title + ".md",
        content: "# " + title + "\n ",
        saved: true,
      },
    ]);
  };

  const deleteChapter = async (c: ProjectFile) => {
    await Electron.filesystem.deleteFile(root + "/chapters/" + c.path);

    client.setQueryData<ProjectFile[]>(["getChapters", root], (chapters) =>
      (chapters || []).filter((ch) => ch.path !== c.path)
    );

    if (current?.path === root + "/chapters/" + c.path) {
      setCurrentFile(undefined);
    }
  };

  const renameChapter = async (c: ProjectFile, newName: string) => {
    await Electron.filesystem.rename(
      root + "/chapters/" + c.path,
      root + "/chapters/" + newName + ".md"
    );

    client.setQueryData<ProjectFile[]>(["getChapters", root], (chapters) =>
      (chapters || []).map((ch) =>
        ch.path !== c.path ? ch : { ...c, path: newName + ".md" }
      )
    );
  };

  return {
    chapters: data,
    isLoading: status === "loading",
    addChapter,
    deleteChapter,
    renameChapter,
  };
};
