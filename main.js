const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const { files } = require("./ipc/files");
const { novelMenu } = require("./menu/novel");

const isMac = process.platform === "darwin";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
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

  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            subMenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    novelMenu(mainWindow),
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
