import { useGridAnalysis } from "@/Components/StoryGrid/Hooks/Grid";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { Empty } from "@/Components/StoryGrid/Views/Empty";
import { GridView } from "@/Components/StoryGrid/Views/GridView";
import { useCurrentFile } from "@/Hooks/useCurrentFile";

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
