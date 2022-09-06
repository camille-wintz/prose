const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("Electron", {
  filesystem: {
    showFolderDialog: async (title) => {
      return await ipcRenderer.invoke("filesystem:showFolderDialog", title);
    },
    readDirectory: async (directory) => {
      return await ipcRenderer.invoke("filesystem:readDirectory", directory);
    },
    createDirectory: async (directory) => {
      return await ipcRenderer.invoke("filesystem:createDirectory", directory);
    },
    readFile: async (path) => {
      return await ipcRenderer.invoke("filesystem:readFile", path);
    },
    writeFile: async (path, content) => {
      return await ipcRenderer.invoke("filesystem:writeFile", path, content);
    },
    deleteFile: async (path) => {
      return await ipcRenderer.invoke("filesystem:deleteFile", path);
    },
    rename: async (path, name) => {
      return await ipcRenderer.invoke("filesystem:rename", path, name);
    },
    onClose: (cb) => {
      ipcRenderer.on("filesystem:onClose", cb);

      return () => ipcRenderer.removeListener("filesystem:onClose", cb);
    },
    onOpenNovel: (cb) => {
      ipcRenderer.on("filesystem:onOpenNovel", cb);

      return () => ipcRenderer.removeListener("filesystem:onOpenNovel", cb);
    },
  },
});
