import { Act } from "@/components/project/story-grid/interfaces/act";
import styles from "@/components/project/story-grid/components/acts-nav.module.scss";
import { useRef } from "react";
import { useEffect } from "react";

const toRoman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export const ActsNav = ({
  actIndex,
  acts,
  onChange,
}: {
  actIndex: number;
  acts: Act[];
  onChange: (i: number) => void;
}) => {
  const refs = acts.map(() => useRef<HTMLButtonElement>(null));
  const tracker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tracker.current) {
      return;
    }

    tracker.current.style.left = `${refs[actIndex].current?.offsetLeft || 0}px`;
    tracker.current.style.width = `${
      refs[actIndex].current?.offsetWidth || 0
    }px`;
  }, [actIndex]);

  return (
    <nav className={styles.actsNav}>
      {acts.map((a, i) => (
        <button
          key={i}
          ref={refs[i]}
          onClick={() => onChange(i)}
          className={i === actIndex ? "text-pink " : "text-purple"}
        >
          Act {toRoman[i]}
        </button>
      ))}
      <div ref={tracker} className={styles.tracker} />
    </nav>
  );
};
