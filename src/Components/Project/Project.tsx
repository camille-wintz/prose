import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Editor } from "../Editor/Editor";
import { Nav } from "./Nav";

export const Project = () => {
  const { main } = useProject();
  const { currentFile, saveFile } = useCurrentFile();

  if (!main) {
    return null;
  }

  return (
    <>
      <div className={`w-250 ${currentFile ? "flex p-8" : "justify-center"}`}>
        <Nav className={currentFile ? "items-left" : "items-center"} />
      </div>
      {currentFile ? (
        <>
          <div className="grow flex overflow-auto justify-center h-full bg-dark2">
            <Editor
              value={currentFile.content}
              onChange={(value) => saveFile(value)}
            />
            <div className="text-label fixed right-8 bottom-6">
              {currentFile.wordCount} words
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
