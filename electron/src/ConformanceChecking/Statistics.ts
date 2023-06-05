import { AlignmentGroup, DynamicStatistics, Result } from "types/src/conformanceCheckingTypes";

export const ResultStatistics = (result: Result) : DynamicStatistics => {
    let scores : number[] = [];
    // Compute score for each group.
    result.alignmentgroups.forEach(group => {
        scores.push(computeScoreForGroup(group));
    });

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
        averageScore: average,
        medianScore: median,
        maxScore: max,
        minScore: min,
    }
}

const computeScoreForGroup = (group : AlignmentGroup) : number =>{
    var correct = 0
    var failure = 0
    var length = 0;
    group.Alignment.trace.forEach(trace => {
        length = length + 1;
        if(trace[1] !== "consume")
        {
            failure++;
        }
        else{
            correct++;
        }
    });

    var result = (correct / length)
    return result;
}