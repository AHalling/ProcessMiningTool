import { useLayoutEffect, useRef, useState } from "react";
import { HeightDictionary } from "../Constants";

const useHeightState = () => {
    const [GroupStatisticsHeight, setGroupStatisticsHeight] = useState(175) // TODO: Fix height to be dynamic
    const [ExportHeight, setExportHeight] = useState(100)
    const parentRef = useRef<HTMLDivElement | null>(null);

    const SetHeightForToggle = (node: any) =>{
        for (let key in HeightDictionary) {
            if(node.childNodes[0].childNodes[0].innerHTML.includes(key))
            {
                HeightDictionary[key] = node.clientHeight
                setGroupStatisticsHeight(window.innerHeight * 0.67);
                setExportHeight(157.5);
            }
        }
    }

    useLayoutEffect(() => {
        parentRef.current?.childNodes.forEach((node: any) => {
            SetHeightForToggle(node);
        });
    }, []);

    return {GroupStatisticsHeight, ExportHeight, parentRef}
}

export default useHeightState;