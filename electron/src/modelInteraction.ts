import { ipcMain, dialog, BrowserWindow } from "electron";
import path from "path";
import fs from "fs";

import { saveFile, loadFile } from "./fileManipulation";
import {parseLog} from "./logInteraction"

import { UiDCRGraph, isUiDCRGraph } from "../../types/src/types";

import { APP_MODEL_PATH } from "./constants";

import { v4 as uuidv4 } from 'uuid';
import { DCRGraph, isModel, Model } from "../../types/src/miningTypes";

let globalLastFilePath: string = ""; 

export const addToast = (mainWindow: BrowserWindow, msg: string, appearance: "success" | "error") => {
  mainWindow.webContents.send('toast', {msg, appearance});
}

export const getGraphFiles = (): Array<string> => {
  const fns = fs.readdirSync(APP_MODEL_PATH);
  const graphFns = fns.filter( (fn) => fn.endsWith(".json"));
  return graphFns
}

export function getGraph(mainWindow: BrowserWindow): Promise<UiDCRGraph> {
  return new Promise( (resolve, reject) => {
    ipcMain.once("graph", (event, msg) => {
      const graph = JSON.parse(msg);
      if (isUiDCRGraph(graph) && isModel(graph)) {
        resolve(graph);
      } else {
        reject(new Error("Invalid model received"));
      }
    })
    mainWindow.webContents.send("getGraph");
  })
}

export const saveAsGraph = async (mainWindow: BrowserWindow) => {
  const defaultFn = globalLastFilePath ? globalLastFilePath : "graph.json";
  const res = await dialog.showSaveDialog(mainWindow, {
    title: "Select graph",
    defaultPath: path.join(APP_MODEL_PATH, defaultFn),
    properties: ['showOverwriteConfirmation']
  });
  if (!res.canceled && res.filePath) {
    await saveGraph(mainWindow, res.filePath);
    globalLastFilePath = res.filePath;
  }
}

export const saveGraph = async (mainWindow: BrowserWindow, filePath?: string) => {
  const graph = await getGraph(mainWindow);
  const trueFilePath = filePath ? filePath : globalLastFilePath;

  // If no filename saved, create dialog
  if (!trueFilePath) {
    await saveAsGraph(mainWindow);
    return
  }

  try {
    await saveFile(trueFilePath, graph);
    addToast(mainWindow, "Model Saved!", "success");
  } catch (e) {
    console.log(e);
    addToast(mainWindow, "Error saving model", "error");
  }
}

export const loadSpecific = async (mainWindow: BrowserWindow, filepath: string) => {
  let graph;
  try {
    graph = await loadFile(filepath);
  } catch (e) {
    addToast(mainWindow, "Invalid graph...", "error");
    return
  }
  if (isUiDCRGraph(graph)) {
    mainWindow.webContents.send('showGraph', graph);
    globalLastFilePath = filepath;
    mainWindow.setTitle(path.basename(filepath).slice(0, -5));
  } else {
    addToast(mainWindow, "Invalid graph...", "error");
  }
} 

export const loadLog = async(mainWindow: BrowserWindow, path: string) => {
  let logFile;
  try{
      logFile = await parseLog(path);
      mainWindow.webContents.send('logLoaded', logFile);
  }catch (e) {
    addToast(mainWindow, "No log file found.", "error");
    return
  }
}

export const loadGraph = async (mainWindow: BrowserWindow) => {
  const res = await dialog.showOpenDialog(mainWindow, {
    title: "Select graph",
    defaultPath: APP_MODEL_PATH,
    properties: ['openFile']
  });
  if (!res.canceled) {
    const filepath = res.filePaths[0];
    loadSpecific(mainWindow, filepath);
  }
}

export const newGraph = async (mainWindow: BrowserWindow, prompt?: boolean) => {
  let response = 0;
  if (prompt) {
    response = dialog.showMessageBoxSync(mainWindow, {
      message: "Creating a new graph will erase all unsaved progress. Do you want to continue?",
      type: "question",
      buttons: ["Yes", "No"]
    });
  }
  if (response === 0) {
    const graph = {
      id: uuidv4(),
      events: [],
      relations: []
    }
    mainWindow.webContents.send('showGraph', graph);
    globalLastFilePath = "";
    mainWindow.setTitle("New Graph");
  }
}

export const deleteGraph = (mainWindow: BrowserWindow, fn: string) => {
  const response = dialog.showMessageBoxSync(mainWindow, {
    message: "This will delete the graph forever. Do you wish to continue?",
    type: "question",
    buttons: ["Yes", "No"]
  })
  if (response == 0) {
    fs.rm(path.join(APP_MODEL_PATH, fn), (err) => {
      if (err) {
        addToast(mainWindow, "Error deleting graph: " + fn.slice(0, -4), "error");
      } else {
        const fns = getGraphFiles();
        addToast(mainWindow, "Graph deleted", "success");
        mainWindow.webContents.send('graphFiles', fns);
      }
    });
  }
}

export const getSpecificModelFiles = (logName: string): Array<string> => {
  let files : Array<string> = [];

  const fns = fs.readdirSync(APP_MODEL_PATH);
  const graphFns = fns.filter( (fn) => fn.endsWith(".json"));

  graphFns.forEach(file => {
    try{
      const content = fs.readFileSync(APP_MODEL_PATH + "/" + file, 'utf-8');
      if (content.includes(logName)){
        files.push(file)
      }
    }catch (e){
        console.log(e);
    }
  });

  return files
}

export const loadSpecificModelId = (fn: string) : string => {
  const model = fs.readFileSync(path.join(APP_MODEL_PATH, fn));

  const ModelAsJson = JSON.parse(model.toString());

  if(isUiDCRGraph(ModelAsJson)){
    return ModelAsJson.id;
  }

  return "-1"
}