import {Alignment, Traces, DCRGraphPP, AlignmentTrace} from "../../DCR-Alignment/types";
import {isEventMap, isMarking, isEventSet, EventMap} from "./miningTypes"
import {Trace} from "../../DCR-Alignment/types"
export interface Results {
    results: Array<Result>,
}

export interface LogAlignments {
    alignments: Array<Alignment>
}

export type Modals = "Details" | "TraceGroups" | "Export" | "ExportFig";

export interface Result {
    name: string,
    logName: string,
    modelName: string,
    logPath: string,
    modelPath: string,
    statistics: DynamicStatistics,
    alignmentgroups: Array<AlignmentGroup>,
}

export interface AlignmentGroup {
    GroupAlignemnts: Array<Alignment>, // full Alignments
    Alignment: AlignmentTrace, // the common group alignment
    GroupStatistics: DynamicStatistics,
    color: string,
    id: string,
    otherGroupsIDInResult: Array<string>,
    cost: number,
}

export const isResult = (obj: any) => {
    return true; // TODO
}

export const isResults = (obj: any) => {
    return true; // TODO
}

export interface EventResult{
    group: AlignmentGroup,
    color: string,
}

export type GroupResult = Result | null;

export interface GroupStatistics{
    numberOfTraces: number,
    groupScore: number,
    Activations: number,
    Fulfillments: number,
    Violations: number,
}

export interface GeneralStatistics{
    maxScore: number,
    minScore: number,
    averageScore: number,
    medianScore: number,
}

export interface MappingScore{
    group: number |string,
    scores: number,
}

export interface DynamicStatistics {
    [key: string]: number | string | string[]| Array<number>,
}
export type Statistics = GroupStatistics | GeneralStatistics | null;

export interface LegendColor {
    [key: string]: string,
}

export const isDCRGraphPP = (obj: any): obj is DCRGraphPP => {
    return (
        isEventSet(obj.events) &&
        isEventMap(obj.conditionsFor) &&
        isEventMap(obj.milestonesFor) &&
        isEventMap(obj.responseTo) &&
        isEventMap(obj.includesTo) &&
        isEventMap(obj.excludesTo) &&
        isMarking(obj.marking) &&
        isEventSet(obj.conditions)
      )
}

export interface Options {
    ConsumeCost : number,
    ModelSkipCost: number,
    LogSkipCost: number,
}

export const isOptions = (obj: any): obj is Options => {
    return true;
}

export type TraceGroup = {
    keys: Array<string>,
    Trace: Trace
} 
