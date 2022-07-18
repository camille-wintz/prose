import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useQueryClient } from "react-query";
import { Chapter, useChapters } from "../../Hooks/useChapters";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Modal } from "../Modal";
import { Add, NavLink } from "./NavComponents";

export const Chapters = ({ className }: { className?: string }) => {
  const client = useQueryClient();
  const [showAddChapter, setShowAddChapter] = useState(false);
  const { chapters, addChapter } = useChapters();
  const { openFile } = useCurrentFile();
  const { main, saveMain, root } = useProject();
  const [title, setTitle] = useState("");

  const reorder = (list: Chapter[], startIndex: number, endIndex: number) => {
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

    client.setQueryData<Chapter[]>(["getChapters", root], items);

    saveMain({
      ...main,
      chapters: items.map((i) => i.path),
    });
  };

  if (!chapters) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((c, i) => (
                <Draggable key={c.path} draggableId={c.path} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={`w-full flex py-2 items-center group first:pt-0`}
                    >
                      <div
                        className={`rounded-full h-1.5 w-1.5 ${
                          c.saved ? "bg-grey-1" : "bg-pink"
                        } mr-4`}
                      />
                      <NavLink
                        key={c.path}
                        onClick={() => openFile("/chapters/" + c.path)}
                      >
                        {c.path.split(".md")[0]}
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
      <Add
        onClick={() => setShowAddChapter(true)}
        className="pt-2 justify-center m-auto mt-6"
      ></Add>
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
