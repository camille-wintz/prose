import { useChapters } from "@/hooks/chapters";
import { useProject } from "@/hooks/project";
import { useEffect, useState } from "react";
import { uniq } from "lodash";
import { Grid } from "@/components/project/story-grid/interfaces/grid";
import { PlotPointTypes } from "@/components/project/story-grid/interfaces/plot-point";
import { ProjectFile } from "@/interfaces/project-file";

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

  const analyzeChapters = async (chapters: ProjectFile[]) => {
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
    if (!chapters) return;

    analyzeChapters(chapters);
  }, [chapters?.length]);

  return { grid };
};
