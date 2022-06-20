import { XCircle } from "@styled-icons/boxicons-regular"
import styled from "styled-components";

export const WorkspaceWrapper = styled.div`
  width: 20%;
  height:97%;
  border: 2px solid;
  border-radius:15px;
  margin: 5px;
`

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 3rem;
  width: 50%;
`

export const GraphList = styled.ol`
  list-style: none;
  height: 100%;
  border: 2px solid black;
  border-radius:15px;
  margin: 0.5rem;
  padding: 0rem;
  overflow-y: scroll

`

export const ListElem = styled.li`
  display: flex;
  flex-direction: row;
  background-color: lightgrey;
  :nth-child(odd){
    background-color: inherit;
  }​
`

export const GraphText = styled.div`
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  overflow-x: hidden;
  :hover {
    font-weight: bold;
  }
`

export const StyledX =  styled(XCircle)`
  align-self: flex-end;
  height: 2rem;
  line-height: 2rem;
  padding 5px;
  color: grey;
  cursor: pointer;
  :hover {
    color: black;
  }
`
export const H2 = styled.h2 `
  color: black;
  margin-top:10px;
  margin-bottom:10px;
`