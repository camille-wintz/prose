import { Act } from "@/Components/StoryGrid/Interfaces/Act";
import styles from "@/Components/StoryGrid/Components/ActsNav.module.scss";

const toRoman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export const ActsNav = ({
  acts,
  onChange,
}: {
  acts: Act[];
  onChange: (a: Act) => void;
}) => {
  return (
    <nav className={styles.actsNav}>
      {acts.map((a, i) => (
        <button onClick={() => onChange(a)}>Act {toRoman[i]}</button>
      ))}
    </nav>
  );
};
