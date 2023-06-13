import styled from "styled-components";

export const ContentWrapper = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const ContentBox = styled.div`
    height:50%;
    width: 100%;
    display:flex;
    flex-direction: row;
`

export const FigureBox = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row;
`
export const StatisticRow = styled.div`
    width: 100%;

` 
export const ButtonsDiv = styled.div `
    width: 25%;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
`
export const FigureButton = styled.button `
    height: 3vh;
    width: 90%;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    outline: none;
    border: 1px solid black;
    padding-left: 2.5vw;
    background-color: inherit;
    display:flex;
    flex-direction:row;
    cursor: pointer;
    border-radius: 8px;
    text-align:center;
    font-size: 0.90vw;

`
