const { app, BrowserWindow } = require("electron");
const path = require("path");

const { files } = require("./ipc/files");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "default",
    titleBarOverlay: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: __dirname + "/assets/icons/appIcon.png",
    backgroundColor: "#F8F8F8",
  });

  if (process.platform === "darwin") {
    app.dock.setIcon(path.join(__dirname, "assets/icons/appIcon.png"));
  }

  files(mainWindow);

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
