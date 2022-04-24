import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaBars } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useChapters } from "../../Hooks/useChapters";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Modal } from "../Modal";
import { NavHeader, NavLink, Add } from "./NavComponents";

export const Chapters = ({ className }: { className?: string }) => {
  const client = useQueryClient();
  const [showAddChapter, setShowAddChapter] = useState(false);
  const { chapters, addChapter } = useChapters();
  const { openFile, currentFile } = useCurrentFile();
  const { main, saveMain, root } = useProject();
  const [title, setTitle] = useState("");

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !chapters || !main) {
      return;
    }

    const items = reorder(
      chapters,
      result.source.index,
      result.destination.index
    );

    client.setQueryData<string[]>(["getChapters", root], items);

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
                      className={`w-full flex items-center py-2 navLine`}
                    >
                      <FaBars
                        className={
                          currentFile?.path === root + "/chapters/" + c
                            ? "text-label mr-2 text-brightOrange"
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
      <Modal title="New chapter" show={showAddChapter}>
        <Input
          label="Title"
          value={title}
          type="text"
          onTextChange={(value) => setTitle(value)}
        />
        <div className="flex gap-4 justify-center mt-6">
          <Button
            type="button"
            theme="minor"
            className="mt-6 w-1/2"
            onClick={() => {
              setTitle("");
              setShowAddChapter(false);
            }}
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
