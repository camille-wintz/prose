import { useQuery, useQueryClient } from "react-query";
import { useProject } from "./useProject";

export const useChapters = () => {
  const { root, main, saveMain } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<string[]>(
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

        return [...(main.chapters || []), ...missingChapters];
      } catch (e: any) {
        if (e.code === "NE_FS_NOPATHE") {
          Electron.filesystem.createDirectory(root + "/chapters");
        }

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
    client.setQueryData<string[]>(["getChapters", root], (chapters) => [
      ...(chapters || []),
      title + ".md",
    ]);
  };

  return {
    chapters: data,
    isLoading: status === "loading",
    addChapter,
  };
};
