import styles from "@/components/story-grid/components/timeline.module.scss";
import { Act } from "@/components/story-grid/interfaces/act";
import { TimelinePoint } from "@/components/story-grid/components/timeline-point";
import GridLink1 from "@/assets/grid-link-1.svg";
import GridLink2 from "@/assets/grid-link-2.svg";
import GridLink3 from "@/assets/grid-link-3.svg";

export const Timeline = ({
  act,
  onChange,
}: {
  act: Act;
  onChange: (a: Act) => void;
}) => {
  const images = [GridLink1, GridLink2, GridLink3];

  return (
    <div className={styles.timeline}>
      <div>
        {act.points.map((p, i) => (
          <>
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
          </>
        ))}
        <img src={GridLink1} className="" />
        <img src={GridLink2} className="" />
        <img src={GridLink3} className="absolute left-[-50px] top-[213px]" />
        <div className="absolute rounded-full bg-darkPurple h-20 w-20 top-[-35px] left-[-79px]"></div>
        <div className="absolute rounded-full bg-purple h-32 w-32 right-[-60px] top-[86px]"></div>
        <div className="absolute rounded-full bg-pink h-16 w-16 top-[167px] left-[-45px]"></div>
        <div className="absolute rounded-full bg-text h-12 w-12 top-[415px] left-[257px]"></div>
      </div>
    </div>
  );
};
