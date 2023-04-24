import styled from "styled-components";

export const DadosGerais = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    overflow: auto;
    input{
        width: 70%;
    }
    input[type=checkbox]{
        width: auto;
    }
    input[type=radio]{
        width: auto;
    }
    fieldset{
        border-radius: 10px;
        margin:auto;
        background-color: #F0F0F0;
    }
    .fieldset{
        display: flex;
    }
    .codigo{
        width: 60px;
    }
    div{
        display: flex;
        align-items: center;
    }
    .rotina{
        display: block;
        margin-right: auto;
    }
`
export const TipoPagamento = styled.div`
    height: 90%;
    div{
        display: flex;
        width: 90%;
        margin: auto;
        align-items: end;
        justify-content: center;
    }
    img{
        height: 20px;
        margin: auto;
    }
    .markup{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
    }
    .table-responsive{
        overflow: auto;
        width: 90%;
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