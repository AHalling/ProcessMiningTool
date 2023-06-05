import path from "path";
import { app, BrowserWindow, Menu, ipcMain } from "electron";
import isDev from "electron-is-dev";

import init from "./init";

import { saveGraph, saveAsGraph, loadGraph, newGraph, getGraphFiles, loadSpecific, deleteGraph, loadLog, getSpecificModelFiles, loadSpecificModelId } from "./modelInteraction";
import {readAlgorithms} from "../src/algorithms";
import {loadWorkspaceFiles} from "./workspace";
import { State, isState } from "../../types/src/types";
import {isResult, isOptions} from "../../types/src/conformanceCheckingTypes";
import { APP_MODEL_PATH, PRELOAD_FILE_PATH, APP_ALGORITHM_PATH } from "./constants";
import { mineLog } from "./mining";
import { getStatistics } from "./statistics";
import {SelectFile} from "./fileManipulation";
import {isFileType, isFileResult} from "../../types/src/fileTypes";
import {computeAlignment} from "./ConformanceChecking/Alignment"

let globalMainWindow: BrowserWindow;
let globalState: State = {pages: "LandingPage", log:null, result: null, workspacePath:""};

const WINDOW_TITLE = "Process mining tool";

let autosaveInterval: NodeJS.Timeout;

function createWindow() {
  // Create the browser window.
  globalMainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "/icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity:false,
      allowRunningInsecureContent: true,
      preload: path.resolve(PRELOAD_FILE_PATH),
    }
  });

  if (isDev) globalMainWindow.webContents.openDevTools();

  globalMainWindow.maximize();
  
  globalMainWindow.loadURL(
    isDev
      ? "http://localhost:"+process.argv[2]
      : `file://${path.join(__dirname, "../build/electron/src/index.html")}`
  );
 
  ipcMain.on("state", (event: unknown, msg: unknown) => {
    if (isState(msg)) {
      globalState = msg;
      if (msg.pages === "LandingPage") {
        globalMainWindow.setTitle(WINDOW_TITLE);
      }
      if (msg.pages === "Canvas") {
        autosaveInterval = setInterval(() => {
          saveGraph(globalMainWindow);
        }, 1000 * 360); // Every five minutes
      } else {
        clearInterval(autosaveInterval);
      }
      setupMenu();
    } 
  });
  ipcMain.on('getGraphFiles', (event: unknown, msg: unknown)=> {
    const graphFns = getGraphFiles();
    globalMainWindow.webContents.send('graphFiles', graphFns);
  }) 

  ipcMain.on('load', (event: unknown, msg: unknown) => {
    if (typeof msg === "string") {
      loadSpecific(globalMainWindow, path.join(APP_MODEL_PATH, msg));
    }
  })


  ipcMain.on('loadLog', (event: unknown, msg: unknown) => {
    if (typeof msg === "string") {
      loadLog(globalMainWindow, path.join(msg));
    }
  })

  ipcMain.on('delete', (event: unknown, msg: unknown) => {
    if (typeof msg === "string") {
      deleteGraph(globalMainWindow, path.join(msg));
    }
  })

  ipcMain.on('newGraph', () => {
    newGraph(globalMainWindow, false);
  })

  ipcMain.on('loadWorkspaceFiles', (event: unknown, msg: unknown) => {
    if (typeof msg === "string"){
      loadWorkspaceFiles(globalMainWindow, path.join(msg));
    }
  })

  ipcMain.on('getAlgorithms', (event: unknown, msg: unknown) => {
    const algorithms = readAlgorithms(APP_ALGORITHM_PATH);
    globalMainWindow.webContents.send('algorithms', algorithms);
  });

  ipcMain.on('mineLog',(event: unknown, algpath: unknown, logPath: unknown, modelName: unknown) => {
    
    if (typeof algpath === "string" && typeof logPath === "string" && typeof modelName === "string") {
      const result = mineLog(globalMainWindow, algpath, logPath, modelName)
      globalMainWindow.webContents.send('miningResult', result);
    }
  } )

  ipcMain.on('getStatistics', (event: unknown, logPath: unknown) => {
    if (typeof logPath === "string"){
      const statistics = getStatistics(logPath);
      globalMainWindow.webContents.send('statisticsResult', statistics);
    }
  })
  
  ipcMain.on('getSpecificModelFiles', (event: unknown, logName: unknown) => {
    if (typeof logName === "string"){
      const files = getSpecificModelFiles(logName);
      globalMainWindow.webContents.send('specificModelFiles', files);
    }
  })

  ipcMain.on('loadSpecificModelId', (event: unknown, fn: unknown)  => {
    if (typeof fn === "string"){
      const modelId = loadSpecificModelId(fn);
      globalMainWindow.webContents.send('specificModelIdLoaded', modelId);
    }
  })

  ipcMain.on('alignmentGroupActivation', (event: unknown, group: unknown, color: unknown) => {
    if (typeof color === "string" && isResult(group)){
      globalMainWindow.webContents.send('alignmentGroupActivationResult', {group, color})
    }
  })

  ipcMain.on('selectFile', (event: unknown, type: unknown) => {
    if(isFileType(type)){
      const fileResult = SelectFile(globalMainWindow, type)
      globalMainWindow.webContents.send('selectedFile', fileResult)
    }
  })

  ipcMain.on('alignment', (event: unknown, Log: unknown, Model: unknown, Options: unknown) => {
    if (isFileResult(Log) && isFileResult(Model) && isOptions(Options)){
          computeAlignment(Log, Model, Options).then((alignment) => {
            globalMainWindow.webContents.send('alignmentResult', alignment)
          })
    }
  })

  ipcMain.on('setResult', (event: unknown, result: unknown) => {
    if (isResult(result)){
        globalMainWindow.webContents.send('newResults', result)
    }
  })
  ipcMain.on('openModal',(event: unknown, modal: unknown) =>{
    if(typeof modal === "string" )
      globalMainWindow.webContents.send('openModalResult', modal)
  })

  ipcMain.on('options', (event: unknown, options: unknown) => {
    if(isOptions(options))
      globalMainWindow.webContents.send('sendOptions', options)
  })
  
  init();
  setupMenu();
  globalMainWindow.setTitle(WINDOW_TITLE);
}

function setupMenu() {
  const applicationMenuTemplate = [
    {
      label: 'File',
      submenu: [
          { label: 'New',
            accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'Ctrl+N',
            enabled: globalState.pages === "Canvas" || globalState.pages === "LogPage",
            click: () => newGraph(globalMainWindow, true)
          },
          { 
            label: 'Open',
            accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
            enabled: globalState.pages === "Canvas" || globalState.pages === "LogPage",
            click: () => loadGraph(globalMainWindow)
          },
          { 
            label: 'Save',
            accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
            enabled: globalState.pages === "Canvas" || globalState.pages === "LogPage",
            click: () => saveGraph(globalMainWindow) 
          },
          { 
            label: 'Save As',
            accelerator: process.platform === 'darwin' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S',
            enabled: globalState.pages === "Canvas" || globalState.pages === "LogPage",
            click: () => saveAsGraph(globalMainWindow) 
          }
      ]
    },
    {
      label: 'Help',
      submenu: [
          isDev ? { label: 'Open Dev Tools',
            accelerator: process.platform === 'darwin' ? 'Shift+Cmd+I' : 'Ctrl+Shift+I',
            click: () => { globalMainWindow.webContents.openDevTools(); } 
          } : {}
      ]
    },
  ]
  
  const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate)
  Menu.setApplicationMenu(applicationMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});