import { ModalButtons } from "@/Components/Common/Modal";
import { Button } from "@/Components/Form/Button";
import { Input } from "@/Components/Form/Input";
import { useProjectFiles } from "@/Hooks/useProjectFiles";
import { useState } from "react";

export const NewFile = ({
  onFileAdded,
  onBack,
}: {
  onFileAdded: () => void;
  onBack: () => void;
}) => {
  const { addProjectFile } = useProjectFiles();
  const [title, setTitle] = useState("");

  return (
    <form
      className="mt-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onFileAdded();
        addProjectFile(title);
      }}
    >
      <div className="p-8">
        <Input
          label="Name"
          placeholder="File name"
          value={title}
          type="text"
          onTextChange={(value) => setTitle(value)}
        />
      </div>
      <ModalButtons>
        <Button type="button" theme="minor" onClick={() => onBack()}>
          Cancel
        </Button>
        <Button disabled={!title} type="submit">
          Add file
        </Button>
      </ModalButtons>
    </form>
  );
};
