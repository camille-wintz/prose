import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Editor } from "../Editor/Editor";
import { StoryGrid } from "../StoryGrid/StoryGrid";
import { Nav } from "./Nav";

export const Project = () => {
  const { main } = useProject();
  const { currentFile, saveFile } = useCurrentFile();

  if (!main) {
    return null;
  }

  return (
    <div className={`grow h-full flex`}>
      <Nav />
      {currentFile && !currentFile.path.endsWith(".storygrid") ? (
        <>
          <div className="flex grow overflow-auto justify-center h-full">
            <Editor
              value={currentFile.content}
              onChange={(value) => {
                saveFile(value);
              }}
            />
          </div>
        </>
      ) : null}

      {currentFile && currentFile.path.endsWith(".storygrid") ? (
        <>
          <div className="flex flex-col grow overflow-auto justify-center h-full">
            <StoryGrid
              value={currentFile.content ? JSON.parse(currentFile.content) : {}}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
