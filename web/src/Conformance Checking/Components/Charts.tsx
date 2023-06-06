import { Chart } from "react-google-charts";
import {ChartOptions, PlotTypes} from "../../../../types/src/chartTypes"
import React from "react";


const ConformanceCheckingCharts= () => {
    return (
        <Chart
            chartType="ScatterChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="100px"
            legendToggle
            />
    )
}

export const GetPlot = (data: any, options: ChartOptions, type: PlotTypes) : JSX.Element => {
    switch (type) {
        case "Scatter":
            return GetScatterPlot(data, options)
        default:
            return (<div>No figure could be created.</div>)
    }
}

export const GetScatterPlot = (data: any, options: ChartOptions) : JSX.Element => {

    // Maybe call electron here?
    
    return (
        <Chart
            chartType="Scatter"
            width="80%"
            height="400px"
            data={data}
            options={options}
      />
    )
}

export default ConformanceCheckingCharts;