import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { Editor } from "../Editor/Editor";
import { Nav } from "./Nav";

export const Project = () => {
  const { currentFile, saveFile } = useCurrentFile();

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
          </div>
        </>
      ) : null}
    </>
  );
};
