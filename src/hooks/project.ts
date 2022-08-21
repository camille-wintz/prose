import React, { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export interface MainFile {
  title?: string;
  chapters: string[];
  projectFiles: string[];
}

export const useProject = () => {
  const client = useQueryClient();

  const { data: root } = useQuery(["getRoot"], () => {
    const lastOpened = localStorage.getItem("LastOpened");
    if (lastOpened && lastOpened !== "undefined") {
      return lastOpened;
    }

    return "";
  });

  const { data, status } = useQuery<MainFile>(["getMain", root], async () => {
    if (!root) {
      return {};
    }

    try {
      const entries = await Electron.filesystem.readDirectory(root);
      const main = entries.find((e) => e === "Main.json");

      if (main) {
        const content = await Electron.filesystem.readFile(root + "/Main.json");
        const parsed = JSON.parse(content);

        return {
          ...parsed,
        };
      }

      await Electron.filesystem.writeFile(
        root + "/Main.json",
        JSON.stringify({
          chapters: [],
        })
      );

      return {
        chapters: [],
        projectFiles: [],
        title: "",
      };
    } catch (e: any) {
      return {
        chapters: [],
        projectFiles: [],
        title: "",
      };
    }
  });

  const pickFolder = async () => {
    const folder = await Electron.filesystem.showFolderDialog(
      "Pick your novel folder"
    );
    client.setQueryData("getRoot", folder);
    localStorage.setItem("LastOpened", folder);
  };

  const saveMain = async (newMain: MainFile) => {
    await Electron.filesystem.writeFile(
      root + "/Main.json",
      JSON.stringify(newMain)
    );

    client.setQueryData(["getMain", root], newMain);
  };

  return { pickFolder, root, saveMain, main: data };
};
