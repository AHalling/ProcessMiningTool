import { State} from "types";
import {PreviewWrapper, NoLogH3Wrapper, NoLogH3, LoadedPreviewWrapper, PreviewActionsWrapper,
     PreviewInformationWrapper, PreviewInformationHeader, PreviewInformationBodyWrapperColumn,
      PreviewInformationColumn, ActionsColumn, PreviewButton} from "../Styling/LogPreviewStyling";

type LogPreviewProps = {
    state: State,
    setState: (state: State, graphId?: string) => void;
}

const resetState = (props: LogPreviewProps) => {
    props.setState({pages:"LandingPage", log: null, result: null, workspacePath:props.state.workspacePath})
}

const LogPreview = (props: LogPreviewProps) => {
    return (
        <PreviewWrapper>
            {renderComponent(props)}
        </PreviewWrapper>
    )
}

const handleOpen = (props: LogPreviewProps) => {
    props.setState({pages:"LogPage", log:props.state.log, result: props.state.result, workspacePath: props.state.workspacePath})
}

const renderComponent = (props: LogPreviewProps) => {
    if(props.state.log){
        return (
            <LoadedPreviewWrapper>
                <PreviewInformationWrapper>
                    <PreviewInformationHeader>
                            <h3>Name: {props.state.log.name}</h3>
                    </PreviewInformationHeader>
                    <PreviewInformationBodyWrapperColumn>
                        <PreviewInformationColumn>
                            <PreviewInformationHeader>
                                <h3>Path: {props.state.log.path}</h3>
                            </PreviewInformationHeader>
                        </PreviewInformationColumn>
                        <PreviewInformationColumn>
                            <PreviewInformationHeader>
                                <h3>Statistics</h3>
                            </PreviewInformationHeader>
                        </PreviewInformationColumn>
                    </PreviewInformationBodyWrapperColumn>
                </PreviewInformationWrapper>
                <PreviewActionsWrapper>
                    <ActionsColumn>
                        <PreviewButton 
                            height={"2rem"} 
                            color={'black'}
                            width={'20px'} 
                            onClick={ () => handleOpen(props)}> Open log 
                        </PreviewButton>
                        <PreviewButton
                            height={"2rem"} 
                            color={'black'}
                            width={'20px'} 
                            onClick={ () => resetState(props)}> Reset 
                        </PreviewButton>
                    </ActionsColumn>
                    <ActionsColumn>
                        <PreviewButton
                            height={"2rem"} 
                            color={'black'}
                            width={'20px'}  
                            onClick={ () => resetState(props)}> Inspect Log - TODO 
                        </PreviewButton>
                    </ActionsColumn>
                </PreviewActionsWrapper>
            </LoadedPreviewWrapper>
        )
    }else {
        return (
            <NoLogH3Wrapper>
                <NoLogH3> Please select a log file in the workspace to the left.</NoLogH3>
            </NoLogH3Wrapper>
        )
    }
}

export default LogPreview