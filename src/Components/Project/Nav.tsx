import { Divider, Subtitle, Title } from "../Typography";
import { useProject } from "../../Hooks/useProject";
import { Chapters } from "./Chapters";
import { ProjectFiles } from "./ProjectFiles";
import { useEffect, useState } from "react";
import { FaAlignLeft, FaList } from "react-icons/fa";
import { useCurrentFile } from "../../Hooks/useCurrentFile";

export const Nav = ({
  className,
  visible,
  onDismiss,
}: {
  className?: string;
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { currentFile } = useCurrentFile();
  const { main } = useProject();

  useEffect(() => {
    if (currentFile) {
      onDismiss();
    }
  }, [currentFile]);

  return (
    <>
      <div
        onClick={onDismiss}
        className={`transition-all fixed left-0 top-0 z-10 h-full w-full flex dark-blue-to-purple ${
          visible
            ? "opacity-80 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`py-40 px-40 w-full h-full items-center transition-all z-20  ${
          visible
            ? "opacity-100 top-0 pointer-events-auto"
            : "opacity-0 -top-64 pointer-events-none"
        } justify-center items-stretch flex flex-col fixed`}
      >
        <div>
          <Title
            className={`text-4xl text-yellow grow mb-1 ${
              className === "items-center" ? "text-center" : ""
            }`}
          >
            Storms over Daggers
          </Title>
          <Subtitle className="text-white text-xl mb-6">
            {(main?.wordCount || 0) > 1000
              ? Math.round((main?.wordCount || 0) / 1000) + "k"
              : main?.wordCount}{" "}
            words
          </Subtitle>
        </div>
        <div className="flex w-full overflow-auto">
          <div className="bg-black text-white grow rounded-lg p-8 shadow-xl relative overflow-auto mr-6">
            <div
              className={`flex flex-col items-start overflow-auto w-full h-full`}
            >
              <Chapters className={className} />
            </div>
          </div>
          <div className="bg-black text-white rounded-lg py-8 shadow-xl relative overflow-auto mr-6">
            <ProjectFiles className={className} />
          </div>
        </div>
      </div>
    </>
  );
};
