import styled from "styled-components";

export const Filtros = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    button{
        height: 24px;
    }
    img:hover,
    button:hover{
        cursor: pointer;
    }
    .table-responsive{
        overflow-x: auto;
        height: 75%;
        width: 100%;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
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
export const FilialTop = styled.div`
    width: 50%;
    height: 20vh;
    border-radius: 10px;
    background-color: #F0F0F0;
    .filial-top{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    input{
        width: 100%;
    }
    div{
        width: 100%;
        display: flex;
        align-items: center;
    }
`
export const Data = styled.div`
    width: 50%;
    margin-left: 10px;
    height: 20vh;
    border-radius: 10px;
    background-color: #F0F0F0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .data{    
        width: 120px;
        border-radius: 5px;
        border: 2px solid black;
        height: 52px;
        margin-top: 10px;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
    }
    div{
        display: flex;
    }
    .botao-pesquisar{
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: end;
        button{
            width: 100px;
        }
    }
`
export const Navigacao = styled.div`
margin-left: 15px;
display: flex;
justify-content: center;
width: 50%;
border-style: solid;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-width: 2px;
`

export const DataGeral = styled.div`
position: static;
margin: 0px;
padding: 0px;
overflow-x: scroll;
overflow-y: scroll;
width: 95%;
height: 30vh;
border-style: solid;
border-width: 1px;
margin-left: 15px;
`