import { contextBridge, ipcRenderer } from "electron";
import { Result } from "electron/main";

import{ State} from "../../types/src/types";
import { FileResult, isFileResult } from "types/src/fileTypes";
import { AlignmentGroup } from "types/build/conformanceCheckingTypes";
import { Options, Results } from "types/src/conformanceCheckingTypes";

contextBridge.exposeInMainWorld(
    'electron', {
      sendGraph: (graph: string) => ipcRenderer.send('graph', graph),
      listenToGetGraph: (callback: Function) => ipcRenderer.on('getGraph', () => callback()),
      listenToShowGraph: (callback: Function) => ipcRenderer.on('showGraph', (event, msg) => callback(msg)),
      listenTosaveLastSearchedFile: (callback: Function) => ipcRenderer.on('saveLastSearched',(event, msg) => callback(msg)),
      listenToFilepath: (callback: Function) => ipcRenderer.on('filepath', (event, msg) => callback(msg)),
      listenToToast: (callback: Function) => ipcRenderer.on('toast', (event, msg) => callback(msg)),
      setState: (state: State) => ipcRenderer.send('state', state),
      listenToGraphFiles: (callback: Function) => ipcRenderer.on('graphFiles', (event, msg) => callback(msg)),
      listenToLogFile: (callback: Function) => ipcRenderer.on('logLoaded', (event, msg) => callback(msg)),
      listenToWorkspaceFiles: (callback: Function) => ipcRenderer.on('listenToWorkspaceFiles', (event, msg) => callback(msg)),
      listenToAlgorithms: (callback: Function) => ipcRenderer.on('algorithms', (event, msg) => callback(msg)),
      listenForMiningResult: (callback: Function) => ipcRenderer.on('miningResult', (event, msg) => callback(msg)),
      listenToStatistics:(callback: Function) => ipcRenderer.on('statisticsResult', (event, msg) => callback(msg)),
      listenToLogModelFiles: (callback: Function) => ipcRenderer.on('specificModelFiles', (event, msg) => callback(msg)),
      listenTospecificModelIdLoaded : (callback: Function) => ipcRenderer.on('specificModelIdLoaded', (event, msg) => callback(msg)),
      listenToAlignmentGroupActivation : (callback: Function) => ipcRenderer.on('alignmentGroupActivationResult', (event, msg) => callback(msg)),
      listenToSelectFile : (callback: Function) => ipcRenderer.on('selectedFile', (event, msg) => callback(msg)),
      listenToAlignmentResult : (callback: Function) => ipcRenderer.on('alignmentResult', (event, msg) => callback(msg)),
      listenToSetResult : (callback: Function) => ipcRenderer.on('newResults', (event, msg) => callback(msg)),
      listenForModalOpen : (callback: Function) => ipcRenderer.on('openModalResult', (event, msg) => callback(msg)),
      listenForOptions : (callback: Function) => ipcRenderer.on('sendOptions', (event, msg) => callback(msg)),
      getGraphFiles: () => {
        ipcRenderer.send('getGraphFiles');
      },
      saveLastSearchedFile: (content: string) => {
        ipcRenderer.send('saveLastSearched', content)
      },
      loadGraph: (fn: string) => {
        ipcRenderer.send('load', fn);
      },
      deleteGraph: (fn: string) => {
        ipcRenderer.send('delete', fn);
      },
      newGraph: () => {
        ipcRenderer.send('newGraph', "");
      },
      parseLog: (path:string) => {
        ipcRenderer.send('loadLog', path)
      },
      clearChangeListener: () => ipcRenderer.removeAllListeners('changes'),
      clearInviteListener: () => ipcRenderer.removeAllListeners('invite'),
      clearGraphListeners: () => {
        ipcRenderer.removeAllListeners('showGraph');
        ipcRenderer.removeAllListeners('getGraph');
        ipcRenderer.removeAllListeners('filepath');
      },
      clearLogListener: () => ipcRenderer.removeAllListeners('logLoaded'),
      clearAlgorithmListener: () => ipcRenderer.removeAllListeners('algorithms'),
      clearMiningListener: () => ipcRenderer.removeAllListeners('miningResult'),
      clearWorkspaceFilesListener: () => ipcRenderer.removeAllListeners('listenToWorkspaceFiles'),
      clearStatisticsListener:() => ipcRenderer.removeAllListeners('statisticsResult'),
      clearSpecificModelFilesListener:() => ipcRenderer.removeAllListeners('listenToLogModelFiles'),
      clearlistenTospecificModelLoadedListener: () => ipcRenderer.removeAllListeners('listenTospecificModelLoaded'),
      clearAlignmentGroupActivation: () => ipcRenderer.removeAllListeners('alignmentGroupActivationResult'),
      clearSelectFile : () => ipcRenderer.removeAllListeners('selectedFile'),
      clearAlignmentResult : () => ipcRenderer.removeAllListeners('alignmentResult'),
      clearSetResult : () => ipcRenderer.removeAllListeners('setResult'),
      clearOptionsListener : () => ipcRenderer.removeAllListeners('sendOptions'),
      clearToastListener: () => {
        ipcRenderer.removeAllListeners('toast');
      },
      clearGraphFilesListener: () => {
        ipcRenderer.removeAllListeners('graphFiles');
      },
      readWorkspaceFiles: (path: string) => {
        ipcRenderer.send('loadWorkspaceFiles', path);
      },
      getAlgorithms: () =>{
        ipcRenderer.send('getAlgorithms');
      },
      mineLog: (algPath: string, logPath:string, modelName: string) => {
        ipcRenderer.send('mineLog', algPath, logPath, modelName);
      },
      getStatistics:(logPath: string) => {
        ipcRenderer.send('getStatistics', logPath)
      },
      getGraphFilesForLog: (logName: string) => {
        ipcRenderer.send('getSpecificModelFiles', logName);
      },
      loadSpecificModelWithReturn: (fn: string) => {
        ipcRenderer.send('loadSpecificModelId', fn)
      },
      AlignmentGroupActivation:(result: AlignmentGroup, color: string) => {
        ipcRenderer.send('alignmentGroupActivation', result, color)
      },
      SelectFile: (type: string) => {
        ipcRenderer.send('selectFile', type)
      },
      computeAlignment: (Log: FileResult, Model: FileResult, Options: Options) => {
        ipcRenderer.send('alignment', Log, Model, Options)
      },
      setResult: (result: Result) => {
        ipcRenderer.send('setResult', result)
      },
      openModal:( modal: String) => {
        ipcRenderer.send('openModal', modal)
      },
      sumbitOptions: (options: Options) => {
        ipcRenderer.send('options', options)
      }
    }
)