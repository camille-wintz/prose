interface IElectron {
  filesystem: {
    showFolderDialog: (title: string) => Promise<string>;
    readDirectory: (path: string) => Promise<string[]>;
    createDirectory: (path: string) => Promise<void>;
    writeFile: (path: string, content: string) => Promise<void>;
    deleteFile: (path: string) => Promise<void>;
    readFile: (path: string) => Promise<string>;
    onClose: (cb: () => void) => () => void;
    onOpenNovel: (cb: (path: string) => void) => () => void;
  };
  clipboard: {
    readText: () => Promise<string>;
    writeText: (text: string) => Promise<void>;
  };
}

declare const Electron: IElectron;
