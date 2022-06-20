import { AlgorithmCollection, isModel } from "../../types/src/miningTypes";
import { ACCEPTED_ALGORITHM_FILES, APP_TEST_LOG, APP_PUBLIC_DEFAULT_ALGORITHM, APP_PUBLIC_DEFAULT_ALGORITHM_NAME } from "./constants";
import { getFiles } from "./workspace";
import path from "path";
import { getContentsOfLog } from "./logInteraction";


export const readAlgorithms = (startPath: string) : AlgorithmCollection => {
  let viable: AlgorithmCollection = loadAlgorithms(startPath);

  // Adds Discover miner as default.
  viable.push({
    name: APP_PUBLIC_DEFAULT_ALGORITHM_NAME,
    path: APP_PUBLIC_DEFAULT_ALGORITHM,
  })

  let validatedAlgorithms: AlgorithmCollection = validateAlgorithms(viable)

  return validatedAlgorithms
}

const loadAlgorithms = (currPath: string) : AlgorithmCollection => {
    let viable: AlgorithmCollection = [];
  
    let files = getFiles(currPath);

    files.forEach(file => {
      if (ACCEPTED_ALGORITHM_FILES.includes(path.extname(file.name)) && file.name.includes("main") ){
        viable.push({
          name:getAlgorithmNameFromPath(file.path),
          path: file.path,
        })
      }
  
      if(file.directory && file.name !== "node_modules"){
        viable = viable.concat(loadAlgorithms(file.path));
      }
  
    })

    return viable
  }
  
  const getAlgorithmNameFromPath = (path:string) : string =>{
    let splitPath = path.split("/");

    return path.split("/").length >= 2 ? path.split("/")[1] : path.split("\\")[splitPath.length-1];

  }

  const validateAlgorithms = (algorithms: AlgorithmCollection) : AlgorithmCollection => {
    if (!global.isValidationAvailable){
      return algorithms
    }
    let validatedAlgorithms : AlgorithmCollection = []

    let logPath = APP_TEST_LOG;
    let content = getContentsOfLog(logPath);

    algorithms.forEach(alg => {
      let result;
      let currAlg = require(alg.path);
      try{
        currAlg = require(alg.path);
        if (Object.keys(currAlg).includes("apply")){
          result = currAlg.apply(logPath)
        }else {
          result = undefined;
        }
      }catch (e){
        result = currAlg.apply(content);
      }
      if(isModel(result)){
        validatedAlgorithms.push(alg)
      }

    });
    return validatedAlgorithms
  }