import styled from "styled-components";

export const DataGeral = styled.div`
    width: 95%;
    height: 23%;
    border-style: solid;
    border-width: 1px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    .table-responsive{
        overflow: auto;
        height: 70%;
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
        white-space: nowrap;
    }
    td{
        border: 1px solid grey;
        white-space: nowrap;
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
export const Navegacao = styled.div`
    margin-left: 2.4%;
    margin-bottom: 0;
    display: flex;
    justify-content: start;
    width: 95%;
    border: none;
    background-color: white;
    button:hover{
        cursor: pointer;
        background-color: #87CEFA;
    }
    div{
        display: flex;
        width: 60%;
        overflow-x: auto;
    }
    .botão-filtros {
        margin-bottom: 0;
        border: 1px solid grey;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    .CE{
        border: 1px solid grey;
        border-radius: 10px 0 0 0;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    .CD{
        border: 1px solid grey;
        border-radius: 0 10px 0 0 ;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    @media (max-width: 420px) {
        margin-top: 60%;
        div{
            width: 90%;
        }
        .botão-filtros{
            font-size: 11.8px;
        }
        .CE{
            font-size: 11.8px;
        }
        .CD{
            font-size: 11.8px;
        }
    }
`