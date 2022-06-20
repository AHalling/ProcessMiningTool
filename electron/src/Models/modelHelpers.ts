import { Model, isDCRGraph } from "../../../types/src/miningTypes";
import { convertDCRGraphToUIDCRGraph } from "./DCRGraph";

export const formatModel = (model: Model, logName: string) : Model | undefined => {
    switch (model.type) {
        case "DCRGraph":
            if(isDCRGraph(model)) return (convertDCRGraphToUIDCRGraph(model, logName));
            return undefined
    
        default:
            return undefined
    }
}