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

    const handleSelectClick = (type: string) => {
          window.electron.SelectFile(type);
    }

    return(
        <TopBar>
        <TopBarBox>
            <TopBarContentDiv>
                <TopBarContentTextContainer>
                    Log: {props.LogName}
                </TopBarContentTextContainer>
                <TopBarButton onClick={() => handleSelectClick("Log")}>
                    Select Log
                </TopBarButton>
            </TopBarContentDiv>
        </TopBarBox>
        <TopBarBox>
            <TopBarContentDiv>
                <TopBarContentTextContainer>
                    Model: {props.ModelName}
                </TopBarContentTextContainer>
                <TopBarButton onClick={() => handleSelectClick("Model")}>
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