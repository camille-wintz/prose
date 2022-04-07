import React, { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export interface MainFile {
  chapters: string[];
  projectFiles: string[];
  wordCount: number;
}

export const ProjectContext = React.createContext({
  root: "",
  setRoot: (root: string) => {},
});

export const useProject = () => {
  const client = useQueryClient();
  const { root, setRoot } = useContext(ProjectContext);

  useEffect(() => {
    const lastOpened = localStorage.getItem("LastOpened");
    if (lastOpened) {
      setRoot(lastOpened);
    }
  }, []);

  const { data, status } = useQuery<MainFile>(["getMain", root], async () => {
    if (!root) {
      return {};
    }

    try {
      const entries = await Neutralino.filesystem.readDirectory(root);
      const main = entries.find((e) => e.entry === "Main.json");

      if (main) {
        const content = await Neutralino.filesystem.readFile(
          root + "/Main.json"
        );
        const parsed = JSON.parse(content);
        let wc = 0;
        for (let chapter of parsed.chapters) {
          const content = await Neutralino.filesystem.readFile(
            root + "/chapters/" + chapter
          );
          wc += content.split(" ").length;
        }
        return {
          ...parsed,
          wordCount: wc,
        };
      }

      await Neutralino.filesystem.writeFile(
        root + "/Main.json",
        JSON.stringify({
          chapters: [],
        })
      );

      return {
        chapters: [],
        projectFiles: [],
      };
    } catch (e: any) {
      return {
        chapters: [],
        projectFiles: [],
      };
    }
  });

  const pickFolder = async () => {
    const folder = await Neutralino.os.showFolderDialog(
      "Pick your novel folder"
    );
    setRoot(folder);
    localStorage.setItem("LastOpened", folder);
  };

  const saveMain = async (newMain: MainFile) => {
    await Neutralino.filesystem.writeFile(
      root + "/Main.json",
      JSON.stringify(newMain)
    );

    client.setQueryData(["getMain", root], newMain);
  };

  return { pickFolder, root, saveMain, main: data };
};
