import { FileResult } from "types/src/fileTypes";
import {Alignment, DCRGraph} from "../../../DCR-Alignment/types"
import align from "../../../DCR-Alignment/src/align";
import {parseLog} from "../../../DisCoveR-TS-main/fsInteraction";
import {Trace, Traces, DCRGraphPP} from "../../../DCR-Alignment/types"
import {Result, LogAlignments, isDCRGraphPP, AlignmentGroup} from "../../../types/src/conformanceCheckingTypes";
import {loadFile} from "../fileManipulation"
import {isDCRGraph} from "../../../types/src/miningTypes";
import { isUiDCRGraph } from "../../../types/src/types";
import {formatModel, formatDCRGraphToDCRGraphPP} from "../Models/modelHelpers"
import {computeGroupStatistics} from "./Statistics"

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
        statistics: {
          maxScore: 0.95,
          minScore: 0.10,
          averageScore: 0.45,
          medianScore: 0.51,
      },
        alignmentgroups: [],
    }

    // Get GraphPP type
    var model : DCRGraphPP | undefined = await GetGraphFromModel(Model, Log.name)

    Object.keys(traces).forEach(traceKey => {
      if(isDCRGraphPP(model))
        logAlignments.alignments.push(align(traces[traceKey], model))
      });

      result.alignmentgroups = OrganizeAlignments(logAlignments, traces)

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

const OrganizeAlignments = (logAlignments : LogAlignments, traces: Traces) : Array<AlignmentGroup> => {
  var groups : Array<AlignmentGroup> = []
  logAlignments.alignments.forEach((alignment) => {
    groups.push({
      Traces: traces,
      Alignment: alignment,
      GroupStatistics: computeGroupStatistics(alignment),
    })
  })

  return groups
}