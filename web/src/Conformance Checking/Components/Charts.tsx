import { Chart } from "react-google-charts";
import {ChartOptions, ChartSize, PlotTypes} from "../../../../types/src/chartTypes"
import React from "react";


const ConformanceCheckingCharts= () => {
    return (
        <Chart
            chartType="ScatterChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="100%"
            legendToggle
            />
    )
}

export const GetPlot = (data: any, options: ChartOptions, size: ChartSize, type: PlotTypes) : JSX.Element => {
    switch (type) {
        case "Scatter":
            return GetScatterPlot(data, options, size)
        default:
            return (<div>No figure could be created.</div>)
    }
}

export const GetScatterPlot = (data: any, options: ChartOptions, size: ChartSize) : JSX.Element => {
    return (
        <Chart
            chartType="Scatter"
            width={size.width}
            height={size.height}
            data={data}
            options={options}
      />
    )
}

export default ConformanceCheckingCharts;