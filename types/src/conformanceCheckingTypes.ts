import {Alignment, Traces, DCRGraphPP} from "../../DCR-Alignment/types";
import {isEventMap, isMarking, isEventSet, EventMap} from "./miningTypes"
import { Guid } from "guid-typescript";

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
    statistics: TestStatistics,
    alignmentgroups: Array<AlignmentGroup>,
}

export interface AlignmentGroup {
    Traces: Traces,
    Alignment: Alignment,
    GroupStatistics: TestStatistics,
    color: string,
    id: string,
    otherGroupsIDInResult: Array<string>,
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

export interface Trace {
    activities: string,
    relations: string,
}

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

export interface TestStatistics {
    [key: string]: number | string,
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

