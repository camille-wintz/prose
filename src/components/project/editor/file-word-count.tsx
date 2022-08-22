import { useCurrentFile } from "@/hooks/current-file";
import styles from "@/components/project/editor/file-word-count.module.scss";

export const FileWordCount = () => {
  const { current } = useCurrentFile();

  return (
    <div className={styles.container}>
      {current && current.content?.split(" ").length} words
    </div>
  );
};
