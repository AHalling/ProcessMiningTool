import {Results} from "../../../../types/src/conformanceCheckingTypes";
import {AlignmentGroupsWrapper, AlignmentGroupWrapper} from "../Styling/MainContentStyling";
import AlignmentGroup from "./AlignmentGroup";

type AlignmentGroupsProps = {
    Results: Results
}

const AlignmentGroups = (props: AlignmentGroupsProps) => {
    let i = 0;
    return(
        <AlignmentGroupsWrapper>
            {props.Results.results.map((result) => {
                i = i + 1;
                return(
                    <AlignmentGroupWrapper key={i}>
                        <AlignmentGroup groupNumber={i} amountOfGroups={props.Results.results.length} result={result}/>
                    </AlignmentGroupWrapper>
                )
            })}
        </AlignmentGroupsWrapper>
    )
}

export default AlignmentGroups;