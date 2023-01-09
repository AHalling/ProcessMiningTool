import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
`

export const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    width:100%;
    height: 5.2vh;
`

export const TopBarBox = styled.div`
    display: inline-block;
    width: 33%;
    text-align: left;
    padding-left: 5px;
    border-bottom: 1px black solid;
    padding-top: 0.9rem;
    :nth-child(-n + 2){
        border-right: 1px black solid;
      }

`
export const Groups = styled.div`
      height: 72vh;
      width: 100%;
`

export const Legends = styled.div`
      width: 100%;
      height: 10vh;
`

export const GroupButton = styled.button `
      
`