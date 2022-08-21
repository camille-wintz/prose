import { Modal, ModalButtons } from "@/components/common/Modal";
import { FilesList } from "@/components/project/files-manager/list";
import { NewFile } from "@/components/project/files-manager/new";
import { Button } from "@/components/form/button";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiSettings } from "react-icons/fi";

export const FilesManager = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const [view, setView] = useState<"list" | "new">("list");

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

  return (
    <>
      <Modal show={visible} onDismiss={onDismiss}>
        <div
          ref={container}
          className="flex flex-col transition-all"
          style={{ height: window.innerHeight - 200 + "px" }}
        >
          {view === "list" && <FilesList />}
          {view === "new" && (
            <NewFile onBack={() => setView("list")} onFileAdded={onDismiss} />
          )}
          {view === "list" ? (
            <ModalButtons>
              <Button onClick={() => setView("new")}>
                <FiPlus /> Add file
              </Button>
            </ModalButtons>
          ) : null}
        </div>
      </Modal>
    </>
  );
};
