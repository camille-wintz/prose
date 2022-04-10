const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("Electron", {
  filesystem: {
    showFolderDialog: async (title) => {
      return await ipcRenderer.invoke("filesystem:showFolderDialog", title);
    },
    readDirectory: async (directory) => {
      return await ipcRenderer.invoke("filesystem:readDirectory", directory);
    },
    readFile: async (path) => {
      return await ipcRenderer.invoke("filesystem:readFile", path);
    },
    writeFile: async (path, content) => {
      return await ipcRenderer.invoke("filesystem:writeFile", path, content);
    },
  },
});
