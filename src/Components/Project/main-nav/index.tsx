import { ChaptersManager } from "@/components/project/chapters-manager";
import { FilesManager } from "@/components/project/files-manager/manager";
import { SearchFile } from "@/components/project/search-file/search-file";
import { useCurrentFile } from "@/hooks/current-file";
import { useContext, useState } from "react";
import styles from "@/components/project/main-nav/main-nav.module.scss";
import { useKeyboardEvent } from "@react-hookz/web";
import { NovelManager } from "@/components/project/novel-manager";
import { SearchContext } from "@/components/project/context";

export const MainNav = () => {
  const { showSearch, setShowSearch } = useContext(SearchContext);
  const [showChaptersManager, setShowChaptersManager] = useState(false);
  const [showFilesManager, setShowFilesManager] = useState(false);
  const [showNovelManager, setShowNovelManager] = useState(false);

  const { openFile } = useCurrentFile();

  useKeyboardEvent(true, (e) => {
    if (e.key === "p" && (e.ctrlKey || e.metaKey)) {
      setShowSearch(!showSearch);
    }
    if (e.key === "t" && (e.ctrlKey || e.metaKey)) {
      setShowChaptersManager(true);
    }
    if (e.key === "u" && (e.ctrlKey || e.metaKey)) {
      setShowFilesManager(true);
    }
    if (e.key === "g" && (e.ctrlKey || e.metaKey)) {
      openFile("/Story Grid.storygrid");
    }
    if (e.key === "n" && (e.ctrlKey || e.metaKey)) {
      setShowNovelManager(!showNovelManager);
    }
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      openFile("/Statistics.storystats");
    }
  });

  return (
    <>
      <SearchFile visible={showSearch} onDismiss={() => setShowSearch(false)} />
      <div className={styles.container}>
        <button onClick={() => setShowSearch(true)}>
          Open <span className="text-purple">⌘P</span>
        </button>
        <button onClick={() => setShowChaptersManager(true)}>
          Chapters <span className="text-purple">⌘T</span>
        </button>
        <button onClick={() => setShowFilesManager(true)}>
          Files <span className="text-purple">⌘U</span>
        </button>
        <button onClick={() => openFile("/Story Grid.storygrid")}>
          Grid <span className="text-purple">⌘G</span>
        </button>
        <button onClick={() => openFile("/Statistics.storystats")}>
          Stats <span className="text-purple">⌘K</span>
        </button>
        <button onClick={() => setShowNovelManager(!showNovelManager)}>
          Novel <span className="text-purple">⌘N</span>
        </button>
      </div>
      <NovelManager
        visible={showNovelManager}
        onDismiss={() => setShowNovelManager(false)}
      />
      <ChaptersManager
        visible={showChaptersManager}
        onDismiss={() => setShowChaptersManager(false)}
      />
      <FilesManager
        visible={showFilesManager}
        onDismiss={() => setShowFilesManager(false)}
      />
    </>
  );
};
