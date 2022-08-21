import { Editor } from "@/components/project/editor/editor";
import { StoryGrid } from "@/components/story-grid/story-grid";
import { useCurrentFile } from "@/hooks/current-file";

export const CurrentFile = () => {
  const { current, saveFile } = useCurrentFile();

  return (
    <>
      {current && !current.path.endsWith(".storygrid") && current.content ? (
        <>
          <div className="flex grow overflow-auto justify-center h-full">
            <Editor
              value={current.content}
              onChange={(value) => {
                saveFile(value);
              }}
            />
          </div>
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
    </>
  );
};
