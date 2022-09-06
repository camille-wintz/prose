const fs = require("mz/fs");
const { dialog, ipcMain } = require("electron");

const files = (mainWindow) => {
  ipcMain.handle("filesystem:showFolderDialog", async (event, title) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory", "createDirectory"],
      title,
    });

    return result.canceled ? undefined : result.filePaths[0];
  });

  ipcMain.handle("filesystem:readDirectory", async (event, path) => {
    try {
      const files = await fs.readdir(path, { withFileTypes: true });
      return files
        .filter((item) => !item.isDirectory() && item.name !== ".DS_Store")
        .map((item) => item.name);
    } catch (e) {
      return { error: e.message };
    }
  });

  ipcMain.handle("filesystem:createDirectory", async (event, path) => {
    fs.mkdirSync(path);
    return [];
  });

  ipcMain.handle("filesystem:writeFile", async (event, path, content) => {
    return await fs.writeFile(path, content);
  });

  ipcMain.handle("filesystem:deleteFile", async (event, path) => {
    return await fs.rm(path);
  });

  ipcMain.handle("filesystem:rename", async (event, path, name) => {
    return await fs.rename(path, name);
  });

  ipcMain.handle("filesystem:readFile", async (event, path) => {
    const result = await fs.readFile(path);
    return result.toString();
  });
};

module.exports = { files };
