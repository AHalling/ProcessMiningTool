import { Chart } from "react-google-charts";

export type ChartOptions = {
    chart: MainChartOptions,
    yAxis: AxisOptions,
    xAxis: AxisOptions,
}

type AxisOptions = {
    title: string
}

type MainChartOptions = {
    title: string,
    subTitle: string,
}

export type Figure = {
    chart: JSX.Element,
}

export const isFigure = (obj: any): obj is JSX.Element => {
    return(true)
}

export type FigureInfo = {
    data: any,
    options: ChartOptions,
    type: PlotTypes,
}

export type PlotTypes = "Scatter" | "Heatmap"