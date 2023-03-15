import { Alignment } from "types/build/DCR-Alignment/types";
import { TestStatistics } from "types/src/conformanceCheckingTypes";

export const computeGroupStatistics = (group: Alignment) : TestStatistics  => {
    const stats : TestStatistics = {
        numberOfTraces: 40,
        groupScore: 0.92,
        Activations: 40,
        Fulfillments: 30,
        Violations: 10,
    }
    return stats
}