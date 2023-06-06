import { useEffect, useState } from "react";
import { AlignmentGroup, Result, Results } from "types/build/conformanceCheckingTypes";
import { Options } from "types/src/conformanceCheckingTypes";
import { FileResult } from "types/src/fileTypes";

const useResultComputation = (Log: FileResult | undefined, Model: FileResult | undefined, results: Results, options: Options) => {
    const [currResult, setCurrResult] = useState<Result>()

    const clearColors = (alignmentgroups: Array<AlignmentGroup>) => {
        alignmentgroups.forEach(g => {
            const group = document.getElementById(g.id);
            if(group !== null)
                group.style.backgroundColor = "inherit";
            
        });
    }

    useEffect(() => {
        let shouldCompute = false;

        if(Log && Model){
            shouldCompute = true;
        }

        if(shouldCompute){
            window.electron.listenToAlignmentResult((result: Result) => {
                results.results.push(result)
                setCurrResult(result)

                window.electron.clearAlignmentResult();
            })
            window.electron.computeAlignment(Log, Model, options);

        }

        window.electron.listenToSetResult((result: Result) => {
            window.electron.AlignmentGroupActivation(null, "none")

            clearColors(result.alignmentgroups)

            setCurrResult(result)
        })

    }, [Log, Model, options, results.results])
    return {currResult}

}

export default useResultComputation;