import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: end;
    div{
        display: flex;
        flex-direction: column;
    }
    .search{
        width: 50%;
    }
    input{
        height: 24px;
    }
`;

export const ListItens = styled.div`
    margin: 5px 0;
    div{
        display: flex;
        flex-grow: 1;
        border: solid 1px gray
    }
`;

export const Valores = styled.div`
    display: flex;
    
`;

export const ContainerProdutos = styled.div`
    width: 70%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    overflow-y: auto;
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
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
    .table tr td{
        cursor: pointer;
    }
    .table tr:hover td{
        background-color: #87CEFA;
    }
    .ativo{
        background-color: blue;
        color: white;
    }
`;

export const Preço = styled.div`
    border: solid 1px gray;
    margin: 5px;
    .valores{
        color: #373435;
        font-weight: bold;
    }
    div{
        display: flex;
        justify-content: start;
    }
    label{
        margin: 0 5px;
    }
    .tab-preco{
        display: flex;
    }
    .head-valores{
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
`;

export const Estoque = styled.div`
    margin: 5px;
    border: solid 1px gray;
    label{
        margin: 0 5px;
    }
    div{
        display: flex;
        justify-content: start;
    }
    .tab-estoque{
        display: flex;
    }
    .head-valores{
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .valores{
        color: #373435;
        font-weight: bold;
    }
    .estoque-tot{
        width: 40%;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;

    div{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    }
    label{
        color: red;
        font-weight: bold;
    }
`;