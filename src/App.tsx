import { useState } from "react";
import { ProjectContext } from "./Hooks/useProject";
import { OpenProject } from "./Components/Project/OpenProject";
import { Project } from "./Components/Project/Project";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { CurrentFileContext } from "./Hooks/useCurrentFile";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const [currentFile, setCurrentFile] = useState<
    { path: string; content: string; wordCount: number } | undefined
  >(undefined);
  const [root, setRoot] = useState<string>("");

  return (
    <QueryClientProvider client={client}>
      <CurrentFileContext.Provider value={{ currentFile, setCurrentFile }}>
        <ProjectContext.Provider value={{ root, setRoot }}>
          <div
            className={`flex h-screen w-screen bg-dark text-white ${
              root ? "items-start" : "items-center"
            } justify-center`}
          >
            {!root ? <OpenProject /> : <Project />}
          </div>
        </ProjectContext.Provider>
      </CurrentFileContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
