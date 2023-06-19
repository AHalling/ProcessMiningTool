import styled from "styled-components";

export const AlignmentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height: 5.2vh;
    position:relative;
    width: 90%;
    padding: 10px;
    font-size: 14px;
`

export const TraceGroupsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height: 100%;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px black solid;
    overflow-x: scroll;
`

export const Actionable = styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid black;
`