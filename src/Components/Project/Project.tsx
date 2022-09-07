import { SearchContext } from "@/components/project/context";
import { CurrentFile } from "@/components/project/current-file";
import { MainNav } from "@/components/project/main-nav";
import { OpenedFiles } from "@/components/project/opened-files";
import { useProject } from "@/hooks/project";
import { useState } from "react";

export const Project = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { main } = useProject();

  if (!main) {
    return null;
  }

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch }}>
      <div className={`grow h-full flex`}>
        <MainNav />
        <CurrentFile />
        <OpenedFiles />
      </div>
    </SearchContext.Provider>
  );
};
