import styled from "styled-components";

interface Props {
    height?: string;
  }

export const Wrapper = styled.div<Props>`
    width: 100%;
    ${(p) =>
        p.height ? "height: " + p.height + ";" : "height:5vh;"}
    display:flex;
    flex-direction: column;
    border-bottom: 1px solid black;
`
export const HeaderWrapper = styled.div `
    display:flex;
    flex-direction: row;
    border-bottom: 1px solid black;
    padding-bottom: 5px;
`

export const Title = styled.h3`
    padding-left: 15px;
    padding-right: 25px;
    margin-bottom: 10px;
    margin-top: 10px;
`

export const Button = styled.button`
    height: 25px;
    width: 12 px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: 10px;
    opacity: 0.8;
    outline: none;
    border: 1px solid black;
    border-radius: 25px;
    padding-top: 4px;
`
export const ComponentWrapper = styled.div`
        overflow-y: scroll;
        width: calc(100% + 20px);
        padding-bottom:5px;
`