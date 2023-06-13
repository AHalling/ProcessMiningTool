import { DynamicStatistics } from "types/build/conformanceCheckingTypes"
import { ChartOptions, ChartSize } from "types/src/chartTypes"

var figureBox = document.getElementById("figureBox");
var size : ChartSize = {
  height: figureBox?.offsetHeight ?? 200,
  width: figureBox?.offsetWidth ?? 400,
}

export const getGroupModelSkipsFigure = (hiddenStats: DynamicStatistics) : void =>{
    var options: ChartOptions = {
        chart: {
          title: "Group Model skips",
          subTitle: ""
        },
        xAxis: { title: "Activity" },
        yAxis: { title: "Model skips" },
        legend:{
            position: 'bottom'
        }
      }

      var data = []
        
    for (let i = 0; i < Object.keys(hiddenStats['totalModelSkipsKeys']).length; i++) {
        if (typeof hiddenStats['totalModelSkipsKeys'] === "object" && typeof hiddenStats['totalModelSkipsValues']=== "object"){
            let key = hiddenStats['totalModelSkipsKeys'][i].toString()
            let value = hiddenStats['totalModelSkipsValues'][i]
            
            data.push([key, value]);
        }

    }
    data.unshift(["Activity", "Model Skips"])

    window.electron.createFigure(data, options, size, "Bar")
}

export const getGroupLogSkipsFigure = (hiddenStats: DynamicStatistics) => {
    var options: ChartOptions = {
        chart: {
          title: "Group Log skips",
          subTitle: ""
        },
        xAxis: { title: "Activity" },
        yAxis: { title: "Log skips" },
        legend:{
            position: 'bottom'
        }
      }

      var data = []
        
    for (let i = 0; i < Object.keys(hiddenStats['totalLogSkipsKeys']).length; i++) {
        if (typeof hiddenStats['totalLogSkipsKeys'] === "object" && typeof hiddenStats['totalLogSkipsValues']=== "object"){
            let key = hiddenStats['totalLogSkipsKeys'][i].toString()
            let value = hiddenStats['totalLogSkipsValues'][i]
            
            data.push([key, value]);
        }

    }
    data.unshift(["Activity", "Log Skips"])

    window.electron.createFigure(data, options, size, "Bar")
}

export const getResultScoresFigure = (hiddenStats: DynamicStatistics) => {
    var options: ChartOptions = {
        chart: {
          title: "Result scores",
          subTitle: ""
        },
        xAxis: { title: "Group" },
        yAxis: { title: "Score" },
        legend:{
            position: 'bottom'
        }
      }

      var data = []
        
    for (let i = 0; i < Object.keys(hiddenStats['scoreKeys']).length; i++) {
        if (typeof hiddenStats['scoreKeys'] === "object" && typeof hiddenStats['scoreValues']=== "object"){
            let key = hiddenStats['scoreKeys'][i].toString()
            let value = hiddenStats['scoreValues'][i]
            data.push([key, value]);
        }

    }
    data.unshift(["Group", "Score"])

    window.electron.createFigure(data, options, size, "Scatter")
}