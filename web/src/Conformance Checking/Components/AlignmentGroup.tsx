import {Result} from "../../../../types/src/conformanceCheckingTypes";
import AlignmentGroupArrow from "./AlignmentGroupArrow";
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
                            content
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