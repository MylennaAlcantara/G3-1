import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    div{
        display: flex;
        flex-direction: column;
        margin: 0 10px 0 10px;
    }
    .search{
        width: 50%;
    }
    label{
        font-size: 15px;
        font-weight: bold;
        color: #373435;
    }
    input{
        height: 24px;
    }
    @media (max-width: 425px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const ListItens = styled.div`
    margin: 5px 0;
    div{
        display: flex;
        flex-grow: 1;
        border: solid 1px gray
    }    
    @media (max-width: 425px){

            overflow: auto;
            height: 50%;
    }

`;

export const Valores = styled.div`
    display: flex;
    @media (max-width: 425px){
        display: block;
    }
`;

export const ContainerProdutos = styled.div`
    width: 70%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    overflow-y: auto;
    .load{
        width: 100%;
        margin-left: 45%;
    }
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
    @media (max-width: 425px){
        height: 90vh;
        width: 90vw;
        overflow-y: auto;
        display: block;
        thead{
            position: sticky;
            top: 0;
        }
    }
`;

export const Preço = styled.div`
    border: solid 1px gray;
    margin: 5px;
    height: 15vw;
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
    @media (max-width: 425px){
        display: block;
        height: 40%;
        overflow-x:auto;
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
    @media (max-width: 425px){
        display: block;
        height: 40%;
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