import { ActsNav } from "@/components/project/story-grid/components/acts-nav";
import { PlotsNav } from "@/components/project/story-grid/components/plots-nav";
import { Timeline } from "@/components/project/story-grid/components/timeline";
import { threeActsStructure } from "@/components/project/story-grid/hooks/story-grid";
import { Grid } from "@/components/project/story-grid/interfaces/grid";
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
      {plot ? (
        <Timeline
          act={plot?.acts[actIndex]}
          onChange={(v) =>
            onChange({
              ...grid,
              plots: grid.plots.map((p) =>
                p.name === plotName
                  ? {
                      ...p,
                      acts:
                        plot?.acts.map((a, i) => (i === actIndex ? v : a)) ||
                        [],
                    }
                  : p
              ),
            })
          }
        />
      ) : null}
    </>
  );
};
