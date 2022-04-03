import React from "react";
import { useProject } from "../../Hooks/useProject";
import { Button } from "../Form/Button";

export const OpenProject = () => {
  const { pickFolder } = useProject();

  return <Button onClick={() => pickFolder()}>Select project folder</Button>;
};
