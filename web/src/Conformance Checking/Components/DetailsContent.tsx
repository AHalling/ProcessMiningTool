import { Result } from "types/build/conformanceCheckingTypes"
import {ContentWrapper, ContentBox, FigureButton, ButtonsDiv} from "../Styling/DetailsContentStyling";
import {StatisticNames} from "../Constants";
import { AlignmentGroup, DynamicStatistics } from "types/src/conformanceCheckingTypes";
import {ChartOptions, ChartSize} from "../../../../types/src/chartTypes";

type DetailsProps = {
    result: Result | undefined,
    selectedGroup: AlignmentGroup | null | undefined,
    figure: JSX.Element,
}

const DetailsContent = ({result, selectedGroup, figure} : DetailsProps) => {

    var newStats : DynamicStatistics = {}
    if(result?.statistics && selectedGroup?.GroupStatistics){
        Object.assign(newStats, result?.statistics, selectedGroup?.GroupStatistics);
    }

    const getHeatMap = () : void => {
        var figureBox = document.getElementById("figureBox");

        var size : ChartSize = {
            height: figureBox?.offsetHeight ?? 200,
            width: figureBox?.offsetWidth ?? 400,
        }

        var options: ChartOptions = {
            chart: {
              title: "Scatter plot",
              subTitle: "based on hours studied",
            },
            xAxis: { title: "Hours Studied" },
            yAxis: { title: "Grade" },
            legend:{
                position: 'bottom'
            }
          }

        var data =[
            ["Hours Studied", "Final"],
            [0, 67],
            [1, 88],
            [2, 77],
            [3, 93],
            [4, 85],
            [5, 91],
            [6, 71],
            [7, 78],
            [8, 93],
            [9, 80],
            [10, 82],
            [0, 75],
            [5, 80],
            [3, 90],
            [1, 72],
            [5, 75],
            [6, 68],
            [7, 98],
            [3, 82],
            [9, 94],
            [2, 79],
            [2, 95],
            [2, 86],
            [3, 67],
            [4, 60],
            [2, 80],
            [6, 92],
            [2, 81],
            [8, 79],
            [9, 83],
            [3, 75],
            [1, 80],
            [3, 71],
            [3, 89],
            [4, 92],
            [5, 85],
            [6, 92],
            [7, 78],
            [6, 95],
            [3, 81],
            [0, 64],
            [4, 85],
            [2, 83],
            [3, 96],
            [4, 77],
            [5, 89],
            [4, 89],
            [7, 84],
            [4, 92],
            [9, 98],
          ];

          window.electron.createFigure(data, options, size, "Scatter")
    }
    return(
        <ContentWrapper>
            <ContentBox>
            <table style={{width:"75%", padding: "0px 5px 0px 5px"}}>
                <tbody>
                    <tr style={{fontSize:"1.5rem"}}>
                        <th style={{float:"left"}}>Statistic </th>
                        <th style={{float:"right"}}>Value </th>
                    </tr>
                    {result !== undefined && Object.keys(newStats).map(key => {
                        return(
                            <tr key={key} style={{fontSize:"1rem", borderBottom:"1px dotted black"}} >
                                <td style={{fontWeight:"bold", float:"left"}}>
                                    {StatisticNames[key]}
                                </td>
                                <td style={{float:"right"}}>
                                    {newStats && newStats[key]}
                                </td>
                            </tr>
                            )})}
                </tbody>
            </table>
            <ButtonsDiv>
                <h5 style={{marginTop:"5px", marginBottom:"5px"}}>Figures</h5>
                <FigureButton onClick={(() => getHeatMap())}>
                    Heatmap
                </FigureButton>
                <FigureButton onClick={(() => getHeatMap())}>
                    Plot
                </FigureButton>
                <FigureButton onClick={(() => getHeatMap())}>
                    Model
                </FigureButton>
            </ButtonsDiv>
            </ContentBox>
            <ContentBox id="figureBox">
                {figure}
            </ContentBox>

        </ContentWrapper>
    )
}

export default DetailsContent