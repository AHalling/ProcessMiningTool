import { Trace, Traces } from "types/build/DCR-Alignment/types";
import { TraceGroup } from "types/src/conformanceCheckingTypes";

export const groupTraces = (traces: Traces) : Array<TraceGroup> => {
    let res : Array<TraceGroup> = [];

    Object.keys(traces).forEach((key) => {
        var trace = traces[key];
        var group = findGroup(trace, res)
        if (group !== null){
            group.keys.push(key)
        }else{
            res.push({
                keys: [key],
                Trace: trace
            })
        }
    })

    return res;
}

const findGroup = (trace : Trace, res: Array<TraceGroup>) : TraceGroup | null => {
    var ret : TraceGroup | null = null;
    res.forEach((group) => {
        if (group.Trace.length === trace.length){
            for (let i = 0; i < trace.length; i++) {
                if ((group.Trace[i] !== trace[i]) ){
                    ret = null
                    return
                }
                
              }
              ret = group
        }
    })
    return ret;
}