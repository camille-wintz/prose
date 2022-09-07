import { Button } from "@/components/form/button";
import { SearchContext } from "@/components/project/context";
import { Editor } from "@/components/project/editor/editor";
import { FileWordCount } from "@/components/project/editor/file-word-count";
import { StoryGrid } from "@/components/project/story-grid/story-grid";
import { StoryStats } from "@/components/project/story-stats";
import { useCurrentFile } from "@/hooks/current-file";
import { useProject } from "@/hooks/project";
import { useContext } from "react";

export const CurrentFile = () => {
  const { showSearch, setShowSearch } = useContext(SearchContext);
  const { main } = useProject();
  const { current, saveFile } = useCurrentFile();

  if (!main) {
    return null;
  }

  if (!current) {
    return (
      <div className="flex flex-col grow justify-center items-center">
        <h1 className="text-pink font-display text-4xl mb-8">
          {main.title || "New novel"}
        </h1>
        <Button onClick={() => setShowSearch(true)} className="text-pink">
          Open file
        </Button>
      </div>
    );
  }

  return (
    <>
      {current &&
      !current.path.endsWith(".storygrid") &&
      !current.path.endsWith(".storystats") &&
      current.content ? (
        <>
          <div className="flex grow overflow-auto justify-center h-full">
            <Editor
              value={current.content}
              onChange={(value) => {
                saveFile(value);
              }}
            />
          </div>
          <FileWordCount />
        </>
      ) : null}

      {current && current.path.endsWith(".storygrid") ? (
        <>
          <div className="flex flex-col grow overflow-auto justify-center h-full">
            <StoryGrid
              value={current.content ? JSON.parse(current.content) : {}}
            />
          </div>
        </>
      ) : null}

      {current && current.path.endsWith(".storystats") ? (
        <>
          <div className="flex flex-col grow overflow-auto justify-center h-full">
            <StoryStats />
          </div>
        </>
      ) : null}
    </>
  );
};
