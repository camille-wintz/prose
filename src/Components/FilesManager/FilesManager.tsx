import { Modal, ModalButtons } from "@/Components/Common/Modal";
import { FilesList } from "@/Components/FilesManager/FilesList";
import { NewFile } from "@/Components/FilesManager/NewFile";
import { Button } from "@/Components/Form/Button";
import { useEffect, useRef, useState } from "react";
import { FiPlus, FiSettings } from "react-icons/fi";

export const FilesManager = () => {
  const [visible, setVisible] = useState(false);
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
          {view === "list" && <FilesList />}
          {view === "new" && (
            <NewFile
              onBack={() => setView("list")}
              onFileAdded={() => setVisible(false)}
            />
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
