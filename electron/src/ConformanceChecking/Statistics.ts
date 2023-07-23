import { AlignmentGroup, DynamicStatistics, Result, MappingScore } from "types/src/conformanceCheckingTypes";
import align from "../../../DCR-Alignment/src/align";
import { Alignment } from "types/build/DCR-Alignment/types";

export const ResultStatistics = (result: Result, fitness: number) : DynamicStatistics => {
    let scores : number[] = [];
    let mappedScore : { [name: string]: number } = {};

    let i = 1;
    // Compute score for each group.
    result.alignmentgroups.forEach(group => {
        group.GroupAlignemnts.forEach(alignment => {
            mappedScore[i] = computeScoreForGroup(group);
            i++;
        })
    });
    scores = Object.values(mappedScore);

    // Average cost in result
    var averageCost = result.alignmentgroups.reduce((p,c) => p + c.cost,0) / result.alignmentgroups.length
    // Compute average score
    var average = scores.reduce( ( p, c ) => p + c, 0 ) / scores.length
    // Compute median score
    scores = scores.sort();

    var median = 0;
    var half = Math.floor(scores.length / 2);
  
    if (scores.length % 2){
        median = scores[half];
    }else{
        median =  (scores[half - 1] + scores[half]) / 2.0;
    }
    // Pick max and min.
    var max = Math.max(...scores);
    var min = Math.min(...scores)
    // Put into object and return.
    return {
        fitness: fitness,
        averageScore: average.toFixed(2),
        medianScore: median.toFixed(2),
        maxScore: max.toFixed(2),
        minScore: min.toFixed(2),
        scoreKeys: Object.keys(mappedScore),
        scoreValues: Object.values(mappedScore),
        averageCost: averageCost.toFixed(2),
    }
}

const computeScoreForGroup = (group : AlignmentGroup) : number =>{
    var correct = 0
    var failure = 0
    var length = 0;
    group.GroupAlignemnts.forEach(trace => {
        trace.trace.forEach(event => {
            length = length + 1;
            if(event[1] !== "consume")
            {
                failure++;
            }
            else{
                correct++;
            }
        })
    });

    var result = (correct / length)
    return result;
}

export const computeLogFitness = (result: Result, alignmentsOfEmptyExecutionSequence: Array<Alignment>, minCostForEmptyTrace: number) : number => {
    var totalCost =  result.alignmentgroups.reduce((p,c) => p + c.cost, 0)
    var length =  result.alignmentgroups.reduce((p,c) => p + 1, 0)

    var costOfAligningTraceWithEmptyExecution = alignmentsOfEmptyExecutionSequence.reduce((p,c) => p + c.cost, 0);

    return (1- (totalCost/ (costOfAligningTraceWithEmptyExecution + length * minCostForEmptyTrace)))
}