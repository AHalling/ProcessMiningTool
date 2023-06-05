import { Results, Result, GeneralStatistics, GroupStatistics, DynamicStatistics } from "types/src/conformanceCheckingTypes";

const dummyResults = () => {
    const result1: Result = {
        name: "result1.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics1(),
        alignmentgroups:[]
    }
    
    const result2: Result = {
        name: "result2.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }
    const result3: Result = {
        name: "result3.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }

    const result4: Result = {
        name: "result4.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }

    const result5: Result = {
        name: "result5.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }

    const result6: Result = {
        name: "result6.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }

    const result7: Result = {
        name: "result7.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }

    const result8: Result = {
        name: "result8.xes",
        logName: "string",
        modelName: "string",
        logPath: "string",
        modelPath: "string",
        statistics: DummyTestStatistics(),
        alignmentgroups:[]
    }
    
    const results: Results = {
        results: [result1, result2, result3, result4, result5, result6, result7, result8, result1, result2, result3, result4, result5, result6, result7, result8]
    };
    return results
}

export const DummyGeneralStatistics = () => {
    const stats : GeneralStatistics = {
        maxScore: 0.95,
        minScore: 0.10,
        averageScore: 0.45,
        medianScore: 0.51,
    }
    return stats
}

export const DummyGroupStatistics = () => {
    const stats : GroupStatistics = {
        numberOfTraces: 40,
        groupScore: 0.92,
        Activations: 40,
        Fulfillments: 30,
        Violations: 10,
    }
    return stats
}

export const DummyTestStatistics = () => {
    const stats : DynamicStatistics = {
        numberOfTraces: 40,
        groupScore: 0.92,
        Activations: 40,
        Fulfillments: 30,
        Violations: 10,
    }
    return stats
}

export const DummyTestStatistics1 = () => {
    const stats : DynamicStatistics = {
        numberOfTraces: 1,
        groupScore: 0.2,
        Activations: 3,
        Fulfillments: 4,
        Violations: 5,
    }
    return stats
}




export default dummyResults