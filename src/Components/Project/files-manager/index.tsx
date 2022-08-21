import { useCurrentFile } from "../../../hooks/current-file";
import { useProjectFiles } from "../../../hooks/project-files";
import { NavLink } from "../nav-components";
import styles from "./Nav.module.scss";
import { FilesManager } from "@/components/project/files-manager/manager";

export const ProjectFiles = () => {
  const { projectFiles } = useProjectFiles();
  const { openFile } = useCurrentFile();

  if (!projectFiles) {
    return null;
  }

  return (
    <>
      <h2>
        <span>Files</span>
        <FilesManager />
      </h2>
      <div className={styles.files}>
        <div>
          {projectFiles.length === 0 ? (
            <div>Keep all your notes in one place</div>
          ) : null}
          {projectFiles.map((file, i) => (
            <div className="w-full flex items-center py-2 navLine group">
              <div
                className={`rounded-full h-1.5 w-1.5 ${
                  file.saved ? "bg-grey-1" : "bg-pink"
                } mr-4`}
              />
              <NavLink
                className="mr-6"
                onClick={() => openFile("/" + file.path)}
              >
                {file.path.split(".md")[0]}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
