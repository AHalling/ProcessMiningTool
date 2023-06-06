import { useEffect, useState } from "react";
import { GetPlot } from "../Components/Charts";
import { FigureInfo } from "types/src/chartTypes";

const useDetailsFigure = () => {
    const [fig, setFigure] = useState<JSX.Element>(<div> No figure</div>)
    
    useEffect(() => {
        window.electron.listenForFigure( (data: FigureInfo) => {
            setFigure(GetPlot(data.data, data.options, data.type))
        })
    })
            

    return fig
}

export default useDetailsFigure;