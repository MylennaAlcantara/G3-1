import styled from "styled-components";

export const InfoItem = styled.div`
    width: 100%;
    display: flex;
    background-color: #F0F0F0;
    border-radius: 5px;
    margin-bottom: 5px;
    .div-info{
        width: 100%;
    }
    .campos{
        display: flex;
        width: 100%;
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
            justify-content: center;
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
`
export const Geral = styled.div`
    height: 80%;
    width: 100%;
    .geral{
        height: 100%;
        border-radius: 5px;
        margin:  5px 0 5px 0;
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
        }
        div{
            display: flex;
            align-items: center;
        }
        textarea{
            margin: 5px;
            height: 70%;
            width: 90%;
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
`
export const Tributacao = styled.div`
    height: 80%;
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
    }
    .ippt{
        width: 100%;
        background-color: #F0F0F0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        .opcao{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .bc-icms{
            display: block;
        }
        div{
            display: flex;
            align-items: center;
        }
        img{
            height: 20px;
            width: 20px;
        }
    }
`
export const Custo = styled.div`
    height: 80%;
    width: 100%;
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
export const Estoque = styled.div`
    height: 80%;
    width: 100%;
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
export const Movimentação = styled.div`
    height: 80%;
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
    #data{
        display: flex;
        width: 100%;
        background-color: #F0F0F0;
        margin: 5px 0 5px 0;
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
export const Fornecedores = styled.div`
    height: 80%;
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
        fieldset{
            height: 30%;
            background-color: #F0F0F0;
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
        }
    }
`
export const Promocao = styled.div`
    height: 80%;
    width: 100%;
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
export const Validade = styled.div`
    height: 80%;
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