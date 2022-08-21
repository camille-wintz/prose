import { useQuery, useQueryClient } from "react-query";
import { useProject } from "./project";

export const useProjectFiles = () => {
  const { root, main, saveMain } = useProject();
  const client = useQueryClient();
  const { data, status } = useQuery<{ path: string; saved: boolean }[]>(
    ["getProjectFiles", root],
    async () => {
      if (!main || !root) {
        return [];
      }

      const initialList = main.projectFiles || [];

      try {
        const files = await Electron.filesystem.readDirectory(root);
        const projectFiles = files.filter(
          (f) => f !== "Main.json" && f !== ".DS_Store"
        );

        const missingFiles = projectFiles.filter(
          (f) => !initialList.some((c) => c === f)
        );

        const deletedFiles = initialList.filter(
          (f) => !projectFiles?.some((c) => c === f)
        );

        if (missingFiles.length > 0 || deletedFiles.length > 0) {
          saveMain({
            ...main,
            projectFiles: [
              ...initialList.filter((f) => !deletedFiles.includes(f)),
              ...missingFiles,
            ],
          });
        }

        return [
          ...initialList
            .filter((f) => !deletedFiles.includes(f))
            .map((f) => ({ path: f, saved: true })),
          ...missingFiles.map((f) => ({ path: f, saved: true })),
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
    client.setQueryData<{ path: string; saved: boolean }[]>(
      ["getProjectFiles", root],
      (projectFiles) => [
        ...(projectFiles || []),
        {
          path: title.indexOf(".") === -1 ? title + ".md" : title,
          saved: true,
        },
      ]
    );
  };

  return {
    projectFiles: data,
    isLoading: status === "loading",
    addProjectFile,
  };
};
