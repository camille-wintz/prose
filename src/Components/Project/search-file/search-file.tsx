import { useChapters } from "@/hooks/chapters";
import { useCurrentFile } from "@/hooks/current-file";
import { useProjectFiles } from "@/hooks/project-files";
import { useClickOutside } from "@react-hookz/web";
import { useRef } from "react";
import { useState } from "react";
import styles from "./search-file.module.scss";

export const SearchFile = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { openFile } = useCurrentFile();
  const [search, setSearch] = useState("");
  const { projectFiles } = useProjectFiles();
  const { chapters } = useChapters();

  useClickOutside(container, onDismiss);

  return (
    <nav
      ref={container}
      className={`${styles.container} ${visible ? styles.visible : ""}`}
    >
      <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>Chapters</h3>
      {chapters
        ?.filter((c) => c.path.toLowerCase().includes(search.toLowerCase()))
        .map((c) => (
          <button
            onClick={() => {
              openFile("/chapters/" + c.path);
              onDismiss();
            }}
          >
            {c.path.replace("/", "").replace(".md", "")}
          </button>
        ))}
      <h3>Files</h3>
      {projectFiles
        ?.filter((c) => c.path.toLowerCase().includes(search.toLowerCase()))
        .map((c) => (
          <button
            onClick={() => {
              openFile("/" + c.path);
              onDismiss();
            }}
          >
            {c.path.replace("/", "").replace(".md", "")}
          </button>
        ))}
    </nav>
  );
};
