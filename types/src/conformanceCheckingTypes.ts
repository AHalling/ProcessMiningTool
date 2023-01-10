
export interface Results {
    results: Result[],
}

export interface Result {
    name: string,
    logName: string,
    modelName: string,
    logPath: string,
    modelPath: string,
    traces: Traces,
    statistics: TestStatistics
}

export const isResult = (obj: any) => {
    return true; // TODO
}

export interface EventResult{
    result: Result,
    color: string,
}

export type GroupResult = Result | null;

export interface Traces {
    traces: Trace[]
}

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