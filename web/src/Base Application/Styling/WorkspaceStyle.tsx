import styled from "styled-components";

export const InputWrapper = styled.div`
    padding: 17vh 0;
    text-align: center;
`

export const PathWrapper = styled.div `
    text-overflow: ellipsis;
    overflow-wrap: break-word;
`

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const InputText = styled.p `
    color: black;
    display: block;
`

export const PathField = styled.input `
    width: 90%;
    height: 3vh;
    color: black;
`

export const SearchField = styled.input`
    width:60%;
`

export const WorkspaceClearButton = styled.button `
    width: 60px;
    height: 20px;
    border-radius: 15px;
    float: left;
    margin-left: 5px;
    margin-right: 5px;
`

export const TableData = styled.td `
    border-right: solid 1px black; 
    border-left: solid 1px black;
    width: 34%;
    padding-left: 10px;
    padding-right: 10px;
    overflow-wrap: break-word;
    text-align: left;
`

export const TableRow = styled.tr`
overflow-wrap: break-word;
width: 100%;
font-size: 1vw; 
:hover {
    text-shadow: 0 0.015em #101010,0 -0.015em #101010,0.01em 0 #101010,-0.01em 0 #101010;
    cursor: pointer;
}
`
export const TableWrapper = styled.div`
    height:80%;
    width:100%;
`

export const FilesViewerTable = styled.table`
    overflow-y:scroll;
    height:100%;
    display:block;
`

export const FilesViewerTableBody = styled.table`
    overflow-y: scroll;
    overflow-x: hidden;
`