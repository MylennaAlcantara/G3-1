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
    select{
        width: 20%;
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
        display: flex;
        justify-content: start;
        width: 90%;
        height: auto;
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
    @media(max-width: 700px){
        div{
            flex-wrap: wrap;
        }
    }
`
export const NotasFiscais = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    overflow: auto;
    .codigo{
        width: 60px;
    }
    .grupos{
        margin-top: 5%;
        display: block;
        background-color: #F0F0F0;
        border-radius: 10px;
    }
    div{
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
    }
    input{
        width: 70%;
    }
    input[type=checkbox]{
        width: auto;
    }
    @media(max-width: 1440px){
        input{
            width: 60%;
        }
    }
`
export const EmissaoNfe = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    overflow: auto;
    img{
        height: 20px;
        margin-right: 5px;
    }
    button{
        height: 33px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
    }
    button:hover{
        cursor: pointer;
    }
    .codigo{
        width: 60px;
        margin-right: auto;
    }
    .obs{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    div{
        display: flex;
    }
    .table-responsive{
        margin-top: 10px;
        overflow: auto;
        width: 100%;
        height: 60%;
        background-color: #F0F0F0;
        border-radius: 10px;
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