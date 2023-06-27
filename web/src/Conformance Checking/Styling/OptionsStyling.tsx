import styled from "styled-components";

export const OptionsWrapper = styled.div`
    display:flex;
    flex-direction: column;
    padding: 5px 10px 5px 10px;
    font-size: 1vw;
`

export const OptionsForm = styled.form`
`

export const LabelDiv = styled.div`
    display:flex;
    flex-direction: row;
    width:100%;
    > input{
        float:right;
        clear:both;
        align-items: flex-end;
    }
`

export const OptionsLabel = styled.label`
    height: 2vh;
    text-align:left;
    width:15vw;
    margin:2px;

`

export const OptionsInput = styled.input`
    width:30px;
    margin-left:5vw;
    text-align:right;
`

export const OptionLine = styled.div`
    display:flex;
    flex-direction: row;
`
export const InputButton = styled.input`
    margin-right:10px;
    border-radius: 5px;
    border: 0.5px solid black;
`