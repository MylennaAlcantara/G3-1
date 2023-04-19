<<<<<<< HEAD
import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        flex-direction: column;
    }
    select{
        height: 24px;
        margin: 5px;
    }
    input{
        height:24px;
        width: 50%;
        margin: 5px;
    }
`

export const Lista = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .table-responsive{
        overflow-x: auto;
        height: 100%;
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
=======
import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        flex-direction: column;
    }
    select{
        height: 24px;
        margin: 5px;
    }
    input{
        height:24px;
        width: 50%;
        margin: 5px;
    }
`

export const Lista = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .table-responsive{
        overflow-x: auto;
        height: 100%;
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
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
`