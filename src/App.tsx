import { useEffect, useState } from "react";
import { OpenProject } from "./Components/Project/OpenProject";
import { Project } from "./Components/Project/Project";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "react-query";
import { CurrentFileContext } from "./Hooks/useCurrentFile";
import { useProject } from "@/Hooks/useProject";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const AppRoot = () => {
  const client = useQueryClient();
  const { root, pickFolder } = useProject();

  useEffect(() => {
    const unbindClose = Electron.filesystem.onClose(() =>
      client.setQueryData("getRoot", "")
    );

    const unbindOpen = Electron.filesystem.onOpenNovel((path) => {
      client.setQueryData("getRoot", path);
      localStorage.setItem("LastOpened", path);
    });

    return () => {
      unbindClose();
      unbindOpen();
    };
  });

  return (
    <div
      className={`flex h-screen w-screen ${
        root ? "items-start" : "items-center"
      } justify-center`}
    >
      {!root ? <OpenProject /> : <Project />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRoot />
    </QueryClientProvider>
  );
}

export default App;
