import {
  PlotPoint,
  plotPointContents,
  plotPointNames,
} from "@/components/story-grid/interfaces/plot-point";
import styles from "@/components/story-grid/components/timeline-point.module.scss";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@react-hookz/web";

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

  useEffect(() => {
    setContent(point.content);
  }, [point]);

  useClickOutside(container, () => {
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
        <p className={point.content ? "text-content-2" : "text-content-1"}>
          {point.content || plotPointContents[point.eventType]}
        </p>
      )}
      <button>{point.scene || "Pick a scene"}</button>
    </div>
  );
};
