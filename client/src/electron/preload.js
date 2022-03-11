const { contextBridge, ipcRenderer } = require("electron")

const API = {
  window: {
    close: () => ipcRenderer.send("app/close"),
    minimize: () => ipcRenderer.send("app/minimize"),
    resize: () => ipcRenderer.send("app/resize"),
  },
}

contextBridge.exposeInMainWorld("app", API)
