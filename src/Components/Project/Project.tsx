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

  if (!main) {
    return null;
  }

  return (
    <div className={`grow h-full flex`}>
      <Nav />
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
    </div>
  );
};
