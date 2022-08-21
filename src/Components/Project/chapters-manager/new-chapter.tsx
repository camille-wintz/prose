import { ModalButtons } from "@/components/common/Modal";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { useChapters } from "@/hooks/chapters";
import { useState } from "react";

export const NewChapter = ({
  onBack,
  onChapterCreated,
}: {
  onBack: () => void;
  onChapterCreated: () => void;
}) => {
  const { addChapter } = useChapters();
  const [title, setTitle] = useState("");

  return (
    <form
      className="mt-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChapterCreated();
        addChapter(title);
      }}
    >
      <div className="p-8">
        <Input
          placeholder="Chapter title"
          label="Title"
          value={title}
          type="text"
          onTextChange={(value) => setTitle(value)}
        />
      </div>
      <ModalButtons>
        <Button
          type="button"
          theme="minor"
          onClick={() => {
            setTitle("");
            onBack();
          }}
        >
          Cancel
        </Button>
        <Button disabled={!title} type="submit">
          Add chapter
        </Button>
      </ModalButtons>
    </form>
  );
};
