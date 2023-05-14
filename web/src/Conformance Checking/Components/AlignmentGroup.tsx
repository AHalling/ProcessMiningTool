import {AlignmentGroup} from "../../../../types/src/conformanceCheckingTypes";
import AlignmentGroupArrow from "./AlignmentGroupArrow";
import ActivityIcon from "./ActivityIcon";
import {  colors } from "../Constants";
import {LeftSideDiv, ButtonWrapper, RepresentationWrapper, ArrowWrapper, AlignmentGroupWrapper, ContentWrapper, GroupTitle, GroupButton, ContentButton, GroupButtonContent} from "../Styling/MainContentStyling";

type AlignmentGroupProps = {
    amountOfGroups: number,
    groupNumber: number,
    group: AlignmentGroup,
    openModalFunction: Function,
}

const AlignmentGrouping = (props: AlignmentGroupProps) => {
    
    const handleGroupActivations = () => {
        var currentGroup = document.getElementById(props.group.id)

        props.group.otherGroupsIDInResult.forEach(id => {
            const group = document.getElementById(id);
            if(group !== null)
                group.style.backgroundColor = "inherit";
        });

        if(currentGroup !== null)
            currentGroup.style.backgroundColor = props.group.color;

        // Emit electron event
        window.electron.AlignmentGroupActivation(props.group,  props.group.color)
    }
    let i = 0;
    const handleModalOpen = (type: String) =>{
        window.electron.openModal(type);
    }

    return (
        <AlignmentGroupWrapper id={props.group.id}>
                <LeftSideDiv>
                    <GroupTitle>
                        Group: {props.groupNumber}
                    </GroupTitle>

                    <ButtonWrapper>
                        <GroupButton onClick={() => handleModalOpen("Details")}>
                            Details
                        </GroupButton>
                        <GroupButton onClick={() => handleModalOpen("TraceGroups")}>
                            Trace groups
                        </GroupButton>
                    </ButtonWrapper>
                </LeftSideDiv>
            <ContentWrapper>
                <RepresentationWrapper>
                    <ContentButton onClick={() => handleGroupActivations()}>
                        <GroupButtonContent>
                            <div style={{display:"flex", flexDirection:"row", position:"relative", marginTop:"2vh"}}>
                                {props.group.Alignment.trace.map(trace => {
                                    i = i + 2;
                                    return(
                                        <ActivityIcon backgroundColor={colors[trace[1]]} left={i.toString()} activityName={trace[0]} key={i}/>
                                    )
                                })}
                            </div>
                        </GroupButtonContent>
                        <ArrowWrapper>
                            <AlignmentGroupArrow/>
                        </ArrowWrapper>
                    </ContentButton>
                </RepresentationWrapper>
            </ContentWrapper>
        </AlignmentGroupWrapper>
    )
}

export default AlignmentGrouping 