import { AlignmentGroup, DynamicStatistics, Result, MappingScore } from "types/src/conformanceCheckingTypes";

export const ResultStatistics = (result: Result) : DynamicStatistics => {
    let scores : number[] = [];
    let mappedScore : { [name: string]: number } = {};

    let i = 1;
    // Compute score for each group.
    result.alignmentgroups.forEach(group => {
        mappedScore[i] = computeScoreForGroup(group);
        //scores.push(computeScoreForGroup(group));
        i++;
    });
    scores = Object.values(mappedScore);

    // scores.forEach(score => {
    //     mappedScore[i] = score
    //     i++;
    // });

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
        scoreKeys: Object.keys(mappedScore),
        scoreValues: Object.values(mappedScore),
    }
}

const computeScoreForGroup = (group : AlignmentGroup) : number =>{
    var correct = 0
    var failure = 0
    var length = 0;
    group.Alignment.forEach(trace => {
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