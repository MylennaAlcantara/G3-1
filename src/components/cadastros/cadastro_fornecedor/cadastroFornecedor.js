import styled from "styled-components";

export const Documentos = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cnpj-cpf{
        display: block;
        margin: auto;
    }
    .informacao{
        width: 50%;
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
        justify-content: start;
    }
    select{
        height: 24px;
    }
    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
`
export const Informacao = styled.div`
    width: 100%;
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
    .bairro{
        width: 39%;
    }
    .complemento{
        width: 25%;
    }
    .municipio{
        width: 46%;
    }
    label{
        margin: 5px;
    }
    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
    .div-input{
        align-items: center;
        select{
            margin-right: 5px;
        }
    }
`
export const OutrosDados = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const Historico = styled.div`
    height: 80%;
    overflow-x: auto;
    fieldset{
        margin: 5px;
        display: flex;
        flex-direction: column;
        align-items: start;
        label{
            font-weight: bold;
        }
    }
    .table-responsive{
        overflow-x: auto;
        height: 200px;
        width: 100%;
    }
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
    }
    thead{
        position: sticky;
        top:0;
    }
    th{    
        font-size: 15px;
        font-weight: bold;
        color: #373435;    
        background-color: #ffffff;
        border: 1px solid grey;
    }
    td{
        border: 1px solid grey;
    }
    table tr:nth-child(even){
        background-color: #ffffe6;
    }
    table tr:nth-child(odd){
        background-color: #f0f0f0;   
    }
    #table tr td{
        cursor: pointer;
    }
    #table tr:hover td{
        background-color: #87CEFA;
    }
`