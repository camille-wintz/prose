import { useEffect, useState } from "react";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Editor } from "../Editor/Editor";
import { Nav } from "./Nav";
import "../../Styles/Nav.scss";

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
      <div
        className={`h-full w-250 ${showFile ? "flex p-8" : "justify-center"}`}
      >
        <Nav className={showFile ? "navLeft" : "navCenter"} />
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
      ) : showFile ? (
        <div className="grow flex overflow-auto justify-center h-full bg-dark2"></div>
      ) : null}
    </>
  );
};
