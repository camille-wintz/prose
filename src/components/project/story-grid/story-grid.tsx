import { useGridAnalysis } from "@/components/project/story-grid/hooks/story-grid";
import { Grid } from "@/components/project/story-grid/interfaces/grid";
import { GridView } from "@/components/project/story-grid/views/grid-view";
import { useCurrentFile } from "@/hooks/current-file";

export const StoryGrid = ({ value }: { value: Grid }) => {
  const { saveFile, applyChanges } = useCurrentFile();
  const { grid } = useGridAnalysis(value);

  if (!grid) {
    return null;
  }

  return (
    <>
      <GridView
        grid={grid}
        onChange={(value) => {
          saveFile(JSON.stringify(value));
          applyChanges(JSON.stringify(value));
        }}
      />
    </>
  );
};
