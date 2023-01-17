import { isUiDCRGraph } from "../../../types/src/types";
import { Model, isDCRGraph } from "../../../types/src/miningTypes";
import { convertDCRGraphToUIDCRGraph } from "./DCRGraph";
import {convertUIDCRGraphToDCRGraph} from "./UIDCRGraph"
import {convertDCRGraphToDCRGraphPP} from "./DCRGraphPP"
import { DCRGraphPP } from "../../../DCR-Alignment/types";
import { DCRGraph } from "types/src/miningTypes";


export const formatModel = (model: any, logName: string) : Model | undefined => {
    switch (model.type) {
        case "DCRGraph":
            if(isDCRGraph(model)) return (convertDCRGraphToUIDCRGraph(model, logName));
            return undefined
        case "UIDCRGraph":
            if(isUiDCRGraph(model)) return (convertUIDCRGraphToDCRGraph(model, logName));
            return undefined
        default:
            return undefined
    }
}

export const formatDCRGraphToDCRGraphPP = (graph: DCRGraph) : DCRGraphPP => {
    return convertDCRGraphToDCRGraphPP(graph)
}