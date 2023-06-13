import { Chart } from "react-google-charts";
import {ChartOptions, ChartSize, PlotTypes} from "../../../../types/src/chartTypes"
import { Result } from "types/build/conformanceCheckingTypes";


const ConformanceCheckingCharts= (result: Result | undefined) : JSX.Element => {
    if(result === undefined)
        return(<div> Waiting for result </div>)

    var figureBox = document.getElementById("leftWrapper");
    var size : ChartSize = {
        height: figureBox?.offsetHeight ?? 200,
        width: figureBox?.offsetWidth ?? 400,
    }

    let logMove = 0;
    let modelMove = 0;
    let aligned = 0;

    result.alignmentgroups.forEach(group => {
        group.Alignment.trace.forEach(activity => {
            if(activity[1] === "consume")
                aligned++;

            if(activity[1] === "model-skip")
                modelMove++;

            if(activity[1] === "trace-skip")
                logMove++;

        })
    });
    var data = [];
    data.push(['Aligned', aligned])
    data.push(['ModelMove', modelMove])
    data.push(['LogMove', logMove])


    data.unshift(["Move", "Count"])

    return (
        <Chart
            chartType="PieChart"
            data={data}
            width={size.width}
            height={size.height}
            legendToggle
            />
    )
}

export const GetPlot = (data: any, options: ChartOptions, size: ChartSize, type: PlotTypes) : JSX.Element => {
    switch (type) {
        case "Scatter":
            return GetScatterPlot(data, options, size)
        case "Bar":
            return GetBarPlot(data, options, size)
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

export const GetBarPlot = (data: any, options: ChartOptions, size: ChartSize) : JSX.Element => {
    return (
        <Chart
            chartType="Bar"
            width={size.width}
            height={size.height}
            data={data}
            options={options}
      />
    )
}

export default ConformanceCheckingCharts;