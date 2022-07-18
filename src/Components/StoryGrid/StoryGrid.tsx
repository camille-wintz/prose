import { useGridAnalysis } from "@/Components/StoryGrid/Hooks/Grid";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { Empty } from "@/Components/StoryGrid/Views/Empty";
import { GridView } from "@/Components/StoryGrid/Views/GridView";

export const StoryGrid = ({
  value,
  onChange,
}: {
  value: Grid;
  onChange: (g: Grid) => void;
}) => {
  const { grid } = useGridAnalysis();

  if (!grid?.plots || !grid?.plots.length) {
    return <Empty />;
  }

  return (
    <>
      <GridView grid={grid} />
    </>
  );
};
