import { useCurrentFile } from "@/hooks/current-file";
import { useProject } from "@/hooks/project";
import { ProjectFile } from "@/interfaces/project-file";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export const useOpenedFiles = () => {
  const client = useQueryClient();
  const { root } = useProject();
  const { current } = useCurrentFile();
  const { data } = useQuery<ProjectFile[]>(["openedFiles", root], async () => {
    return [];
  });

  useEffect(() => {
    client.setQueryData<ProjectFile[]>(["openedFiles", root], (opened) =>
      opened
        ? current !== undefined
          ? [current, ...opened]
          : opened
        : current !== undefined
        ? [current]
        : []
    );
  }, [current?.path]);

  return {
    opened: data || [],
  };
};
