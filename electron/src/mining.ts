import { dialog, BrowserWindow } from "electron";
import { addToast } from "./modelInteraction";
import { EventLog, isModel } from "../../types/src/miningTypes";
import {APP_MODEL_PATH} from "./constants";
import { saveFile } from "./fileManipulation";
import { formatModel } from "./Models/modelHelpers";
import {getContentsOfLog} from "./logInteraction";


export const mineLog = (mainWindow: BrowserWindow, AlgPath: string, logPath: string, modelName: string) => {
    const response = dialog.showMessageBoxSync(mainWindow, {
        title: "Algorithm input",
        message: "Does the algorithm need the path- or contents of the log as input?",
        detail: "Clicking Path will provide the path of the log to the algorithm and the algorithm will retreive the contents itself. If the algorithm does not use the FS modeule - select the contents.",
        type: "question",
        buttons: ["Path", "Content"]
      })
    let algorithm;
    try{
        algorithm = require(AlgPath)
    }catch(e){
        console.log("Require failed.")
        console.log(e)
        return
    }

    let result;
    try{
        if ( response === 0){
            result = algorithm.apply(logPath);
        }else {
            let content: EventLog | undefined = getContentsOfLog(logPath);
            content !== undefined ? result = algorithm.apply(content) : new Error('Failed to read the contents of the log.');
            result = algorithm.apply(content);
        }
    }catch(e){
        console.log("Apply failed.")
        console.log(e)
        addToast(mainWindow, "Apply failed with: " + e, "error");
    }

    if(isModel(result)){
        addToast(mainWindow, "Mining complete!", "success");

        let fn = APP_MODEL_PATH + "/" + modelName+ ".json"
        result.type= "DCRGraph";
        let model = formatModel(result, getLogNameFromPath(logPath));
        
        saveFile(fn, model)
    }

    return result;
}

const getLogNameFromPath = (logPath: string) : string => {
    let name = logPath.split("/").pop()

    if (name) {
        return name
    }

    return "null"
}
