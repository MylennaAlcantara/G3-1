import styled from "styled-components";

export const DadosCliente = styled.div`
    height: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .checkbox{
        display: flex;
        align-items: center;
        div{
            margin-right: 5px;
            display: flex;
            align-items: center;
        }
    }
    input{
        height: 24px;
    }
`
export const Documentos = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cnpj-cpf{
        display: block;
        margin: auto;
    }
    .informacao{
        width: 90%;
        display: flex;
        justify-content: space-around;
        background-color: #F0F0F0;
    }
    label{
        margin: 5px;
    }
    .input-documentos{
        height: 24px;
        width: 100px;
    }
    div{
        display: flex;
        justify-content: end;
    }
`
export const Informacao = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .informacao{
        width: 90%;
        display: block;
        background-color: #F0F0F0;
        overflow-x: auto;
    }
    .codigo{
        width: 100px;
        height: 24px;
    }
    div{
        display: flex;
        justify-content: end;
        width: 100%;
    }
    .input-unico{
        width: 80%;
    }
    input{
        height: 24px;
        width: 66%;
        margin: 5px 5px 0 0;
    }
    .complemento{
        width: 46%;
    }
    .municipio{
        width: 46%;
    }
    label{
        margin: 5px;
    }
`