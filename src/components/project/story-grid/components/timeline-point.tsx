import {
  PlotPoint,
  plotPointContents,
  plotPointNames,
  PlotPointTypes,
} from "@/components/project/story-grid/interfaces/plot-point";
import styles from "@/components/project/story-grid/components/timeline-point.module.scss";

export const TimelinePoint = ({
  point,
  onClick,
}: {
  point: PlotPoint;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div className={`${styles.plotPoint} group`} onClick={(e) => onClick(e)}>
      {point.eventType === PlotPointTypes.Complication && (
        <div className={`${styles.dot} bg-purple h-32 w-32`}></div>
      )}
      {point.eventType === PlotPointTypes.Resolution && (
        <div className={`${styles.dot} bg-text h-12 w-12`}></div>
      )}
      <div className={`flex flex-col ${styles.content}`}>
        <h3>{plotPointNames[point.eventType]}</h3>
        <p className={point.content ? "text-content-2" : "text-content-1"}>
          {point.content || plotPointContents[point.eventType]}
        </p>
        <button>
          {point.scene || point.chapter?.split(".md")[0] || "Pick a chapter"}
        </button>
      </div>

      {point.eventType === PlotPointTypes.IncitingEvent && (
        <div className={`${styles.dot} bg-darkPurple h-20 w-20`}></div>
      )}

      {point.eventType === PlotPointTypes.Crisis && (
        <div className={`${styles.dot} bg-pink h-16 w-16`}></div>
      )}
    </div>
  );
};
