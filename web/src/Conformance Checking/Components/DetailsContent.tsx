import { Result } from "types/build/conformanceCheckingTypes"
import {ContentWrapper, ContentBox, FigureButton, ButtonsDiv} from "../Styling/DetailsContentStyling";
import {StatisticNames} from "../Constants";

type DetailsProps = {
    result: Result | undefined,
}

const DetailsContent = ({result} : DetailsProps) => {

    return(
        <ContentWrapper>
            <ContentBox>
            <table style={{width:"75%", padding: "0px 5px 0px 5px"}}>
                <tbody>
                    <tr style={{fontSize:"1.5rem"}}>
                        <th style={{float:"left"}}>Statistic </th>
                        <th style={{float:"right"}}>Value </th>
                    </tr>
                    {result !== undefined && Object.keys(result.statistics).map(key => {
                        return(
                            <tr key={key} style={{fontSize:"1rem", borderBottom:"1px dotted black"}} >
                                <td style={{fontWeight:"bold", float:"left"}}>
                                    {StatisticNames[key]}
                                </td>
                                <td style={{float:"right"}}>
                                    {result.statistics && result.statistics[key]}
                                </td>
                            </tr>
                            )})}
                </tbody>
            </table>
            <ButtonsDiv>
                <h5 style={{marginTop:"5px", marginBottom:"5px"}}>Figures</h5>
                <FigureButton>
                    Heatmap
                </FigureButton>
                <FigureButton>
                    Plot
                </FigureButton>
                <FigureButton>
                    Model
                </FigureButton>
                <FigureButton>
                    Conditions plot
                </FigureButton>
            </ButtonsDiv>
            </ContentBox>
            <ContentBox>
                <p> Figure placeholder</p>
            </ContentBox>

        </ContentWrapper>
    )
}

export default DetailsContent