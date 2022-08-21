import { CurrentFile } from "@/components/project/current-file";
import { MainNav } from "@/components/project/main-nav";
import { OpenedFiles } from "@/components/project/opened-files";
import { SearchFile } from "@/components/project/search-file/search-file";
import { useProject } from "@/hooks/project";

export const Project = () => {
  const { main } = useProject();

  if (!main) {
    return null;
  }

  return (
    <div className={`grow h-full flex`}>
      <MainNav />
      <CurrentFile />
      <OpenedFiles />
    </div>
  );
};
