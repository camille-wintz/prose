import { useEffect, useState } from "react";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Editor } from "../Editor/Editor";
import { Nav } from "./Nav";
import { FileNavigation } from "../File/FileNavigation";
import { IconsNav } from "./IconsNav";

export const Project = () => {
  const { main } = useProject();
  const { currentFile, saveFile } = useCurrentFile();
  const [showFile, setShowFile] = useState(false);

  useEffect(() => {
    if (currentFile) {
      setShowFile(true);
    }
  }, [currentFile]);

  if (!main) {
    return null;
  }

  return (
    <>
      <div className={`h-full w-250`}>
        <Nav />
      </div>
      {currentFile ? (
        <div className="bg-white grow h-full flex">
          <FileNavigation className="ml-6" />
          <div className="flex grow overflow-auto justify-center h-full">
            <Editor
              value={currentFile.content}
              onChange={(value) => {
                saveFile(value);
              }}
            />
          </div>
          <div className="text-label fixed right-8 bottom-6">
            {currentFile.wordCount} words
          </div>
        </div>
      ) : showFile ? (
        <div className="grow flex overflow-auto justify-center h-full bg-white"></div>
      ) : null}
      {currentFile || showFile ? <IconsNav /> : null}
    </>
  );
};
