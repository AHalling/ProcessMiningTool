import styled from "styled-components";
import MenuButton from "../../Shared/Components/UIElements/MenuButton";

export const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top:5px;
`

export const NoLogH3Wrapper = styled.div`
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
`

export const NoLogH3 = styled.h3`
    color: black;
    font-size: 24px;
`

export const LoadedPreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 99%;
    height: 98%;
    border: 2px solid black;
    border-radius: 15px;
`

export const PreviewActionsWrapper = styled.div`
    height: 20%;
    width: 100%;
    border-top: 2px solid black;
    display:flex;
    flex-direction:row;
`

export const ActionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100%;
    width: 50%;
    &:nth-child(1) {
        border-right: 2px solid black;
    }
`
export const LogOperationsDiv = styled.div`
    display: flex;
    flex-direction: column;
    height:100%;
    width:50%;
`

export const PreviewInformationWrapper = styled.div`
    height: 80%;
    width: 100%;
`

export const PreviewInformationHeader = styled.div`
    width: 100%;
    height: 10%;
    border-bottom: 2px solid black;
    overflow-wrap: break-word;
    font-size: 1vw;
`

export const PreviewInformationBodyWrapperColumn = styled.div`
    width: 100%;
    height: 54vh;
    display: flex;
    flex-direction: row;
`
export const PreviewInformationColumn = styled(PreviewInformationWrapper)`
    width: 50%;
    height: 100%;
    &:nth-child(1) {
        border-right: 2px solid black;
    }
`

export const PreviewButton = styled(MenuButton)`
    width: 15vh;
    height: 5vh;
    margin:10px;
`