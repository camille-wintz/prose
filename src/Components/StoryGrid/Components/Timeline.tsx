import { plotPointNames } from "@/Components/StoryGrid/Interfaces/PlotPoint";
import styles from "@/Components/StoryGrid/Components/Timeline.module.scss";
import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import { TimelinePoint } from "@/Components/StoryGrid/Components/TimelinePoint";

export const Timeline = ({
  act,
  onChange,
}: {
  act: Act;
  onChange: (a: Act) => void;
}) => {
  return (
    <div className={styles.timeline}>
      <div className={styles.band} />
      <div>
        {act.points.map((p, i) => (
          <TimelinePoint
            onChange={(point) =>
              onChange({
                ...act,
                points: act.points.map((pi, j) => (j === i ? point : pi)),
              })
            }
            point={p}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
