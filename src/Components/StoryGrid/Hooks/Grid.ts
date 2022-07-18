import { Chapter, useChapters } from "@/Hooks/useChapters";
import { useProject } from "@/Hooks/useProject";
import { useEffect, useState } from "react";
import { uniq } from "lodash";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { PlotPointTypes } from "@/Components/StoryGrid/Interfaces/PlotPoint";

export const threeActsStructure = () =>
  [0, 1, 2].map((a) => ({
    points: [
      {
        eventType: PlotPointTypes.IncitingEvent,
        content: "",
        scene: "",
      },
      {
        eventType: PlotPointTypes.Complication,
        content: "",
        scene: "",
      },
      { eventType: PlotPointTypes.Crisis, content: "", scene: "" },
      {
        eventType: PlotPointTypes.Resolution,
        content: "",
        scene: "",
      },
    ],
  }));

export const useGridAnalysis = (gridFile: Grid) => {
  const [grid, setGrid] = useState<Grid>();
  const { root } = useProject();
  const { chapters } = useChapters();

  useEffect(() => {
    if (gridFile && gridFile.plots && grid) {
      setGrid({ ...grid, plots: gridFile.plots });
    }
  }, [JSON.stringify(gridFile)]);

  const analyzeChapters = async (chapters: Chapter[]) => {
    let content = "";
    for (let chapter of chapters) {
      content += await Electron.filesystem.readFile(
        root + "/chapters/" + chapter.path
      );
    }
    const lines = content.split("\n");
    const annotations = lines.filter((l) => l.startsWith("@"));
    const scenes = annotations.filter((a) => a.startsWith("@Scene"));

    setGrid((grid) => ({
      scenes: scenes.map((s) => ({
        name: s.split("@Scene")[1].trim().split("“")[1].split("”")[0],
      })),
      plots: gridFile.plots
        ? gridFile.plots
        : [
            {
              name: "Main plot",
              acts: threeActsStructure(),
            },
          ],
    }));
  };

  useEffect(() => {
    if (!chapters || !chapters.length) return;

    analyzeChapters(chapters);
  }, [chapters?.length]);

  return { grid };
};
