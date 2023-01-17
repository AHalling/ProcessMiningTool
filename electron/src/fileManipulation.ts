import { BrowserWindow } from 'electron';
import { APP_MODEL_PATH, APP_LOG_PATH } from './constants';
import * as fs from 'fs'; // Load the File System to execute our common tasks (CRUD)
import {FileResult, FileType} from "../../types/src/fileTypes";

function saveFile(combinedPath: string, content: any): Promise<boolean> {
    return new Promise( (resolve, reject) => {
        if (combinedPath === "") {
            reject(new Error("Path empty"));
        }
    
        let serContent = JSON.stringify(content);

        fs.writeFile(combinedPath, serContent, (err: any) => {
            if (err) {
                reject(err);
            }
            resolve(true); 
        });
    });
    
}


function loadFile(fullPath: string): Promise<any> {
    return new Promise( (resolve, reject) => {
        if (fullPath == "") {
            reject(new Error("Path is empty"));
        }
        fs.readFile(fullPath, 'utf-8', (err: any, data: any) => {
            if (err) {
                console.log("An error ocurred reading the file :");
                reject(err);
            }
            try {   
                let content = JSON.parse(data);
                resolve(content);
            } catch (e) {
                reject(e);
            }
            
        });
    });
}

function SelectFile(window: BrowserWindow, type: FileType) : FileResult {
    const { dialog } = require('electron')

    let path = "";
    let defaultPath = ChoosePath(type)

    var options : Electron.OpenDialogSyncOptions = {
        properties: ['openFile', 'showHiddenFiles'],
        defaultPath: defaultPath,
        title: "Select Model",
        filters: [
            { name: 'json', extensions: ['json'] },
            { name: 'xes', extensions: ['xes'] }
        ]
  }

    var result = dialog.showOpenDialogSync(window, options);

    if(result == undefined){
        console.log("Window was closed. No file was chosen.")
    }else{
        if(result.length > 0){
            path = result[0]
        }else{
            console.log("Result was empty")
        }
    }

    return {
        name: path.split("/").pop() ?? path.split("\\").length > 1 ? path.split("\\").pop() ?? "null" : "null" ,
        path: path,
        Type: type
    };
}

function ChoosePath(type: string): string {
    if(type === "Log"){
        return APP_LOG_PATH
    }

    if (type === "Model"){
        return APP_MODEL_PATH
    }

    return ""
}


export { saveFile, loadFile, SelectFile };