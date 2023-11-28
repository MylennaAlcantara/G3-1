import styled from "styled-components";

export const InfoItem = styled.div`
    width: 100%;
    display: flex;
    background-color: #F0F0F0;
    border-radius: 10px;
    margin-bottom: 5px;
    label{
        font-size: 12px;
    }
    .div-info{
        width: 100%;
        div{
            display: flex;
            justify-content: start;
            label{
                width: 70px;
                text-align: end;
                resize: none;
            }
        }
    }
    .campos{
        display: flex;
        justify-content: start;
        width: 100%;
        label{
            width: 80px;
            text-align: end;
        }
        input{
            height: 24px;
            width: 120px;
            margin: 5px;
        }
        img{
            height: 20px;
            width: 20px;
        }
        img:hover{
            cursor: pointer;
        }
        div{ 
            display:flex;
            width: 100%;
            align-items: center;
            justify-content: start;
        }
        .checkbox{
            height: auto;
            width: auto;
        }
    }
    .input-check{
        height: auto;
        box-shadow: none;
    }
    input{
        height: 24px;
        width: 80%;
        margin: 5px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    #checkbox{
        display: block;
        input{
            width: 120px;
        }
        .checkbox{
            display: block;
            .check{
                display: flex;
                align-items: center;
                justify-content: start;
                input{
                    margin: 0;
                    width: 20px;
                }
            }
        }
        div{
            display: flex;
            justify-content: start;
        }
    }
    @media(max-width: 700px){
        display: block;
        height: 30%;
        overflow: auto;
    }
`
export const Geral = styled.div`
    height: 40%;
    width: 100%;
    .geral{
        height: 100%;
        border-radius: 5px;
        margin:  5px 0 5px 0;
        overflow: auto;
    }
    div{
        display: flex;
        width: 100%;
    }
    .table-responsive{
        display: block;
        overflow: auto;
        height: 80%;
        background-color: white;
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
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
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
    .unid-fornecedor{
        display: block;
        height: 100%;
        .fieldset{
            height: 50%;
            border-radius: 10px;
        }
        fieldset{
            border-radius: 10px;
            background-color: #F0F0F0;
            overflow: auto;
        }
        div{
            display: flex;
            align-items: center;
        }
        textarea{
            margin: 5px;
            height: 70%;
            width: 90%;
            resize: none;
        }    
        .codigo{
            width: 50px;
            margin: 5px;
        }
        input{
            height: 24px;
            width: 120px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        select{
            height: 24px;
        }
        img{
            height: 20px;
            width: 20px;
        }
        img:hover{
            cursor: pointer;
        }
    }
    @media(max-width: 700px){
        .geral{
            display: block;
        }
        .table-responsive{
            height: 30%;
        }
        .table-responsive{
            height: 100px;
        }
    }
`
export const Tributacao = styled.div`
    height: 40%;
    width: 100%;
    overflow: auto;
    .tributacao{
        display: flex;
        width: 100%;
        input{
            height: 24px;
            width: 30%;
            border: none;        
            box-shadow: 0 3px 5px gray;
            margin: 5px;
        }
        .input-check{
            height: auto;
            box-shadow: none;
        }
        .codigo{
            width: 50px;
        }
        fieldset{
            background-color: #F0F0F0;
        }
    }
    .icms{
        width: 100%;
        .origem{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mva{
            width: 100%;
            display: flex;
            button{
                height: 50px;
            }
            button:hover{
                cursor: pointer;
            }
        }
        select{
            height: 24px;
            width: 100px;
        }
        fieldset{
            border-radius: 10px;
        }
    }
    .ippt{
        width: 100%;
        background-color: #F0F0F0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        .opcao{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
        }
        .bc-icms{
            display: flex;
            flex-direction: column;
            width: 90%;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
        img{
            height: 20px;
            width: 20px;
        }
    }
    @media(max-width: 700px){
        .tributacao{
            display: block;
        }
    }
`
export const Custo = styled.div`
    height: 40%;
    width: 100%;
    .table-responsive{
        height: 90%;
        overflow: auto;
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
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
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
`
export const Estoque = styled.div`
    height: 40%;
    width: 100%;
    .table-responsive{
        height: 90%;
        overflow: auto;
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
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
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
`
export const Movimentação = styled.div`
    height: 40%;
    width: 100%;
    img{
        height: 20px;
        width: 20px;
    }
    input{
        height: 24px;
        border: none;
        margin: 5px;        
        box-shadow: 0 3px 5px gray;
    }
    .gerar-mov{
        width: 117px;
        display: flex;
        align-items: center;
        height: 33px;
    }
    #data{
        display: flex;
        width: 100%;
        background-color: #F0F0F0;
        margin: 5px 0 5px 0;
        overflow: auto;
    }
    .data{
        display: flex;
    }
    div{
        width: 100%;
    }
    .ultima{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .table-responsive{
        height: 90%;
        overflow: auto;
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
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
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
    @media(max-width: 700px){
        .table-responsive{
            height: 100px;
        }
    }
`
export const Fornecedores = styled.div`
    height: 40%;
    width: 100%;
    img{
        height: 20px;
        width: 20px;
    }
    input{
        height: 24px;
        width: 150px;
        border: none;
        margin: 5px;        
        box-shadow: 0 3px 5px gray;
    }
    .fornecedores{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        overflow: auto;
        fieldset{
            height: 30%;
            background-color: #F0F0F0;
            border-radius: 10px;
        }
        .foto{
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #foto{
            height: 150px;
            width: 150px;
            border: 1px solid black;
        }
        .div-fornecedor{
            height: 100%;
            width: 80%;
            margin: 5px;
            textarea{
                height: 80%;
                width: 90%;
                resize: none;
            }                
            .pesos{
                display: flex;
            }
            .table-responsive{
                height: 100%;
                overflow: auto;
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
                white-space: nowrap;
            }
            td{
                white-space: nowrap;
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
        }
    }

    @media(max-width: 700px){
        .fornecedores{
            display: flex;
            flex-direction: column;
            align-items: center;
            .pesos{
                flex-wrap: wrap;
            }
            fieldset{
                height: 100px;
            }
        }
    }
`
export const Promocao = styled.div`
    height: 40%;
    width: 100%;
    .table-responsive{
        height: 90%;
        overflow: auto;
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
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
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
`
export const Validade = styled.div`
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    select{
        width: 50%;
        margin: 5px;
    }
    .table-responsive{
        height: 90%;
        overflow: auto;
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
`