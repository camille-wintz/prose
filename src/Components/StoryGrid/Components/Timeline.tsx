import { plotPointNames } from "@/Components/StoryGrid/Interfaces/PlotPoint";
import styles from "@/Components/StoryGrid/Components/Timeline.module.scss";
import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import { TimelinePoint } from "@/Components/StoryGrid/Components/TimelinePoint";

export const Timeline = ({ act }: { act: Act }) => {
  return (
    <div className={styles.timeline}>
      <div className={styles.band} />
      <div>
        {act.points.map((p, i) => (
          <TimelinePoint point={p} key={i} />
        ))}
      </div>
    </div>
  );
};
