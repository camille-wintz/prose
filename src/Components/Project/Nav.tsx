import { Divider, Subtitle, Title } from "../Typography";
import { useProject } from "../../Hooks/useProject";
import { Chapters } from "./Chapters";
import { ProjectFiles } from "./ProjectFiles";
import { useEffect, useState } from "react";
import { FaAlignLeft, FaList } from "react-icons/fa";
import { useCurrentFile } from "../../Hooks/useCurrentFile";

export const Nav = ({ className }: { className?: string }) => {
  const { currentFile } = useCurrentFile();
  const [isOpen, setIsOpen] = useState(!currentFile);
  const { main } = useProject();

  useEffect(() => {
    if (currentFile) {
      setIsOpen(false);
    }
  }, [currentFile]);

  return (
    <div
      className={`transition-all absolute left-0 top-0 p-24 z-10 overflow-auto h-full w-full text-white ${
        isOpen
          ? "dark-blue-to-purple pointer-events-auto"
          : "bg-transparent pointer-events-none"
      }`}
    >
      <FaAlignLeft
        className={`h-8 w-8 top-8 left-8 fixed cursor-pointer pointer-events-auto ${
          isOpen ? "text-white" : "text-black"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`transition-all bg-black rounded-lg p-8 shadow-xl relative ${
          isOpen ? "opacity-100 mt-0" : "opacity-0 -mt-24"
        } h-full w-full justify-between flex`}
      >
        <div className={`flex flex-col items-start overflow-auto w-full`}>
          <div className="relative">
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
            <Divider className="bright-blue-to-purple" />
          </div>

          <Chapters className={className} />
        </div>
        <div className="flex flex-col items-end absolute right-8">
          <div>
            <Title
              className={`text-2xl ${
                className === "items-center" ? "text-center" : ""
              }`}
            >
              Tools
            </Title>
            <Divider className="bright-blue-to-purple" />
          </div>

          <ProjectFiles className={className} />
        </div>
      </div>
    </div>
  );
};
