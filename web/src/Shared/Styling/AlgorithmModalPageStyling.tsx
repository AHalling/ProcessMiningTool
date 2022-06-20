import styled from "styled-components";

export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(200,200,200, 0.3);
    position: fixed;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const ModalContainer = styled.div`
    width: 50%;
    height: 50%;
    border-radius: 12px;
    background-color: white;
    box-shadows: rgba(0,0,0,0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
`

export const ModalHeader = styled.div`
    display: inline-block;
    text-align: center;
    margin-top: 10px;
`

export const ModalBody = styled.div`
    flex: 50%;
    display: flex;
    justify-content: left;
    align-items: left;
    font-size: 1.7rem;
    text-align: center;
    overflow-y: scroll;
`

export const ModalFooter = styled.div`
    flex: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
`

export const ModalButton = styled.button`
    width: 150px;
    height: 45px;
    margin: 10px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
`

export const ModalXButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
    float: right;
`

export const ModalXContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ModalHeaderH2 = styled.h2`
    margin-top: 0px;
`

export const ModalListBody = styled.ul`
    width:100%;
    
`

export const ModalListItem = styled.li`
    text-align:left;
    :hover {
        text-shadow: 0 0.015em #101010,0 -0.015em #101010,0.01em 0 #101010,-0.01em 0 #101010;
        cursor: pointer;
    }
`

export const SelectedAlgorithmWrapper = styled.div`
`

export const ModalForm = styled.form`
    display:flex;
    flex-direction: column;
`

export const ModalLabel = styled.label`

`
export const ModalInput = styled.input`
    width: 25vw;
`