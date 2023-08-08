import styled from "styled-components";

export const Container = styled.div`
    height: 40%;
    width: 40%;
    
    border-radius: 15px;
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span{
        
        font-size: 18px;
        border-radius: 15px 15px 0 0;
    }
`
export const Tipo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    fieldset{
        width: 50%;
    }

`
export const Valor = styled.div`
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    label{
        font-weight: bold;
    }
    input{
        box-shadow: none;
        width: 30%;
    }
    textarea{
        margin-left: 5px;
        width: 30%;
        height: 100px;
        resize: none;
    }

`

export const Buttons = styled.div`
    height: 15%;
    width: 100%;
    button{
        height: 30px;
        width: 100px;
        border-radius: 50px;
        margin: 5px;
        border: none;
        
    }
`