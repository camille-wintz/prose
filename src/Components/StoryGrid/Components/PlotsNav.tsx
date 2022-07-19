import { Plot } from "@/Components/StoryGrid/Interfaces/Plot";
import styles from "@/Components/StoryGrid/Components/PlotsNav.module.scss";
import { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "@react-hookz/web";
import { Modal } from "@/Components/Common/Modal";
import { Input } from "@/Components/Form/Input";
import { Button } from "@/Components/Form/Button";

export const PlotsNav = ({
  plots,
  selectedPlot,
  onChange,
  onAddPlot,
}: {
  plots: Plot[];
  selectedPlot?: Plot;
  onChange: (v: string) => void;
  onAddPlot: (v: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [showAddSubplot, setShowAddSubplot] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useClickOutside(container, () => setTimeout(() => setOpened(false), 100));

  return (
    <>
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
          {selectedPlot?.name || "Select a plot"}
        </button>
        <section className={`${styles.list} ${opened ? styles.opened : ""}`}>
          {plots.map((plot) => (
            <button
              key={plot.name}
              onClick={() => {
                onChange(plot.name);
                setOpened(false);
              }}
            >
              {plot.name}
            </button>
          ))}
          <button
            onClick={() => {
              setShowAddSubplot(true);
              setOpened(false);
            }}
          >
            Add subplot
          </button>
        </section>
      </nav>
      <Modal
        title="New subplot"
        show={showAddSubplot}
        onDismiss={() => setShowAddSubplot(false)}
      >
        <Input
          label="Title"
          value={title}
          type="text"
          onTextChange={(value) => setTitle(value)}
        />
        <div className="flex gap-4 justify-center mt-6">
          <Button
            type="button"
            theme="minor"
            className="mt-6 w-1/2"
            onClick={() => {
              setTitle("");
              setShowAddSubplot(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowAddSubplot(false);
              onAddPlot(title);
            }}
            className="mt-6 w-1/2"
            disabled={!title}
          >
            Add subplot
          </Button>
        </div>
      </Modal>
    </>
  );
};
