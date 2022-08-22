import { ChaptersList } from "@/components/project/chapters-manager/list";
import { NewChapter } from "@/components/project/chapters-manager/new-chapter";
import { Modal, ModalButtons } from "@/components/common/modal";
import { Button } from "@/components/form/button";
import { useChapters } from "@/hooks/chapters";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

export const ChaptersManager = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const [view, setView] = useState<"list" | "new">("list");
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
      <Modal show={visible} onDismiss={onDismiss}>
        <div
          ref={container}
          className="flex flex-col transition-all"
          style={{ height: window.innerHeight - 200 + "px" }}
        >
          {view === "list" && <ChaptersList />}
          {view === "new" && (
            <NewChapter
              onBack={() => setView("list")}
              onChapterCreated={onDismiss}
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
