import { useEffect, useState } from "react";
import { Options } from "../../../../types/src/conformanceCheckingTypes";
import {defaultConsumeCost, defaultLogSkipCost, defaultModelSkipCost} from "../Constants"

const useOptions = () => {
    const [ops, setOptions] = useState<Options>({ConsumeCost: defaultConsumeCost, ModelSkipCost: defaultModelSkipCost, LogSkipCost: defaultLogSkipCost})
    
    useEffect(() => {
        window.electron.listenForOptions( (options: Options) => {
            setOptions(options)
        })
    })
            

    return ops
}

export default useOptions;