import { Divider, Subtitle, Title } from "../Typography";
import { useProject } from "../../Hooks/useProject";
import { Chapters } from "./Chapters";
import { ProjectFiles } from "./ProjectFiles";
import { useEffect, useState } from "react";
import { FiLayout } from "react-icons/fi";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { NavLink } from "./NavComponents";

export const Nav = ({ className }: { className?: string }) => {
  const { openFile } = useCurrentFile();
  const { main } = useProject();

  return (
    <>
      <div
        className={`p-6 w-[290px] h-screen items-center transition-all z-20 justify-center items-stretch flex flex-col bg-grey-2`}
      >
        <Title
          className={`text-2xl mb-1 text-grey-6 ${
            className === "items-center" ? "text-center" : ""
          }`}
        >
          Storms over Daggers
        </Title>
        <Subtitle className="text-white text-md font-light text-grey-4">
          {(main?.wordCount || 0) > 1000
            ? Math.round((main?.wordCount || 0) / 1000) + "k"
            : main?.wordCount}{" "}
          words
        </Subtitle>
        <div className="grow flex flex-col mt-2">
          <h2 className="text-grey-6 text-sm uppercase my-4 font-bold">
            Chapters
          </h2>
          <div className="relative grow border-y-[3px] border-solid">
            <div
              className={`flex flex-col items-start overflow-auto w-full h-full absolute py-4`}
            >
              <Chapters className={className} />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-grey-6 text-sm uppercase my-4 font-bold">
            Story
          </h2>
          <NavLink onClick={() => openFile("/Story Grid.storygrid")}>
            <FiLayout className="text-grey-4 mr-2" />
            Story Grid
          </NavLink>
        </div>
        <div className="grow flex flex-col mt-2">
          <h2 className="text-grey-6 text-sm uppercase my-4 font-bold">
            Files
          </h2>
          <div className="relative grow border-y-[3px] border-solid">
            <div
              className={`flex flex-col items-start overflow-auto w-full h-full absolute py-4`}
            >
              <ProjectFiles className={className} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
