<<<<<<< HEAD
import styled from "styled-components";

export const RegraGeral = styled.div`
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
    div{
        width: 100%;
    }
    fieldset{
        margin:auto;
        width: 95%;
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
    div{
        height: 90%;
    }
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
=======
import styled from "styled-components";

export const RegraGeral = styled.div`
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
    div{
        width: 100%;
    }
    fieldset{
        margin:auto;
        width: 95%;
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
    div{
        height: 90%;
    }
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
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
`