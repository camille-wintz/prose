import { useGridAnalysis } from "@/components/project/story-grid/hooks/story-grid";
import { StatsGraph } from "@/components/project/story-stats/comps/stats-graph";
import { useChapters } from "@/hooks/chapters";
import { useProject } from "@/hooks/project";
import { useProjectFiles } from "@/hooks/project-files";
import { ProjectFile } from "@/interfaces/project-file";
import { useQuery } from "react-query";

export const StoryStats = () => {
  const { root } = useProject();
  const { data } = useQuery<ProjectFile | undefined>(
    ["getCurrentFileContent", root + "/Story Grid.storygrid"],
    async () => {
      try {
        const content = await Electron.filesystem.readFile(
          root + "/Story Grid.storygrid"
        );

        return { content, path: root + "/Story Grid.storygrid", saved: true };
      } catch (e) {
        console.log(e);
        return {
          content: "",
          path: root + "/Story Grid.storygrid",
          saved: true,
        };
      }
    }
  );

  console.log(data);

  const { grid } = useGridAnalysis(
    data && data.content ? JSON.parse(data.content) : {}
  );
  const { main } = useProject();
  const { chapters } = useChapters();

  console.log(grid);

  const totalWords = chapters?.reduce((acc, curr) => {
    return acc + (curr.content?.split(" ").length || 0);
  }, 0);

  const actWords = (actIndex: number) =>
    chapters
      ?.slice(
        actIndex === 0
          ? 0
          : chapters.findIndex(
              (c) => c.path === grid?.plots[0].acts[actIndex].points[0].chapter
            ),
        chapters.findIndex(
          (c) =>
            c.path ===
            grid?.plots[0].acts[actIndex].points[
              grid?.plots[0].acts[actIndex].points.length - 1
            ].chapter
        ) + 1
      )
      .reduce((acc, curr) => {
        return acc + (curr.content?.split(" ").length || 0);
      }, 0);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="font-display text-5xl text-pink mb-2">{main?.title}</h1>
      <p className="text-2xl text-text font-light">{totalWords} words</p>
      <p className="text-2xl text-text font-light">Act 1 {actWords(0)} words</p>
      <p className="text-2xl text-text font-light">Act 2 {actWords(1)} words</p>
      <p className="text-2xl text-text font-light">Act 3 {actWords(2)} words</p>

      <StatsGraph />
    </div>
  );
};
