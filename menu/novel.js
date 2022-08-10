const { dialog } = require("electron");

const novelMenu = (mainWindow) => ({
  label: "Novel",
  submenu: [
    { label: "New" },
    {
      label: "Open",
      click: () => {
        dialog
          .showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
            title: "Open Novel Folder",
          })
          .then((result) => {
            if (result.canceled) {
              return;
            }

            mainWindow.webContents.send(
              "filesystem:onOpenNovel",
              result.filePaths[0]
            );
          });
      },
    },
    {
      label: "Close",
      click: () => {
        mainWindow.webContents.send("filesystem:onClose");
      },
    },
  ],
});

module.exports = { novelMenu };
