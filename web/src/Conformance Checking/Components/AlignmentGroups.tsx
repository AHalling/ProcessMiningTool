import {Result} from "../../../../types/src/conformanceCheckingTypes";
import {AlignmentGroupsWrapper, AlignmentGroupWrapper} from "../Styling/MainContentStyling";
import AlignmentGrouping from "./AlignmentGroup";
import { Modals } from "types/src/conformanceCheckingTypes";

type AlignmentGroupsProps = {
    Result: Result,
    SetModalOpen: Function,
    modalType: Modals,
}

const AlignmentGroups = (props: AlignmentGroupsProps) => {
    let i = 0;
    return(
        <AlignmentGroupsWrapper>
            {props.Result.alignmentgroups.map((group) => {
                i = i + 1;
                return(
                    <AlignmentGroupWrapper key={i}>
                        <AlignmentGrouping groupNumber={i} amountOfGroups={props.Result.alignmentgroups.length} group={group} openModalFunction={props.SetModalOpen}/>
                    </AlignmentGroupWrapper>
                )
            })}
        </AlignmentGroupsWrapper>
    )
}

export default AlignmentGroups;