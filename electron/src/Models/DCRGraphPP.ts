import { DCRGraph } from "../../../types/src/miningTypes";
import {DCRGraphPP} from "../../../DCR-Alignment/types";
import {Event} from "../../../DCR-Alignment/types";
import init from "../../../DCR-Alignment/init";

export const convertDCRGraphToDCRGraphPP = (model: DCRGraph) : DCRGraphPP => {
    init();
    const conditions = new Set<Event>(); for (const key in model.conditionsFor) 
    {conditions.union(model.conditionsFor[key]); }

    var graph : DCRGraphPP = {
        events: model.events,
        marking: model.marking,
        conditionsFor: model.conditionsFor,
        excludesTo: model.excludesTo,
        includesTo: model.includesTo,
        milestonesFor: model.milestonesFor,
        responseTo: model.responseTo,
        conditions: conditions,
    };


    return graph;
}