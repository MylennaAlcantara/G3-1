import styled from "styled-components";

export const DadosGerais = styled.div`
    width: 100%;
    height: 70%;
    .descricao{
        width: 80%;
    }
    .dados{
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .colunas{
        display: flex;
        width: 90%;
        margin: auto;
        background-color: #f0f0f0;
        border-radius: 10px;
        .coluna{
            margin: auto;
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: end;
            input[type=checkbox]{
                width: auto;
            }
            input{
                width: 100px;
            }
        }
    }
    .comissao-desconto{
        display: flex;
        width: 90%;
        margin: auto;
        fieldset{
            width: 100%;
            border-radius: 10px;
            background-color: #f0f0f0;
        }
    }
    .gerar{
        width: 90%;
        margin: auto;
        fieldset{
            display: flex;
            border-radius: 10px;
            background-color: #f0f0f0;
            .coluna{
                display: flex;
                flex-direction: column;
                align-items: start;
            }
        }
    }
`
export const VinculoPgto = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: end;
    .table-responsive{
        overflow-x: auto;
        height: 75%;
        width: 100%;
    }
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
        margin-top: 2%
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
export const VinculoTabela = styled.div`
    width: 100%;
    height: 80%;
    select{
        width: 200px;
    }
`