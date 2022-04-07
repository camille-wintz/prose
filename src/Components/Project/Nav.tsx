import { Divider, Subtitle, Title } from "../Typography";
import { useProject } from "../../Hooks/useProject";
import { Chapters } from "./Chapters";
import { ProjectFiles } from "./ProjectFiles";

export const Nav = ({ className }: { className?: string }) => {
  const { main } = useProject();

  return (
    <div className={`${className} h-full overflow-auto py-12`}>
      <div className={`${className} flex flex-col`}>
        <Title
          className={`text-3xl mb-2 ${
            className === "items-center" ? "text-center" : ""
          }`}
        >
          Storms over Daggers
        </Title>
        <Subtitle className="text-xl">
          {(main?.wordCount || 0) > 1000
            ? Math.round((main?.wordCount || 0) / 1000) + "k"
            : main?.wordCount}{" "}
          words
        </Subtitle>
        <Divider className="bright-orange-to-blue" />
        <Chapters className={className} />
        <ProjectFiles className={className} />
      </div>
    </div>
  );
};
