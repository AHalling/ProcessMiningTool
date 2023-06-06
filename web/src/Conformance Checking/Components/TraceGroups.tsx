import { AlignmentGroup } from "types/build/conformanceCheckingTypes"
import { TraceGroupsContainer, TraceGroup } from "../Styling/TraceGroupsStyling";
import ActivityIcon from "./ActivityIcon";


type TraceGroupProps = {
    group: AlignmentGroup | undefined | null
}

const TraceGroups = (props: TraceGroupProps) => {
    var noContent : boolean = props.group === undefined || props.group === null;
    var i = 0

    const ShiftLeft = (i: number) : string => {
        return (i*2.05).toString();
    }

    return(
        <TraceGroupsContainer>
            {noContent && <p> No Tracegroups for current content</p>}
            {props.group?.Traces && Object.keys(props.group?.Traces).map((key) => {

                return(
                    <TraceGroup key={(i*i).toString()}>
                        {props.group?.Traces && props.group.Traces[key].map((activity) => {
                            i++;
                            return(
                                <ActivityIcon backgroundColor="green" left={ShiftLeft(i)} activityName={activity} key={i}/>
                )
            })}
                    </TraceGroup>
                )
            })}
        </TraceGroupsContainer>
    )
}

export default TraceGroups