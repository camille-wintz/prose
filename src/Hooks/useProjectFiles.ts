import { useQuery, useQueryClient } from "react-query";
import { useProject } from "./useProject";

export const useProjectFiles = () => {
  const { root, main, saveMain } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<string[]>(
    ["getProjectFiles", root],
    async () => {
      if (!main) {
        return [];
      }

      try {
        const files = await Electron.filesystem.readDirectory(root);
        const projectFiles = files.filter(
          (f) => f !== "Main.json" && f !== ".DS_Store"
        );

        const missingFiles = projectFiles.filter(
          (f) => !main.projectFiles?.some((c) => c === f)
        );

        const deletedFiles = main.projectFiles.filter(
          (f) => !projectFiles?.some((c) => c === f)
        );

        if (missingFiles.length > 0 || deletedFiles.length > 0) {
          saveMain({
            ...main,
            projectFiles: [
              ...(main.projectFiles.filter((f) => !deletedFiles.includes(f)) ||
                []),
              ...missingFiles,
            ],
          });
        }

        return [
          ...(main.projectFiles.filter((f) => !deletedFiles.includes(f)) || []),
          ...missingFiles,
        ];
      } catch (e: any) {
        console.log(e);

        return [];
      }
    }
  );

  const addProjectFile = async (title: string) => {
    const path =
      title.indexOf(".") === -1
        ? root + "/" + title + ".md"
        : root + "/" + title;
    await Electron.filesystem.writeFile(path, "# " + title + "\n ");
    client.setQueryData<string[]>(["getProjectFiles", root], (projectFiles) => [
      ...(projectFiles || []),
      title.indexOf(".") === -1 ? title + ".md" : title,
    ]);
  };

  return {
    projectFiles: data,
    isLoading: status === "loading",
    addProjectFile,
  };
};
