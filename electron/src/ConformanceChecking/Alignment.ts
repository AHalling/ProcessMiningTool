import { FileResult } from "types/src/fileTypes";
import align from "../../../DCR-Alignment/src/align";
import {parseLog} from "../../../DisCoveR-TS-main/fsInteraction";
import {Traces, DCRGraphPP, AlignmentTrace, Trace} from "../../../DCR-Alignment/types"
import {Result, LogAlignments, isDCRGraphPP, AlignmentGroup, Options, TraceGroup} from "../../../types/src/conformanceCheckingTypes";
import {loadFile} from "../fileManipulation"
import {isDCRGraph} from "../../../types/src/miningTypes";
import { isUiDCRGraph } from "../../../types/src/types";
import {formatModel, formatDCRGraphToDCRGraphPP} from "../Models/modelHelpers"
import { GroupColors, ShortenLimit } from "./Constants";
import { ResultStatistics, computeLogFitness } from "./Statistics";
import { groupAlignment } from "./AlignmentGroup";
import { groupTraces } from "./TraceGroup";
import { Alignment } from "types/build/DCR-Alignment/types";

export const computeAlignment = async (Log: FileResult, Model: FileResult, Options: Options) : Promise<Result> => {
    // Get traces
    const traces : Traces = parseLog(Log.path).traces;
    var traceGroups = groupTraces(traces)
    var logAlignments : LogAlignments = {
        alignments : [],
    };
    var fitness = 0;
    
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

    var alignmentsForEmptyModel = computeAlignmentsForEmptyModel(traceGroups, getEmptyDCRGraphPP(), Options)

    result.alignmentgroups = OrganizeAlignments(logAlignments)
    if (isDCRGraphPP(model)){
      var costsForEmptyTraces = computeCostsWithEmptyTrace(model, Options);
      fitness = computeLogFitness(result, alignmentsForEmptyModel, costsForEmptyTraces);
    }
    result.statistics = ResultStatistics(result, fitness)
    return result
}

const getEmptyDCRGraphPP= () : DCRGraphPP  => {
    var graph : DCRGraphPP = {
      events: new Set<string>(),
      marking: {
        executed: new Set<string>(),
        included: new Set<string>(),
        pending: new Set<string>(),
      },
      conditionsFor: {},
      excludesTo:{},
      includesTo: {},
      milestonesFor: {},
      responseTo: {},
      conditions: new Set<string>(),
  };
  return graph
}

const computeAlignmentsForEmptyModel = (traceGroups: Array<TraceGroup>, model: DCRGraphPP, Options : Options) : Array<Alignment> => {
  var alignments : Array<Alignment> = [];
  traceGroups.forEach(group => {
    alignments.push(align(group.Trace, model, Options, group.keys))
  });

  return alignments;
}

const computeCostsWithEmptyTrace = (model: DCRGraphPP, Options : Options) : number => {
  return align([], model, Options, []).cost
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

  groups = ShortenSynchronizedMoves(groups);
  return getOtherGroupsInResult(groups)
}

const getOtherGroupsInResult = (groups: Array<AlignmentGroup>) : Array<AlignmentGroup>  => {
  groups.forEach(group => {
    group.otherGroupsIDInResult = groups.filter(function(g) { return g.id !== group.id; }).map(g => g.id);
  });

  return groups;
}

const ShortenSynchronizedMoves = (groups: Array<AlignmentGroup>) :Array<AlignmentGroup> =>{
  groups.forEach(group => {
        if (group.Alignment.length >= ShortenLimit){
          group.Alignment = shortenTrace(group.Alignment);
        } 
  });
  return groups;
}

const shortenTrace = (trace: AlignmentTrace) : AlignmentTrace => {
  var pointer = 0;
  var sync : boolean = false;

  for (let i = trace.length-1; i >= 0; i--) {
      if(trace[i][1] === "consume" && !sync){
        pointer = i;
        sync = true;
    }else{
        if (trace[i][1] === "model-skip" || trace[i][1] === "trace-skip"){
            sync = false;
        }
        if((pointer - i) > 5 && !sync){
          // We've seen 5 sync moves in a row
          // Replace from i up to pointer
          trace.splice(i + 1, ((pointer-1)-i), ["", "skip"])
          // Move pointer forward
          pointer = i;
        }
    }
    // We hit the end
    if (i === 0 && sync){
      if((pointer - i) > 5){
        // replace from i up to pointer-i
        trace.splice(i + 1, ((pointer-1)-i), ["", "skip"])
      }
    }
  }
  return trace;
}