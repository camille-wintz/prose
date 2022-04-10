import { useQuery } from "react-query";
import { useCurrentFile } from "./useCurrentFile";
import { Descendant } from "slate";

export const useEditorCommands = () => {
  const { currentFile } = useCurrentFile();

  const { data } = useQuery<Descendant[]>(
    ["getEditorCommands", currentFile?.path],
    () => {
      return [];
    }
  );

  return { commands: data };
};
