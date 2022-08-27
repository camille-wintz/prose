import { Plot } from "@/components/story-grid/interfaces/plot";
import styles from "@/components/story-grid/components/plots-nav.module.scss";
import { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "@react-hookz/web";
import { Modal, ModalButtons } from "@/components/common/modal";
import { Input } from "@/components/form/input";
import { Button } from "@/components/form/button";
import { FiPlus } from "react-icons/fi";

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
      <Modal show={showAddSubplot} onDismiss={() => setShowAddSubplot(false)}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowAddSubplot(false);
            onAddPlot(title);
            onChange(title);
          }}
        >
          <div className="p-8">
            <Input
              label="Title"
              value={title}
              type="text"
              onTextChange={(value) => setTitle(value)}
            />
          </div>

          <ModalButtons>
            <Button
              type="button"
              onClick={() => {
                setTitle("");
                setShowAddSubplot(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title}>
              <FiPlus />
              Add subplot
            </Button>
          </ModalButtons>
        </form>
      </Modal>
    </>
  );
};
