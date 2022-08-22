import { useChapters } from "@/hooks/chapters";
import { useCurrentFile } from "@/hooks/current-file";
import { useProjectFiles } from "@/hooks/project-files";
import { useClickOutside } from "@react-hookz/web";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./search-file.module.scss";

export const SearchFile = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const { openFile } = useCurrentFile();
  const [search, setSearch] = useState("");
  const { projectFiles } = useProjectFiles();
  const { chapters } = useChapters();

  useClickOutside(container, onDismiss);

  useEffect(() => {
    if (visible) {
      searchInput.current?.focus();
    }
  }, [visible]);

  return (
    <nav
      ref={container}
      className={`${styles.container} ${visible ? styles.visible : ""}`}
    >
      <input
        ref={searchInput}
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.results}>
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
      </div>
    </nav>
  );
};
