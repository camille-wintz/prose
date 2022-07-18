import { ActsNav } from "@/Components/StoryGrid/Components/ActsNav";
import { PlotsNav } from "@/Components/StoryGrid/Components/PlotsNav";
import { Timeline } from "@/Components/StoryGrid/Components/Timeline";
import { threeActsStructure } from "@/Components/StoryGrid/Hooks/Grid";
import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { Plot } from "@/Components/StoryGrid/Interfaces/Plot";
import { useState } from "react";

export const GridView = ({
  grid,
  onChange,
}: {
  grid: Grid;
  onChange: (v: Grid) => void;
}) => {
  const [plotName, setPlotName] = useState<string>(grid.plots[0].name);
  const [actIndex, setActIndex] = useState<number>(0);

  const plot = grid.plots.find((p) => p.name === plotName);

  return (
    <>
      <PlotsNav
        plots={grid.plots}
        selectedPlot={plot}
        onChange={(p) => {
          setPlotName(p);
          setActIndex(0);
        }}
        onAddPlot={(pName: string) =>
          onChange({
            ...grid,
            plots: [...grid.plots, { name: pName, acts: threeActsStructure() }],
          })
        }
      />

      <ActsNav
        actIndex={actIndex}
        acts={grid.plots.find((p) => p.name === plotName)?.acts || []}
        onChange={(i) => setActIndex(i)}
      />
      <Timeline
        act={grid.plots[0].acts[actIndex]}
        onChange={(v) =>
          onChange({
            ...grid,
            plots: grid.plots.map((p) => ({
              ...p,
              acts: plot?.acts.map((a, i) => (i === actIndex ? v : a)) || [],
            })),
          })
        }
      />
    </>
  );
};
