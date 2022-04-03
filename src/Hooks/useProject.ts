import React, { useContext } from "react";

export const ProjectContext = React.createContext({
  root: "",
  setRoot: (root: string) => {},
});

export const useProject = () => {
  const { root, setRoot } = useContext(ProjectContext);

  const pickFolder = async () => {
    const folder = await Neutralino.os.showFolderDialog(
      "Pick your novel folder"
    );
    setRoot(folder);
  };

  return { pickFolder, root };
};
