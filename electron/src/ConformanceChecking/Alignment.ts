import { FileResult } from "types/src/fileTypes";
import align from "../../../DCR-Alignment/src/align";
import {parseLog} from "../../../DisCoveR-TS-main/fsInteraction";
import {Traces, DCRGraphPP} from "../../../DCR-Alignment/types"
import {Result, LogAlignments, isDCRGraphPP, AlignmentGroup, Options} from "../../../types/src/conformanceCheckingTypes";
import {loadFile} from "../fileManipulation"
import {isDCRGraph} from "../../../types/src/miningTypes";
import { isUiDCRGraph } from "../../../types/src/types";
import {formatModel, formatDCRGraphToDCRGraphPP} from "../Models/modelHelpers"
import { GroupColors } from "./Constants";
import { ResultStatistics } from "./Statistics";
import { groupAlignment } from "./AlignmentGroup";
import { groupTraces } from "./TraceGroup";

export const computeAlignment = async (Log: FileResult, Model: FileResult, Options: Options) : Promise<Result> => {
    // Get traces
    const traces : Traces = parseLog(Log.path).traces;
    var traceGroups = groupTraces(traces)
    var logAlignments : LogAlignments = {
        alignments : [],
    };
    
    const result : Result = {
        logName: Log.name,
        logPath: Log.path,
        modelName: Model.name,
        modelPath: Model.path,
        name: Log.name.split(".")[0] + "|" + Model.name.split(".")[0],
        statistics: {},
        alignmentgroups: [],
    }

    // Get GraphPP type
    var model : DCRGraphPP | undefined = await GetGraphFromModel(Model, Log.name)

    traceGroups.forEach(trace => {
      if(isDCRGraphPP(model))
        logAlignments.alignments.push(align(trace.Trace, model, Options,trace.keys ))
      });

    result.alignmentgroups = OrganizeAlignments(logAlignments)
    console.log(result.alignmentgroups[0].GroupAlignemnts[0])
    console.log(result.alignmentgroups[1].GroupAlignemnts[0])
    console.log(result.alignmentgroups[2].GroupAlignemnts[0])
    result.statistics = ResultStatistics(result)
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

const OrganizeAlignments = (logAlignments : LogAlignments) : Array<AlignmentGroup> => {
  var groups : Array<AlignmentGroup> = groupAlignment(logAlignments);
  var i : number = 1;

  groups.forEach((alignment) => {
    alignment.color = GroupColors[i % GroupColors.length]
    i++;
  })
  return getOtherGroupsInResult(groups)
}

const getOtherGroupsInResult = (groups: Array<AlignmentGroup>) : Array<AlignmentGroup>  => {
  groups.forEach(group => {
    group.otherGroupsIDInResult = groups.filter(function(g) { return g.id !== group.id; }).map(g => g.id);
  });
  return groups;
}