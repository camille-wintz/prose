import { isCustomText } from "../Editor/applyType";
import { useEditorCommands } from "../../Hooks/useEditorCommands";

export const FileNavigation = ({ className = "" }) => {
  const { commands } = useEditorCommands();

  const types = {
    signet: "bg-brightPurple",
    scene: "bg-brightOrange",
    todo: "bg-brightBlue",
  } as { [type: string]: string };

  const scrollToElement = (i: number) => {
    const editor = document.getElementById("current-file-editor");
    const ofType = editor?.querySelectorAll(
      Object.keys(types)
        .map((ty) => "." + ty)
        .join(",")
    );
    if (!ofType) {
      return;
    }

    ofType[i].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`flex flex-col justify-center gap-4 ${className}`}>
      {commands
        ?.filter(
          (c) =>
            !isCustomText(c) && c.type && Object.keys(types).includes(c.type)
        )
        .map((n, i) => {
          if (isCustomText(n) || !n.type) {
            return null;
          }
          const color = types[n.type];
          return (
            <div
              onClick={() => scrollToElement(i)}
              className={`cursor-pointer hover:bg-iconwhite transition-all h-4 w-4 rounded-full ${color}`}
            />
          );
        })}
    </div>
  );
};
