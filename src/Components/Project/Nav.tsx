import React, { ReactNode, useState } from "react";
import { FaBars, FaDAndD, FaList, FaPlusCircle } from "react-icons/fa";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useChapters } from "../../Hooks/useChapters";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Modal } from "../Modal";
import { Divider, Subtitle, Title } from "../Typography";
import { useProject } from "../../Hooks/useProject";

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
      className={`hover:text-white transition-all flex ${className}`}
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
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center mb-2 text-label hover:text-white transition-all ${className}`}
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
  const { openFile, currentFile } = useCurrentFile();
  const { main, saveMain, root } = useProject();

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !chapters) {
      return;
    }

    const items = reorder(
      chapters,
      result.source.index,
      result.destination.index
    );

    saveMain({
      ...main,
      chapters: items,
    });
  };

  if (!chapters) {
    return null;
  }

  return (
    <>
      <div className={`flex flex-col ${className}`}>
        <Title className="text-3xl mb-2">Storms over Daggers</Title>
        <Subtitle className="text-xl">word count</Subtitle>
        <Divider className="bright-orange-to-blue" />
        <NavHeader className="">Chapters</NavHeader>
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {chapters.map((c, i) => (
                  <Draggable key={c} draggableId={c} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        className={`w-full flex items-center py-2 ${
                          className?.indexOf("items-center") !== -1
                            ? "justify-center"
                            : ""
                        }`}
                      >
                        <FaBars
                          className={
                            currentFile?.path === root + "/chapters/" + c
                              ? "text-label mr-2 text-brightBlue"
                              : "text-label mr-2"
                          }
                        />
                        <NavLink
                          className={
                            currentFile?.path === root + "/chapters/" + c
                              ? "text-white"
                              : "text-label"
                          }
                          key={c}
                          onClick={() => openFile("/chapters/" + c)}
                        >
                          {c.split(".md")[0]}
                        </NavLink>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Add onClick={() => setShowAddChapter(true)} className="pt-2">
          Add chapter
        </Add>
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
