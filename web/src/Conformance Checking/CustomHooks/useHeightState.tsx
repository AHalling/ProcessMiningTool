import { useLayoutEffect, useRef } from "react";
import { HeightDictionary } from "../Constants";

const useHeightState = () => {
    const parentRef = useRef<HTMLDivElement | null>(null);

    const SetHeightForToggle = (node: any) =>{
        for (let key in HeightDictionary) {
            if(node.childNodes[0].childNodes[0].innerHTML.includes(key))
            {
                HeightDictionary[key] = node.clientHeight
            }
        }
    }

    useLayoutEffect(() => {
        parentRef.current?.childNodes.forEach((node: any) => {
            SetHeightForToggle(node);
        });
    }, []);

    return {parentRef}
}

export default useHeightState;