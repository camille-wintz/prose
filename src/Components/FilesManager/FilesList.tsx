import { useProject } from "@/Hooks/useProject";
import { useProjectFiles } from "@/Hooks/useProjectFiles";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FiMoreVertical } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import { useQueryClient } from "react-query";

export const FilesList = () => {
  const { projectFiles } = useProjectFiles();
  const { main, saveMain, root } = useProject();
  const client = useQueryClient();

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

  if (!projectFiles || !projectFiles.length)
    return (
      <div className="grow overflow-auto relative p-10 flex items-center justify-center">
        Manage your project notes and research
      </div>
    );

  return (
    <div className="grow overflow-auto relative">
      <div className="absolute py-4 w-full">
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col"
              >
                {projectFiles.map((file, i) => (
                  <Draggable key={file.path} draggableId={file.path} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        className="px-4 py-2 flex items-center w-full"
                      >
                        <TbGripVertical className="text-content-1 hover:text-pink mr-2 h-6 w-6 cursor-move" />
                        {file.path}
                        <FiMoreVertical className="text-pink h-6 w-6 ml-auto cursor-pointer hover:text-blue transition-all" />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
