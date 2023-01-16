import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%
    y-overflow: scroll;
`
export const ListWrapper = styled.div`
    height:100%;
`
export const ListOfResults = styled.ol`
    margin 0px 5px 0px 5px;
    padding: 0px;
`

export const ResultListItem = styled.li`
    border-bottom: 1px solid black;
    width: 50%
    text-align:center
    margin-right: 50px;
    list-style-type: none;
`
export const Button = styled.button`
    width: 100%;
    height:100%
    opacity: 0.8;
    border: none;
    padding-top: 4px;
    cursor:pointer;
`

export const Table = styled.table` 
    margin-left: auto;
    margin-right: auto;
`

export const TableData = styled.td`
    padding-right: 5vw;
    text-align:left;
`

type ColorDivProps={
    backgroundColor: string,
}
export const ColorDiv = styled.div<ColorDivProps>`
    ${(p) =>
        p.backgroundColor ? "background-color: " + p.backgroundColor + ";" : "background-color:purple"}
    height: 1vh;
    width: 1vw;
`