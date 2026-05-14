const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  openFile: (filters) => ipcRenderer.invoke('dialog:openFile', filters),
  analyzeGame: (folderPath) => ipcRenderer.invoke('game:analyze', folderPath),
  getMods: (folderPath) => ipcRenderer.invoke('game:getMods', folderPath),
  getSingleModInfo: (filePath) => ipcRenderer.invoke('game:getSingleModInfo', filePath),
  openExternal: (url) => ipcRenderer.invoke('game:openExternal', url),
  fetchModInfo: (modId) => ipcRenderer.invoke('game:fetchModInfo', modId),
  toggleMod: (folderPath, modId, enabled, modFileName) => ipcRenderer.invoke('game:toggleMod', folderPath, modId, enabled, modFileName),
  installMod: (folderPath, sourcePath) => ipcRenderer.invoke('game:installMod', folderPath, sourcePath),
  deleteMod: (folderPath, modFileName) => ipcRenderer.invoke('game:deleteMod', folderPath, modFileName),
  launchGame: (folderPath) => ipcRenderer.invoke('game:launch', folderPath),
  browseCatalog: (page, query) => ipcRenderer.invoke('catalog:browse', page, query),
  downloadCatalogMod: (folderPath, downloadUrl, modId) => ipcRenderer.invoke('catalog:download', folderPath, downloadUrl, modId),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (e, pct) => callback(pct)),
  minimize: () => ipcRenderer.send('window:minimize'),
  close: () => ipcRenderer.send('window:close')
});
