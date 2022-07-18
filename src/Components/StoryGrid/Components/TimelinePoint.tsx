import {
  PlotPoint,
  plotPointContents,
  plotPointNames,
} from "@/Components/StoryGrid/Interfaces/PlotPoint";
import styles from "@/Components/StoryGrid/Components/TimelinePoint.module.scss";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export const TimelinePoint = ({
  point,
  onChange,
}: {
  point: PlotPoint;
  onChange: (p: PlotPoint) => void;
}) => {
  const [content, setContent] = useState(point.content);
  const [isEditing, setIsEditing] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useClickAway(container, () => {
    if (!isEditing) {
      return;
    }

    setTimeout(() => {
      setIsEditing(false);
      onChange({ ...point, content });
    }, 100);
  });

  return (
    <div
      ref={container}
      className={styles.plotPoint}
      onClick={() => setIsEditing(true)}
    >
      <h3>{plotPointNames[point.eventType]}</h3>
      {isEditing ? (
        <textarea onChange={(v) => setContent(v.target.value)}>
          {point.content}
        </textarea>
      ) : (
        <p>{point.content || plotPointContents[point.eventType]}</p>
      )}
      <button>{point.scene || "Pick a scene"}</button>
    </div>
  );
};
