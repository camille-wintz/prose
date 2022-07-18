import { Plot } from "@/Components/StoryGrid/Interfaces/Plot";
import styles from "@/Components/StoryGrid/Components/PlotsNav.module.scss";
import { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useClickAway } from "react-use";

export const PlotsNav = ({
  plots,
  selectedPlot,
  onChange,
}: {
  plots: Plot[];
  selectedPlot: Plot;
  onChange: (v: Plot) => void;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useClickAway(container, () => setTimeout(() => setOpened(false), 100));

  return (
    <nav className={styles.container} ref={container}>
      <button
        className={`${styles.trigger} ${opened ? styles.opened : ""}`}
        onClick={() => setOpened(!opened)}
      >
        <MdOutlineKeyboardArrowDown
          className={`transition-all mr-2 ${
            opened ? "text-pink scale-y-100" : "text-content-1 -scale-y-100"
          }`}
        />
        {selectedPlot.name}
      </button>
      <section className={`${styles.list} ${opened ? styles.opened : ""}`}>
        {plots.map((plot) => (
          <button
            onClick={() => {
              onChange(plot);
              setOpened(false);
            }}
          >
            {plot.name}
          </button>
        ))}
      </section>
    </nav>
  );
};
