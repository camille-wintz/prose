import React, { ReactNode, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useChapters } from "../../Hooks/useChapters";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Modal } from "../Modal";
import { Divider, Subtitle, Title } from "../Typography";

export const NavLink = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-label mb-2 hover:text-white transition-all flex"
    >
      {children}
    </button>
  );
};

export const NavHeader = ({
  children,
  className = "mt-5",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h3 className={`text-white font-bold text-lg mb-2 ${className}`}>
    {children}
  </h3>
);

export const Add = ({
  children,
  onClick,
}: {
  onClick: () => void;
  children: ReactNode;
}) => (
  <div
    className="flex items-center mb-2 text-label hover:text-white transition-all"
    onClick={onClick}
  >
    <FaPlusCircle className="mr-2" />
    <button>{children}</button>
  </div>
);

export const Nav = ({ className }: { className?: string }) => {
  const [title, setTitle] = useState("");
  const [showAddChapter, setShowAddChapter] = useState(false);
  const { chapters, addChapter } = useChapters();
  const { openFile } = useCurrentFile();

  if (!chapters) {
    return null;
  }

  return (
    <>
      <div className={`flex flex-col ${className}`}>
        <Title className="text-3xl">book title</Title>
        <Subtitle className="text-xl">word count</Subtitle>
        <Divider className="bright-blue-to-purple" />
        <NavHeader className="">Chapters</NavHeader>
        {chapters.map((c) => (
          <NavLink
            className=""
            key={c}
            onClick={() => openFile("/chapters/" + c)}
          >
            {c.split(".md")[0]}
          </NavLink>
        ))}
        <Add onClick={() => setShowAddChapter(true)}>Add chapter</Add>
      </div>
      <Modal title="New chapter" show={showAddChapter}>
        <Input
          label="Title"
          value={title}
          type="text"
          onChange={(value) => setTitle(value)}
        />
        <div className="flex gap-4 justify-center mt-6">
          <Button
            type="button"
            theme="minor"
            className="mt-6 w-1/2"
            onClick={() => setShowAddChapter(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowAddChapter(false);
              addChapter(title);
            }}
            className="mt-6 w-1/2"
            disabled={!title}
          >
            Add chapter
          </Button>
        </div>
      </Modal>
    </>
  );
};
