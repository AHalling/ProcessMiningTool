import styled from "styled-components";

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    overflow-x: hidden;
`

export const MainContent = styled.div`
    height: 100%;
    width: 60vw;
`

export const LeftBar = styled.div`
    height: 100%;
    width: 20vw;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px solid black;
    ::-webkit-scrollbar {         display: none;       }

`

export const StatisticsBar = styled.div`
    height: 100%;
    width: 20vw;
    border-left: 1px solid black;
`
