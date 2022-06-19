import { useEffect, useState } from "react";
import Book from "../../Assets/Book.svg";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Editor } from "../Editor/Editor";
import { FileNavigation } from "../File/FileNavigation";
import { Nav } from "./Nav";

export const Project = () => {
  const { main } = useProject();
  const { currentFile, saveFile } = useCurrentFile();
  const [showFile, setShowFile] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (currentFile) {
      setShowFile(true);
    }
  }, [currentFile]);

  if (!main) {
    return null;
  }

  return (
    <div className={`grow h-full flex`}>
      <FileNavigation className="ml-6" />
      {currentFile ? (
        <>
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
        </>
      ) : null}
      <div
        className={`fixed right-0 top-0 h-screen transition-all ${
          !currentFile && !showFile ? "w-full items-center" : "w-24"
        } flex p-6 justify-center`}
      >
        <button onClick={() => setShowNav(true)} className="flex">
          <img src={Book} />
        </button>
      </div>
      <Nav onDismiss={() => setShowNav(false)} visible={showNav} />
    </div>
  );
};
