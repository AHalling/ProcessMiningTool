import styled from "styled-components";

export const ModelWrapper = styled.div`
    height: 75%;
    margin:5px;
`

export const ModelWrapperOnLogPage = styled.div`
    height: 70%;
    margin:5px;
    border: 2px solid black;
    border-radius: 25px;
`

export const MenuWrapper = styled.div`
    display:flex;
    flex-direction:row;
    height: 25%;
`

export const MenuPart = styled.div`
    display:flex;
    flex-direction: row;
    border: 2px solid black;
    height: 93%;
    width: 33.33%;
    margin:5px;

` 
export const StatisticsPart = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    height: 93%;
    width: 33.33%;
    margin:5px;
    border: 2px solid black;
`

export const StatisticsBox = styled.div`
    padding: 20px;
    font-size: 1.1vw;
    text-align: center;
    padding-bottom: 0px;
    &:first-child {
        border-right: 1px solid black;
        border-bottom: 1px solid black;
      }
    &:nth-child(2) {
        border-bottom: 1px solid black;
    }
    &:nth-child(3) {
        border-right: 1px solid black;
    }

`

export const StatsHeader = styled.h4`
    margin: 0px;
    font-size: 1vw;
`

export const MenuColumn = styled.div`
    width:50%;
    height:100%;
    font-size: 1vw;
    &:first-child {
        border-right: 1px solid black;
      }
`

export const MenuButton = styled.button`
      border: 1px black solid;
      border-radius: 15px;
      background-color: #555555;
      color: white;
      font-size: 1vw;
      padding: 1vw 2vh;
      margin: 1vw;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
`
export const MenuText = styled.p`
    margin-bottom:5px;
`
export const MenuTitle = styled.h3`

`