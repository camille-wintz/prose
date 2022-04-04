interface INeutralino {
  os: {
    showOpenDialog: (
      label: string,
      conf?: {
        filters: { name: string; extensions: string[] }[];
      }
    ) => Promise<string[]>;
    showFolderDialog: (title: string) => Promise<string>;
  };
  filesystem: {
    readDirectory: (path: string) => Promise<{ entry: string; type: string }[]>;
    createDirectory: (path: string) => Promise<void>;
    writeFile: (path: string, content: string) => Promise<void>;
    readFile: (path: string) => Promise<string>;
  };
  clipboard: {
    readText: () => Promise<string>;
    writeText: (text: string) => Promise<void>;
  };
}

declare const Neutralino: INeutralino;
