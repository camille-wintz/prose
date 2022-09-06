import { ModalButtons } from "@/components/common/modal";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { useChapters } from "@/hooks/chapters";
import { ProjectFile } from "@/interfaces/project-file";
import { useState } from "react";

export const RenameChapter = ({
  onBack,
  onChapterEdited,
  chapter,
}: {
  onBack: () => void;
  onChapterEdited: () => void;
  chapter?: ProjectFile;
}) => {
  const { renameChapter } = useChapters();
  const [title, setTitle] = useState("");

  if (!chapter) return null;

  return (
    <form
      className="mt-auto"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChapterEdited();
        renameChapter(chapter, title);
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
          onClick={() => {
            setTitle("");
            onBack();
          }}
        >
          Cancel
        </Button>
        <Button disabled={!title} type="submit">
          Rename chapter
        </Button>
      </ModalButtons>
    </form>
  );
};
