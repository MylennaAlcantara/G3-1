import styled from "styled-components";

export const DadosGrupo = styled.div`
    display: flex;
    align-items: end;
    #codigo{
        width: auto;
        display: flex;
        flex-direction: row;
        .codigo{
            width: 100px;
            height: 24px;
            border: none;
            box-shadow: 0 5px 5px grey;
        } 
    }
    div{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 0 5px 0 5px;
        .descricao{
            width: 100%;
            height: 24px;
            border: none;
            box-shadow: 0 5px 5px grey;
        }
    }
`
export const EntradaSaida = styled.div`
    display: flex;
    width: 100%;
    .entrada{
        color: red;
    }
    .saida{
        color: blue;
    }
    select{
        width: 75%;
        margin: 5px;
        height: 24px;
        border: none;
        box-shadow: 0 5px 5px grey;
    }
    fieldset{
        margin:auto;
        width: 45%;
        background-color: #F0F0F0;
        border-radius: 10px;
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
        input{
            height: 24px;
            width: 75%;
            margin: 5px;
            border: none;
            box-shadow: 0 5px 5px grey;
        }
    }
    @media(max-width: 1450px){
        select{
            width: 60%;
        }
        fieldset{
            input{
                width: 60%;
            }
        }
    }
`
export const Excecoes = styled.div`
    height: 50%;
    fieldset{
        margin: auto;
        height: 95%;
        width: 95%;
        border-radius: 10px;
    }
    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
    .table-responsive{
        overflow-x: auto;
        height: 100%;
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
export const ExcecaoRegra = styled.div`
    width: 100%;
    height: 75%;
    fieldset{
        width: 95%;
        margin: auto;
        margin-top: 10px;
        background-color: #F0F0F0;
        border-radius: 10px;
        div{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
    input{
        margin: 5px;
        height: 24px;
        border: none;
        box-shadow: 0 5px 5px grey;
    }
    .select-excecao{
        width: 70%;
        box-shadow: 0 5px 5px grey;
    }
    .select-operacao{
        width: 25%;
        box-shadow: 0 5px 5px grey;
    }
    select{
        height: 24px;
        width: 50%;
        margin: 5px;
        border: none;
        box-shadow: 0 5px 5px grey;
    }
    .entrada{
        color: blue;
    }
    .saida{
        color: red;
    }
`