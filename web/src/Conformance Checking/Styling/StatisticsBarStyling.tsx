import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%
`
export const ExportWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%
`

export const Button = styled.button`
    width: 100px;
    height: 50px;
    border: 1px solid black;
    border-radius: 25px;
    margin-top: 5px;
    margin-bottom: 5px;
`

export const StatisticsTable = styled.table`
    width:90%;
    border-collapse: collapse; 
    padding: 0px;
    margin: 0px;
    margin-left: 10px;
    margin-right: 10px;
`

export const StatisticsTableRow = styled.tr `
    border-bottom: 1px dotted #000;
`

export const StatisticsTableDataKey = styled.td`
    text-align: left;
`
export const StatisticsTableDataValue = styled.td`
    text-align: center;
`