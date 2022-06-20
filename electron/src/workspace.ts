import { BrowserWindow } from "electron";
import { WorkspaceFile } from "types/src/workspaceTypes";
import fs from "fs";
import path from "path";

import {ACCEPTED_FILES_FORMATES} from "./constants";

const addToast = (mainWindow: BrowserWindow, msg: string, appearance: "success" | "error") => {
    mainWindow.webContents.send('toast', {msg, appearance});
  }

  const formatSize = (size : number) => {
    var i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      ((size / Math.pow(1024, i)) * 1).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    )
  }

  export const getFiles = (currPath: string)  => {
    return fs.readdirSync(currPath).map(file => {
      const stats = fs.statSync(path.join(currPath, file))
      return {
          name: file,
          size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
          directory: stats.isDirectory(),
          path: currPath + "/" + file,
      }
  }).sort((a : WorkspaceFile, b : WorkspaceFile) => {
      if (a.directory === b.directory) {
          return a.name.localeCompare(b.name)
        }
        return a.directory ? -1 : 1
  })
}


 export const loadWorkspaceFiles = async (mainWindow: BrowserWindow, currPath: string) => {
    let files;
    try{
        files = await getFiles(currPath);
        const onlyAcceptedFiles = files.filter( (fn) => ACCEPTED_FILES_FORMATES.some(item => fn.name.includes(item)) || fn.directory);
        mainWindow.webContents.send('listenToWorkspaceFiles', onlyAcceptedFiles);
    }catch (e) {
        addToast(mainWindow, "No file found in the workspace.", "error");
        return []
      }
}
