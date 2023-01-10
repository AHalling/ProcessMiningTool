import {TopBar, TopBarBox, TopBarContentDiv, TopBarContentTextContainer, TopBarButton} from "../Styling/TopBarStyling";
import {useEffect} from 'react';

type TopBarContentProps = {
    LogName: string,
    ModelName: string,
    resultName: string,
}

const TopBarContent = (props: TopBarContentProps) => {

    useEffect(() => {
        if( typeof props.resultName === "undefined"){
            props.resultName = "Select a result."
        }
    }, [props])

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
                Viewing result: {props.resultName}
            </TopBarContentTextContainer>
        </TopBarBox>
    </TopBar>
    )
}

export default TopBarContent