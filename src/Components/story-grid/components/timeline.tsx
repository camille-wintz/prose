import styles from "@/components/story-grid/components/timeline.module.scss";
import { Act } from "@/components/story-grid/interfaces/act";
import { TimelinePoint } from "@/components/story-grid/components/timeline-point";

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
