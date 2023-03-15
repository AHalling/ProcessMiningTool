import {Result} from "../../../../types/src/conformanceCheckingTypes";
import {AlignmentGroupsWrapper, AlignmentGroupWrapper} from "../Styling/MainContentStyling";
import AlignmentGrouping from "./AlignmentGroup";

type AlignmentGroupsProps = {
    Result: Result
}

const AlignmentGroups = (props: AlignmentGroupsProps) => {
    let i = 0;
    return(
        <AlignmentGroupsWrapper>
            {props.Result.alignmentgroups.map((group) => {
                i = i + 1;
                return(
                    <AlignmentGroupWrapper key={i}>
                        <AlignmentGrouping groupNumber={i} amountOfGroups={props.Result.alignmentgroups.length} group={group}/>
                    </AlignmentGroupWrapper>
                )
            })}
        </AlignmentGroupsWrapper>
    )
}

export default AlignmentGroups;