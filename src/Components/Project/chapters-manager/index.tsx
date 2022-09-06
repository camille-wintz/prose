import { ChaptersList } from "@/components/project/chapters-manager/list";
import { NewChapter } from "@/components/project/chapters-manager/new-chapter";
import { Modal, ModalButtons } from "@/components/common/modal";
import { Button } from "@/components/form/button";
import { useChapters } from "@/hooks/chapters";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RenameChapter } from "@/components/project/chapters-manager/rename-chapter";
import { ProjectFile } from "@/interfaces/project-file";

export const ChaptersManager = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const [view, setView] = useState<"list" | "new" | "rename">("list");
  const { chapters } = useChapters();
  const container = useRef<HTMLDivElement>(null);
  const [editedChapter, setEditedChapter] = useState<ProjectFile | undefined>();

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

  useEffect(() => {
    setView("list");
  }, [visible]);

  if (!chapters) return null;

  return (
    <>
      <Modal show={visible} onDismiss={onDismiss}>
        <div
          ref={container}
          className="flex flex-col transition-all"
          style={{ height: window.innerHeight - 200 + "px" }}
        >
          {view === "list" && (
            <ChaptersList
              onOpenView={(v, c) => {
                setView(v);
                c && setEditedChapter(c);
              }}
            />
          )}
          {view === "new" && (
            <NewChapter
              onBack={() => setView("list")}
              onChapterCreated={onDismiss}
            />
          )}
          {view === "rename" && (
            <RenameChapter
              chapter={editedChapter}
              onBack={() => setView("list")}
              onChapterEdited={onDismiss}
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
