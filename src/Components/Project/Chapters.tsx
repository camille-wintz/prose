import { useChapters } from "../../Hooks/useChapters";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { NavLink } from "./NavComponents";
import styles from "./Nav.module.scss";
import { ChaptersManager } from "@/Components/ChaptersManager/ChaptersManager";

export const Chapters = () => {
  const { chapters } = useChapters();
  const { openFile } = useCurrentFile();

  if (!chapters) {
    return null;
  }

  return (
    <>
      <h2>
        <span>Chapters</span>
        <ChaptersManager />
      </h2>
      <div className={styles.files}>
        <div>
          {chapters.map((c, i) => (
            <div className={`w-full flex py-2 items-center group first:pt-0`}>
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
          ))}
        </div>
      </div>
    </>
  );
};
