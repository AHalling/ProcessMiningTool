import {Alignment, Traces, DCRGraphPP} from "../../DCR-Alignment/types";
import {isEventMap, isMarking, isEventSet, EventMap} from "./miningTypes"

export interface Results {
    results: Array<Result>,
}

export interface LogAlignments {
    alignments: Array<Alignment>
}

export interface Result {
    name: string,
    logName: string,
    modelName: string,
    logPath: string,
    modelPath: string,
    traces: Traces,
    statistics: TestStatistics,
    alignments: LogAlignments,
}

export const isResult = (obj: any) => {
    return true; // TODO
}

export interface EventResult{
    result: Result,
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
    [key: string]: number,
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

