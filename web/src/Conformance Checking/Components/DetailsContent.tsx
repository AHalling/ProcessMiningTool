import { Result } from "types/build/conformanceCheckingTypes"
import {ContentWrapper, ContentBox, FigureButton, ButtonsDiv} from "../Styling/DetailsContentStyling";
import {StatisticNames} from "../Constants";
import { AlignmentGroup, DynamicStatistics } from "types/src/conformanceCheckingTypes";
import {getGroupModelSkipsFigure, getGroupLogSkipsFigure, getResultScoresFigure} from "./ChartsCreator";

type DetailsProps = {
    result: Result | undefined,
    selectedGroup: AlignmentGroup | null | undefined,
    figure: JSX.Element,
}

const DetailsContent = ({result, selectedGroup, figure} : DetailsProps) => {
    var newStats : DynamicStatistics = {}
    var hiddenStats : DynamicStatistics = {}
    if(result?.statistics && selectedGroup?.GroupStatistics){
        Object.keys(result?.statistics).forEach(stat => {
            var type = typeof(result?.statistics[stat])
            if (type === "number" || type === "string"){
                newStats[stat] = result?.statistics[stat]
            }else{
                hiddenStats[stat] = result?.statistics[stat]
            }
            
        });

        Object.keys(selectedGroup?.GroupStatistics).forEach(stat => {
            var type = typeof(selectedGroup?.GroupStatistics[stat])
            if (type === "number" || type === "string"){
                newStats[stat] = selectedGroup?.GroupStatistics[stat]
            }else{
                hiddenStats[stat] = selectedGroup?.GroupStatistics[stat]
            }
            
        });
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
                <FigureButton onClick={(() => getGroupModelSkipsFigure(hiddenStats))}>
                    Group Model skips
                </FigureButton>
                <FigureButton onClick={(() => getGroupLogSkipsFigure(hiddenStats))}>
                    Group Log skips
                </FigureButton>
                {/* <FigureButton onClick={(() => getHeatMap())}>
                    Group Aligned
                </FigureButton> */}
                <FigureButton onClick={(() => getResultScoresFigure(hiddenStats))}>
                    Result scores
                </FigureButton>
                {/* <FigureButton onClick={(() => getHeatMap(selectedGroup?.GroupStatistics, ""))}>
                    Heatmap
                </FigureButton> */}
            </ButtonsDiv>
            </ContentBox>
            <ContentBox id="figureBox">
                {figure}
            </ContentBox>

        </ContentWrapper>
    )
}

export default DetailsContent