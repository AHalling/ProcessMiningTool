export interface ContentStatistics {
    NumberOfTraces: number,
    NumberOfUniqueTraces: number,
    NumberOfEvents: number,
    NumberOfUniqueEvents:number,
}

export interface TemporalStatistics {
    MinimumTraceDuration: FormattedTraceDurations,
    MaximumTraceDuration: FormattedTraceDurations,
    AverageTraceDuration: FormattedTraceDurations,
    MedianTraceDuration: FormattedTraceDurations,
}

export type Statistics = {
    ContentStatistics: ContentStatistics,
    TemporalStatistics: TemporalStatistics,
}

export type TraceDurations = number;

export type FormattedTraceDurations = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}