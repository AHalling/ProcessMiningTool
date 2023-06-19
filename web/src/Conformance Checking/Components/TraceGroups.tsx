import { AlignmentGroup } from "types/build/conformanceCheckingTypes"
import { TraceGroupsContainer } from "../Styling/AlignmentStyling";
import AlignmentBlock from "./Alignment";


type TraceGroupProps = {
    group: AlignmentGroup | undefined | null,
    setState: Function,
}

const TraceGroups = (props: TraceGroupProps) => {
    var noContent : boolean = props.group === undefined || props.group === null;
    var key = 0;
    return(
        <TraceGroupsContainer>
            {noContent && <p> No Tracegroups for current content</p>}
            {props.group?.GroupAlignemnts && props.group?.GroupAlignemnts.map((alignment) => {
                key++;
                return(
                    <AlignmentBlock alignment={alignment} setState={props.setState} key={key}/>
                )
            })}
        </TraceGroupsContainer>
    )
}

export default TraceGroups