import {Result} from "../../../../types/src/conformanceCheckingTypes";
import AlignmentGroupArrow from "./AlignmentGroupArrow";
import ActivityIcon from "./ActivityIcon";
import Dots from "./DotsIcon";
import { GroupColors } from "../Constants";
import {LeftSideDiv, ButtonWrapper, RepresentationWrapper, ArrowWrapper, AlignmentGroupWrapper, ContentWrapper, GroupTitle, GroupButton, ContentButton, GroupButtonContent} from "../Styling/MainContentStyling";

type AlignmentGroupProps = {
    groupNumber: number,
    amountOfGroups: number,
    result: Result,
}

const AlignmentGroup = (props: AlignmentGroupProps) => {
    let color : string;
    const handleGroupActivations = () => {
        var currentGroup = document.getElementById(props.groupNumber.toString())

        for (let i : number = 1; i < props.amountOfGroups+1; i++) {

            color =  GroupColors[props.groupNumber % GroupColors.length]
            const group = document.getElementById(i.toString());

            if(group !== null)
                group.style.backgroundColor = "inherit";
          }

        if(currentGroup !== null)
            currentGroup.style.backgroundColor = color;

        // Emit electron event
        window.electron.AlignmentGroupActivation(props.result, color)
    }

    return (
        <AlignmentGroupWrapper id={props.groupNumber.toString()}>
                <LeftSideDiv>
                    <GroupTitle>
                        Group: {props.groupNumber}
                    </GroupTitle>

                    <ButtonWrapper>
                        <GroupButton onClick={() => console.log("Details clicked")}>
                            Details
                        </GroupButton>
                        <GroupButton onClick={() => console.log("Trace groups clicked")}>
                            Trace groups
                        </GroupButton>
                    </ButtonWrapper>
                </LeftSideDiv>
            <ContentWrapper>
                <RepresentationWrapper>
                    <ContentButton onClick={() => handleGroupActivations()}>
                        <GroupButtonContent>
                            <div style={{display:"flex", flexDirection:"row", position:"relative", marginTop:"2vh"}}>
                                <ActivityIcon backgroundColor="green" left="0" activityName="A"/>
                                <ActivityIcon backgroundColor="yellow" left="2" activityName="B"/>
                                <ActivityIcon backgroundColor="purple" left="4" activityName="C"/>
                                <Dots/>
                                <ActivityIcon backgroundColor="green" left="16" activityName="A"/>
                                <ActivityIcon backgroundColor="yellow" left="18" activityName="B"/>
                                <ActivityIcon backgroundColor="purple" left="20" activityName="C"/>
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

export default AlignmentGroup 