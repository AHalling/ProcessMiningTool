import { DCRGraph } from "../../../types/src/miningTypes";
import {DCRGraphPP} from "../../../DCR-Alignment/types";

export const convertDCRGraphToDCRGraphPP = (model: DCRGraph) : DCRGraphPP => {
    var graph : DCRGraphPP = {
        events: model.events,
        marking: model.marking,
        conditionsFor: model.conditionsFor,
        excludesTo: model.excludesTo,
        includesTo: model.includesTo,
        milestonesFor: model.milestonesFor,
        responseTo: model.responseTo,
        conditions: new Set(), // TODO
    };

    return graph;
}