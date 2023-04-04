import styled from "styled-components";

export const Opcoes = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;   
        background-color: #00a5dd;
        border: none;
        border-radius: 5px;
        box-shadow: 0 3px 5px gray;
        height: 50px;
        width: 100px;
    }
    div:hover{
        cursor: pointer;
    }
`