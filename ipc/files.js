const fs = require("mz/fs");
const { dialog, ipcMain } = require("electron");

const files = (mainWindow) => {
  ipcMain.handle("filesystem:showFolderDialog", async (event, title) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
      title,
    });

    return result.canceled ? undefined : result.filePaths[0];
  });

  ipcMain.handle("filesystem:readDirectory", async (event, path) => {
    const files = await fs.readdir(path, { withFileTypes: true });
    return files.filter((item) => !item.isDirectory()).map((item) => item.name);
  });

  ipcMain.handle("filesystem:createDirectory", async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });

    return result[0];
  });

  ipcMain.handle("filesystem:writeFile", async (event, path, content) => {
    return await fs.writeFile(path, content);
  });

  ipcMain.handle("filesystem:readFile", async (event, path) => {
    const result = await fs.readFile(path);
    return result.toString();
  });
};

module.exports = { files };
