import { ActsNav } from "@/Components/StoryGrid/Components/ActsNav";
import { PlotsNav } from "@/Components/StoryGrid/Components/PlotsNav";
import { Timeline } from "@/Components/StoryGrid/Components/Timeline";
import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { Plot } from "@/Components/StoryGrid/Interfaces/Plot";
import { useState } from "react";

export const GridView = ({ grid }: { grid: Grid }) => {
  const [plot, setPlot] = useState<Plot>(grid.plots[0]);
  const [act, setAct] = useState<Act>(grid.plots[0].acts[0]);

  return (
    <>
      <PlotsNav
        plots={grid.plots}
        selectedPlot={plot}
        onChange={(p) => {
          setPlot(p);
          setAct(p.acts[0]);
        }}
      />
      {plot.acts ? (
        <ActsNav acts={plot.acts} onChange={(a) => setAct(a)} />
      ) : null}
      {act ? <Timeline act={act} /> : null}
    </>
  );
};
