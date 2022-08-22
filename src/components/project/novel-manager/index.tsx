import { Modal, ModalButtons } from "@/components/common/modal";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { useProject } from "@/hooks/project";
import { useState } from "react";

export const NovelManager = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { main, saveMain } = useProject();
  const [title, setTitle] = useState(main?.title || "");

  if (!main) {
    return null;
  }

  return (
    <Modal show={visible} onDismiss={onDismiss}>
      <div className="p-8">
        <Input
          label="Title"
          placeholder="Title"
          value={title}
          onTextChange={(title) => setTitle(title)}
        />
      </div>
      <ModalButtons>
        <Button type="button" onClick={() => onDismiss()}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => {
            saveMain({ ...main, title });
            onDismiss();
          }}
        >
          Save
        </Button>
      </ModalButtons>
    </Modal>
  );
};
