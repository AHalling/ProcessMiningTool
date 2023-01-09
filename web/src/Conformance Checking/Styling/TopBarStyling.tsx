import styled from "styled-components";

export const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    height: 5.2vh;
`

export const TopBarBox = styled.div`
    display: flex;
    flex-direction:row;
    width: 30%;
    text-align: left;
    padding-left: 5px;
    border-bottom: 1px black solid;
    padding-top: 0.6rem;
    :nth-child(-n + 2){
        border-right: 1px black solid;
        width: 35%;
      }

`

export const TopBarContentDiv = styled.div`
      font-size: 1rem;
      display:flex;
      flex-direction: row;
`
export const TopBarContentTextContainer = styled.div`
    line-height: 3vh;
    width:13vw;
    font-size 0.90vw;
    overflow-x: hidden;
`

    export const TopBarButton = styled.button `
    height: 3.5vh;
    width: 7vw;
    margin-left: 5px;
    margin-right: 5px;
    font-size 0.75vw;
    border-radius: 25px;
    outline: none;
`