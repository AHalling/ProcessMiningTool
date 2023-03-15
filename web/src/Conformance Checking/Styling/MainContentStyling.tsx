import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
`

export const Groups = styled.div`
      height: 72vh;
      width: 100%;
`

export const Legends = styled.div`
      width: 100%;
      height: 10vh;
`

export const AlignmentGroupsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
    margin 0px;
    ::-webkit-scrollbar {         display: none;       }
`

export const AlignmentGroupWrapper = styled.div `
    text-align: left;
    width:100%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    border-top: 1px solid black;
    &:first-child {
        border:none;
      }
    &:last-child {
        border-bottom:1px solid black;
      }
`
export const ContentWrapper = styled.div `
    display: flex;
    flex-direction: row;
    height: 100%;
    width:100%
`
export const LeftSideDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 7vw;
    height: 100%;
    border-right 1px solid black;
`
export const ButtonWrapper = styled.div`
    width: 7.1vw;
    height: 100%;
    justify-content: space-between;
    margin-bottom: 1vh;
`
export const RepresentationWrapper = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex:direction: column;
`

export const ArrowWrapper = styled.div`
    width: 5%;
    height: 100%;
    float:right;
    padding-top: 2vh;
`

export const GroupTitle = styled.h4`
    margin-top: 0.5vh;
    margin-bottom: 0px;
    margin-left: 5px;
`
export const GroupButton = styled.button `
    height: 40%;
    width: 90%;
    margin: 5px 5px 0px 5px;
    font-size 0.70vw;
    border-radius: 25px;
    outline: none;
    background-color: inherit;
`
export const GroupButtonContent = styled.div`
      height: 100%;
      width: 95%
`

export const ContentButton = styled.button `
    height: 100%;
    width: 100%;
    margin: 0px;
    outline: none;
    border: none;
    padding-left: 0px;
    background-color: inherit;
    display:flex;
    flex-direction:row;
`

