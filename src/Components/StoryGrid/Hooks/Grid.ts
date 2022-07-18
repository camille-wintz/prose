import { Chapter, useChapters } from "@/Hooks/useChapters";
import { useProject } from "@/Hooks/useProject";
import { useEffect, useState } from "react";
import { uniq } from "lodash";
import { Grid } from "@/Components/StoryGrid/Interfaces/Grid";
import { PlotPointTypes } from "@/Components/StoryGrid/Interfaces/PlotPoint";

export const useGridAnalysis = () => {
  const [grid, setGrid] = useState<Grid>();
  const { root } = useProject();
  const { chapters } = useChapters();

  const analyzeChapters = async (chapters: Chapter[]) => {
    let content = "";
    for (let chapter of chapters) {
      content += await Electron.filesystem.readFile(
        root + "/chapters/" + chapter.path
      );
    }
    const lines = content.split("\n");
    const annotations = lines.filter((l) => l.startsWith("@"));

    const acts = annotations.filter((a) => a.startsWith("@Act"));
    const scenes = annotations.filter((a) => a.startsWith("@Scene"));

    const plots = acts.map((act) =>
      act.indexOf("“") !== -1
        ? act.split("@Act")[1].trim().split("“")[1].split("”")[0]
        : "Main plot"
    );
    setGrid((grid) => ({
      plots: uniq(plots).map((p) => ({
        name: p,
        acts: acts
          .filter((a) => a.includes("“" + p + "”"))
          .map((a) => ({
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
              { eventType: PlotPointTypes.Resolution, content: "", scene: "" },
            ],
          })),
      })),
    }));
  };

  useEffect(() => {
    if (!chapters || !chapters.length) return;

    analyzeChapters(chapters);
  }, [chapters?.length]);

  return { grid };
};
