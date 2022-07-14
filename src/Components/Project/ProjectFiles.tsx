import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { useProject } from "../../Hooks/useProject";
import { useProjectFiles } from "../../Hooks/useProjectFiles";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Modal } from "../Modal";
import { NavHeader, NavLink, Add } from "./NavComponents";

export const ProjectFiles = ({ className }: { className?: string }) => {
  const client = useQueryClient();
  const [showAddProjectFile, setShowAddProjectFile] = useState(false);
  const { projectFiles, addProjectFile } = useProjectFiles();
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
    if (!result.destination || !projectFiles || !main) {
      return;
    }

    const items = reorder(
      projectFiles.map((f) => f.path),
      result.source.index,
      result.destination.index
    );

    client.setQueryData<{ path: string; saved: boolean }[]>(
      ["getProjectFiles", root],
      items
        .map(
          (i) =>
            projectFiles.find((pf) => pf.path === i) as {
              path: string;
              saved: boolean;
            }
        )
        .filter((i) => i !== undefined)
    );

    saveMain({
      ...main,
      projectFiles: items,
    });
  };

  if (!projectFiles) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col"
            >
              {projectFiles.map((c, i) => (
                <Draggable key={c.path} draggableId={c.path} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={`w-full flex items-center py-2 navLine group`}
                    >
                      <div
                        className={`rounded-full h-1.5 w-1.5 ${
                          c.saved ? "bg-grey-3" : "bg-pink"
                        } mr-4`}
                      />
                      <NavLink
                        className="mr-6"
                        onClick={() => openFile("/" + c)}
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
        onClick={() => {
          setTitle("");
          setShowAddProjectFile(true);
        }}
        className="pt-2"
      ></Add>
      <Modal title="New file" show={showAddProjectFile}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowAddProjectFile(false);
            addProjectFile(title);
          }}
        >
          <Input
            label="Name"
            value={title}
            type="text"
            onTextChange={(value) => setTitle(value)}
          />
          <div className="flex gap-4 justify-center mt-6">
            <Button
              type="button"
              theme="minor"
              className="mt-6 w-1/2"
              onClick={() => setShowAddProjectFile(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowAddProjectFile(false);
                addProjectFile(title);
              }}
              className="mt-6 w-1/2"
              disabled={!title}
            >
              Add file
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
