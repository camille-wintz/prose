import { useQuery, useQueryClient } from "react-query";
import { useProject } from "./useProject";

export const useChapters = () => {
  const { root } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<string[]>(
    ["getChapters", root],
    async () => {
      try {
        const files = await Neutralino.filesystem.readDirectory(
          root + "/chapters"
        );
        return files.filter((f) => f.type !== "DIRECTORY").map((f) => f.entry);
      } catch (e: any) {
        if (e.code === "NE_FS_NOPATHE") {
          Neutralino.filesystem.createDirectory(root + "/chapters");
        }

        return [];
      }
    }
  );

  const addChapter = async (title: string) => {
    const path = root + "/chapters/" + title + ".md";
    await Neutralino.filesystem.writeFile(
      root + "/chapters/" + title + ".md",
      "# " + title
    );
    client.setQueryData<string[]>(["getChapters", root], (chapters) => [
      ...(chapters || []),
      title + ".md",
    ]);
  };

  console.log(data);

  return {
    chapters: data,
    isLoading: status === "loading",
    addChapter,
  };
};
