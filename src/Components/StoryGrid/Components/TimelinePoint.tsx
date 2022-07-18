import {
  PlotPoint,
  plotPointNames,
} from "@/Components/StoryGrid/Interfaces/PlotPoint";
import styles from "@/Components/StoryGrid/Components/TimelinePoint.module.scss";

export const TimelinePoint = ({ point }: { point: PlotPoint }) => {
  return (
    <div className={styles.plotPoint}>
      <h3>{plotPointNames[point.eventType]}</h3>
    </div>
  );
};
