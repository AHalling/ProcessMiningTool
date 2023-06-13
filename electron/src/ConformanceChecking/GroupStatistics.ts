import { Alignment, Move } from "types/build/DCR-Alignment/types";
import { DynamicStatistics } from "types/src/conformanceCheckingTypes";

export const computeGroupStatistics = (group: Alignment) : DynamicStatistics  => {
    var [logskips, modelskips, aligned,  topLog, TopModel, totalModelSkips, TotalLogSkips] = computeSkips(group);

    const stats : DynamicStatistics = {
        LogSkips: logskips,
        ModelSkips: modelskips,
        Alignments: aligned,
        TopLogSkip: topLog,
        TopModelSkip: TopModel,
        totalModelSkipsKeys: Object.keys(totalModelSkips),
        totalLogSkipsKeys: Object.keys(TotalLogSkips),
        totalModelSkipsValues: Object.values(totalModelSkips),
        totalLogSkipsValues: Object.values(TotalLogSkips),
    }
    return stats
}

const computeSkips = (group: Alignment) : [number, number, number,  string, string, { [name: string]: number; }, { [name: string]: number; }] => {
    let logskips = 0;
    let modelskips = 0;
    let aligned = 0;
    let ModelSkips : { [name: string]: number } = {};
    let LogSkips : { [name: string]: number } = {};
    
    group.trace.forEach(trace => {
        ModelSkips[trace[0]] = 0;
        LogSkips[trace[0]] = 0;
    });

    group.trace.forEach(trace => {
        if(trace[1] == "model-skip"){
            modelskips++;
            ModelSkips[trace[0]] = ModelSkips[trace[0]] + 1;
        }

        else if(trace[1] == "trace-skip"){
            logskips++;
            LogSkips[trace[0]] = LogSkips[trace[0]] + 1;

        }
        else
            aligned++;
    });

    return [logskips, modelskips, aligned, getMax(ModelSkips) , getMax(LogSkips), ModelSkips, LogSkips]
}

const getMax = (obj: { [name: string]: number }) : string => {
    let highestValue = 0;
    let currentEvent = "";

    Object.keys(obj).forEach(key => {
        if(obj[key] > highestValue){
            highestValue = obj[key]
            currentEvent = key
        }
    });

    if(currentEvent == "")
        currentEvent = "None"

    return currentEvent;
}