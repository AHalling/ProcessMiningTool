import {TopBar, TopBarBox, TopBarContentDiv, TopBarContentTextContainer, TopBarButton} from "../Styling/TopBarStyling";

type TopBarContentProps = {
    LogName: string,
    ModelName: string,
    ChosenGroup: string,
}

const TopBarContent = (props: TopBarContentProps) => {
    return(
        <TopBar>
        <TopBarBox>
            <TopBarContentDiv>
                <TopBarContentTextContainer>
                    Log: {props.LogName}
                </TopBarContentTextContainer>
                <TopBarButton onClick={() => console.log("Clicked")}>
                    Select Log
                </TopBarButton>
            </TopBarContentDiv>
        </TopBarBox>
        <TopBarBox>
            <TopBarContentDiv>
                <TopBarContentTextContainer>
                    Model: {props.ModelName}
                </TopBarContentTextContainer>
                <TopBarButton onClick={() => console.log("Clicked")}>
                    Select Model
                </TopBarButton>
            </TopBarContentDiv>
        </TopBarBox>
        <TopBarBox>
            <TopBarContentTextContainer>
                Selected group: {props.ChosenGroup}
            </TopBarContentTextContainer>
        </TopBarBox>
    </TopBar>
    )
}

export default TopBarContent