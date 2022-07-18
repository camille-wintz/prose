import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import styles from "@/Components/StoryGrid/Components/ActsNav.module.scss";

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
  return (
    <nav className={styles.actsNav}>
      {acts.map((a, i) => (
        <button
          onClick={() => onChange(i)}
          className={
            i === actIndex ? "text-content-3 font-bold" : "text-content-1"
          }
        >
          Act {toRoman[i]}
        </button>
      ))}
    </nav>
  );
};
