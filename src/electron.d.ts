interface IElectron {
  filesystem: {
    showFolderDialog: (title: string) => Promise<string>;
    readDirectory: (path: string) => Promise<string[]>;
    createDirectory: (path: string) => Promise<void>;
    writeFile: (path: string, content: string) => Promise<void>;
    readFile: (path: string) => Promise<string>;
  };
  clipboard: {
    readText: () => Promise<string>;
    writeText: (text: string) => Promise<void>;
  };
}

declare const Electron: IElectron;
