import {LegendColor} from "../../../types/src/conformanceCheckingTypes";

export const ResultsLabel = "Results"
export const OptionsLabel = "Options"
export const StatisticsLabel = "Statistics"
export const HeatmapLabel = "Heatmap"
export const GroupStatisticsLabel = "Group Statistics"
export const ExportLabel = "Export"
export const LegendsLabel = "Legends"

export const HeightDictionary : {[id: string] : number} = {
    Results:0,
    Options:0,
    Statistics:0,
    Heatmap:0,
    GroupStatistics:0,
    Export:0,
}

export const StatisticNames : {[fieldName: string] : string} = {
    maxScore:"Max Score",
    minScore:"Min Score",
    averageScore:"Average Score",
    medianScore:"Median Score",
    numberOfTraces:"Number of traces",
    groupScore:"Group Score",
    Activations:"Activations",
    Fulfillments:"Fulfillments",
    Violations:"Violations",
    LogSkips: "Log skips",
    ModelSkips: "Model Skips",
    Alignments: "Aligned",
    TopLogSkip: "Event most log skipped",
    TopModelSkip: "Event most model skipped",
}

export const GroupColors = ['#FF6F61','#88B04B','#34568B','#92A8D1','#F7CAC9', '#6B5B95', '#DD4124', '#45B8AC'];

export const LegendColors : LegendColor = {
    "Aligned": "green",
    "Log Move": "yellow",
    "Model Move": "purple",
};

export const colors : LegendColor = {
    "consume": "green",
    "trace-skip": "yellow",
    "model-skip": "purple",
};

export const defaultConsumeCost = 0;
export const defaultModelSkipCost = 1;
export const defaultLogSkipCost = 1;