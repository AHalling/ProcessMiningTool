import { FileResult } from "types/src/fileTypes";
import {Alignment, DCRGraph} from "../../../DCR-Alignment/types"
import align from "../../../DCR-Alignment/src/align";
import {parseLog} from "../../../DisCoveR-TS-main/fsInteraction";
import {Trace, Traces, DCRGraphPP} from "../../../DCR-Alignment/types"
import {Result, LogAlignments, isDCRGraphPP} from "../../../types/src/conformanceCheckingTypes";
import {loadFile} from "../fileManipulation"
import {isDCRGraph} from "../../../types/src/miningTypes";
import { isUiDCRGraph } from "../../../types/src/types";
import {formatModel, formatDCRGraphToDCRGraphPP} from "../Models/modelHelpers"

export const computeAlignment = async (Log: FileResult, Model: FileResult) : Promise<Result> => {
    // Get traces
    const traces : Traces = parseLog(Log.path).traces;

    var logAlignments : LogAlignments = {
        alignments : []
    };
    
    const result : Result = {
        logName: Log.name,
        logPath: Log.path,
        modelName: Model.name,
        modelPath: Model.path,
        name: Log.name.split(".")[0] + "|" + Model.name.split(".")[0],
        statistics: {},
        traces: traces,
        alignments: {
            alignments : []
        }
    }

    // Get GraphPP type
    var model : DCRGraphPP | undefined = await GetGraphFromModel(Model, Log.name)

    Object.keys(traces).forEach(traceKey => {
      if(isDCRGraphPP(model))
        logAlignments.alignments.push(align(traces[traceKey], model))
      });

    console.log(logAlignments)
    result.alignments = logAlignments

    return result
}

const GetGraphFromModel = async (Model: FileResult, LogName: string) : Promise<DCRGraphPP | undefined> => {
  var model : DCRGraphPP | undefined
  await loadFile(Model.path).then(item => {
    if(isUiDCRGraph(item)){
      item.type = "UIDCRGraph";
      var DcrGraph = formatModel(item, LogName)

      if(isDCRGraph(DcrGraph)){

        var result = formatDCRGraphToDCRGraphPP(DcrGraph)

        if(isDCRGraphPP(result) && result !== undefined){
          model = result
        }
      }
    }
  })
  return model

}

const ConvertDCRGraphToDCRGraphPP = (DCRGraph : DCRGraph) : DCRGraphPP => {
  console.log(DCRGraph.conditionsFor)
  return {
    events: DCRGraph.events,
    conditionsFor: DCRGraph.conditionsFor,
    responseTo: DCRGraph.responseTo,
    excludesTo: DCRGraph.excludesTo,
    includesTo: DCRGraph.includesTo,
    milestonesFor: DCRGraph.milestonesFor,
    marking: DCRGraph.marking,
    conditions: new Set<string>()
  }
}
const trace = ["1", "2", "4"];
const model1: DCRGraphPP = {
    events: new Set(["1", "2", "3", "4"]),
    conditions: new Set(),
    conditionsFor: {
      "1": new Set(),
      "2": new Set(),
      "3": new Set(),
      "4": new Set(),
    },
    responseTo: {
      "1": new Set(),
      "2": new Set(),
      "3": new Set(),
      "4": new Set(),
    },
    milestonesFor: {
      "1": new Set(),
      "2": new Set(),
      "3": new Set(),
      "4": new Set(),
    },
    includesTo: {
      "1": new Set(),
      "2": new Set(),
      "3": new Set(["1", "2", "4"]),
      "4": new Set(),
    },
    excludesTo: {
      "1": new Set(),
      "2": new Set(),
      "3": new Set(),
      "4": new Set(),
    },
    marking: {
      included: new Set("3"),
      pending: new Set(),
      executed: new Set(),
    },
  };