import styled from "styled-components";

export const DadosCliente = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    .checkbox{
        height: auto;
        display: flex;
        align-items: center;
        div{
            margin-right: 5px;
            display: flex;
            align-items: center;
        }
    }
    input{
        height: 24px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
`
export const Documentos = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cnpj-cpf{
        display: block;
        margin: auto;
    }
    .informacao{
        width: 90%;
        display: flex;
        justify-content: space-around;
        background-color: #F0F0F0;
    }
    label{
        margin: 5px;
    }
    .input-documentos{
        height: 24px;
        width: 100px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    div{
        display: flex;
        justify-content: end;
    }
    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
`
export const Informacao = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .informacao{
        width: 90%;
        height: 95%;
        display: block;
        background-color: #F0F0F0;
        overflow-x: auto;
    }
    .codigo{
        width: 100px;
        height: 24px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    div{
        display: flex;
        justify-content: end;
        width: 100%;
    }
    .input-unico{
        width: 80%;
    }
    input{
        height: 24px;
        width: 66%;
        margin: 5px 5px 0 0;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    .complemento{
        width: 46%;
    }
    .municipio{
        width: 46%;
    }
    label{
        margin: 5px;
    }
    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
    .div-input{
        align-items: center;
        select{
            margin-right: 5px;
        }
    }
`
export const Navegacao = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    top: 0;
    div{
        border: 1px solid gray;
        border-radius: 5px 5px 0 0;
        width: 100%;
        background-color: #F0F0F0;
    }
    div:hover{
        cursor: pointer;
        background-color: white;
    }
`
export const NavegacaoLimites = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    top: 0;
    div{
        border: 1px solid gray;
        width: 100%;
        border-radius: 5px 5px 0 0;
        background-color: #F0F0F0;
    }
    div:hover{
        background-color: white;
        cursor: pointer;
    }
`
export const DadosGerais = styled.div`
    overflow: auto;
    height: 80%;
`
export const DadosAdicionais = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        margin: 20px 0 0 20px;
        width: 90%;
        input{
            height: 24px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        select{
            height: 24px;
            width: 90%;
        }
        fieldset{
            width: 90%;
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
    textarea{
        height: 200px;
        width: 100%;
    }

`
export const Foto = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div{
        height: 200px;
        width: 200px;
        border: 1px solid black;
    }
    input{
        width: 200px;
        margin-top: 5px;
    }
`
export const Historico = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input{
        height: 24px;
        margin: 5px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    fieldset{
        height: 300px;
    }
    .table-responsive{
        overflow-x: auto;
        height: 300px;
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
    .total{
        display: flex;
        justify-content: end;
        label{
            margin-right: 10px;
                    font-weight: bold;
        color: #373435;
        }
    }
    .limite{
        .limites{
            display: flex;
            flex-direction: column;
            width: 300px;
            div{
                display: flex;
                justify-content: end;
            }
        }
    }
    
`