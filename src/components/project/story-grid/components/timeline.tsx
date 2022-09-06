import styles from "@/components/project/story-grid/components/timeline.module.scss";
import { Act } from "@/components/project/story-grid/interfaces/act";
import { TimelinePoint } from "@/components/project/story-grid/components/timeline-point";
import GridLink1 from "@/assets/grid-link-1.svg";
import GridLink2 from "@/assets/grid-link-2.svg";
import GridLink3 from "@/assets/grid-link-3.svg";
import { Modal, ModalButtons } from "@/components/common/modal";
import { PlotPoint } from "@/components/project/story-grid/interfaces/plot-point";
import { useState } from "react";
import { Button } from "@/components/form/button";
import { Select } from "@/components/form/select";
import { useChapters } from "@/hooks/chapters";
import { ProjectFile } from "@/interfaces/project-file";
import { Textarea } from "@/components/form/textarea";

export const Timeline = ({
  act,
  onChange,
}: {
  act: Act;
  onChange: (a: Act) => void;
}) => {
  const { chapters } = useChapters();
  const [editPlotPoint, setEditPlotPoint] = useState<PlotPoint | null>(null);

  return (
    <div className={styles.timeline}>
      <div>
        {act.points.map((p, i) => (
          <>
            <TimelinePoint
              point={p}
              key={i}
              onClick={() => setEditPlotPoint(p)}
            />
          </>
        ))}
        <img src={GridLink1} className="" />
        <img src={GridLink2} className="mt-[82px] ml-[9px]" />
        <img src={GridLink3} className="absolute left-[-44px] top-[292px]" />
      </div>
      <Modal
        title="Edit plot point"
        show={!!editPlotPoint}
        onDismiss={() => setEditPlotPoint(null)}
      >
        <div className="p-8">
          {chapters && (
            <Select<ProjectFile>
              className="mb-4"
              renderOption={(c) => c.path.split(".md")[0]}
              label="Pick a chapter"
              value={chapters.find((c) => c.path === editPlotPoint?.chapter)}
              onChange={(v) =>
                setEditPlotPoint(
                  editPlotPoint ? { ...editPlotPoint, chapter: v.path } : null
                )
              }
              options={chapters}
            />
          )}
          <Textarea
            value={editPlotPoint?.content}
            onChange={(content) => {
              setEditPlotPoint(
                editPlotPoint ? { ...editPlotPoint, content } : null
              );
            }}
          />
          <Button
            type="button"
            onClick={() => {
              setEditPlotPoint(null);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() =>
              onChange({
                ...act,
                points: act.points.map((pi) =>
                  pi.eventType === editPlotPoint?.eventType ? editPlotPoint : pi
                ),
              })
            }
          >
            Save changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};
