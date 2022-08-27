import { useEffect } from "react";
import { OpenProject } from "./components/project/open-project";
import { Project } from "./components/project/project";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { useProject } from "@/hooks/project";
import { PlantsImage } from "@/components/common/plants-image";

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

    const unbindOpen = Electron.filesystem.onOpenNovel((e, path) => {
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
      <PlantsImage />
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
