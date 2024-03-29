import { DotsMenu } from "@/components/common/dots-menu";
import { useChapters } from "@/hooks/chapters";
import { useProject } from "@/hooks/project";
import { ProjectFile } from "@/interfaces/project-file";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FiMoreVertical } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import { useQueryClient } from "react-query";

export const ChaptersList = ({
  onOpenView,
}: {
  onOpenView: (view: "list" | "new" | "rename", chapter?: ProjectFile) => void;
}) => {
  const client = useQueryClient();
  const { chapters, deleteChapter, renameChapter } = useChapters();
  const { main, saveMain, root } = useProject();

  const reorder = (
    list: ProjectFile[],
    startIndex: number,
    endIndex: number
  ) => {
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

    client.setQueryData<ProjectFile[]>(["getChapters", root], items);

    saveMain({
      ...main,
      chapters: items.map((i) => i.path),
    });
  };

  if (!chapters) return null;

  return (
    <div className="grow overflow-auto relative">
      <div className="absolute py-4 w-full">
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {chapters.map((c, i) => (
                  <Draggable key={c.path} draggableId={c.path} index={i}>
                    {(provided) => (
                      <div
                        className="px-4 py-2 flex items-center w-full"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        <TbGripVertical className="text-pink hover:text-text mr-2 h-6 w-6 cursor-move" />
                        <div className="flex flex-col mr-auto">
                          <h3>{c.path.split(".md")[0]}</h3>
                          <p className="text-purple text-sm">
                            {c.content?.split(" ").length} words
                          </p>
                        </div>
                        <DotsMenu>
                          <DotsMenu.Item onClick={() => deleteChapter(c)}>
                            Delete
                          </DotsMenu.Item>
                          <DotsMenu.Item
                            onClick={() => onOpenView("rename", c)}
                          >
                            Rename
                          </DotsMenu.Item>
                        </DotsMenu>
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
