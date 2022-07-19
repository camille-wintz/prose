import { ChaptersList } from "@/Components/ChaptersManager/ChaptersList";
import { NewChapter } from "@/Components/ChaptersManager/NewChapter";
import { Modal, ModalButtons } from "@/Components/Common/Modal";
import { Button } from "@/Components/Form/Button";
import { useChapters } from "@/Hooks/useChapters";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiSettings } from "react-icons/fi";

export const ChaptersManager = () => {
  const [view, setView] = useState<"list" | "new">("list");
  const [visible, setVisible] = useState(false);
  const { chapters } = useChapters();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current === null) {
      return;
    }

    if (view === "list") {
      container.current.style.height = window.innerHeight - 200 + "px";
    } else {
      container.current.style.height =
        ((container.current.firstChild as HTMLDivElement)?.offsetHeight || 0) +
        "px";
    }
  }, [view]);

  if (!chapters) return null;

  return (
    <>
      <FiSettings
        onClick={() => {
          setVisible(true);
          setView("list");
        }}
      />
      <Modal show={visible} onDismiss={() => setVisible(false)}>
        <div
          ref={container}
          className="flex flex-col transition-all"
          style={{ height: window.innerHeight - 200 + "px" }}
        >
          {view === "list" && <ChaptersList />}
          {view === "new" && (
            <NewChapter
              onBack={() => setView("list")}
              onChapterCreated={() => setVisible(false)}
            />
          )}
          {view === "list" && (
            <ModalButtons>
              <Button onClick={() => setView("new")}>
                <FiPlus />
                New chapter
              </Button>
            </ModalButtons>
          )}
        </div>
      </Modal>
    </>
  );
};
