import styled from "styled-components";

export const DadosCliente = styled.div`
    padding: 10px;
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
            text-align: left;
        }
    }
    #codigo{
        width: 80px;
    }
    input{
        height: 24px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    #descricao{
        width: 50%;
    }
    @media(max-width: 425px){
        flex-wrap: wrap;
        justify-content: start;
        #descricao{
            width: 100px;
        }
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
    @media(max-width: 425px){
        width: 100%;
        display: flex;
        .informacao{
            height: 90%;
            overflow: auto;
            display: flex;
            flex-wrap: wrap;
        }
    }
`
export const Informacao = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .informacao{
        padding-bottom: 10px;
        width: 90%;
        height: 95%;
        display: block;
        background-color: #F0F0F0;
        overflow-x: auto;
    }
    .codigo{
        width: 100px;
        height: 24px;
        margin-right: 5px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    div{
        display: flex;
        justify-content: end;
        align-items: center;
        width: 100%;
    }
    .input-unico{
        width: 80%;
        margin: 0 5px 0 0;
    }
    input{
        height: 24px;
        width: 100%;
        margin: 0px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    #municipio{
        width: calc(80% + 83px);
        display: flex;
        justify-content: end;
        margin-left: auto;
        margin-right: 5px;
        #telefone-celular-data{
            margin-right: 0px;
        }
        .telefone-celular-data{
            width: auto;
        }
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
        display: flex;
        align-items: center;
        select{
            margin-right: 5px;
        }
    }
    @media(max-width: 460px){
        overflow: auto;
        width: 100%;
        display: flex;
        .codigo{
            width: 50px;
        }
        .informacao{
            display: flex;
            flex-direction: column;
            align-items: end;
        }
        .input-unico{
            width: 60%;
        }
        input{
            width: 100%;
        }
        #municipio{
            display: flex;
            flex-wrap: wrap;
            width: calc(80% + 45px);
            .municipio{
                width: calc(60% - 70px);
            }
            input{
                width: 60%; 
            }
            #complemento{
                width: 65%;
            }
            #cep{
                width: calc(60% - 15px);
            }
            #codigoMunicipio{
                width: calc(60% - 25px);
            }
            #telefone-celular-data{
                width: 60%;
                margin-right: 0px;
            }
            .telefone-celular-data{
                width: 100%;
            }
        }
        
        .div-input{
            width: 100%;
            diplay: flex;
            flex-wrap: wrap;
            .codigo{
                width: 60px;
            }
            input{
                width: 45%;
            }
        }
        .div-telefone{
            width: 100%;
            diplay: flex;
            flex-wrap: wrap;
        }
    }
`
export const Navegacao = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    position: relative;
    top: 0;
    overflow-x: auto;
    div{
        border: 1px solid gray;
        border-radius: 5px 5px 0 0;
        width: 100%;
        background-color: #F0F0F0;
        padding: 2px;
        white-space: nowrap;
        height: 20px;
    }
    div:hover{
        cursor: pointer;
        background-color: white;
    }
    @media(max-width: 700px){
        overflow-x: auto;
        justify-content: start;
        div{
            white-space: nowrap;
        }
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
        white-space: nowrap;
    }
    div:hover{
        background-color: white;
        cursor: pointer;
    }
    @media(max-width: 700px){
        overflow-x: auto;
        justify-content: start;
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
    overflow: auto;
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
            padding-bottom: 10px;
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
        resize: none;
    }
    @media(max-width: 700px){
        height: 78%;
        div{
            margin: auto;
        }
        fieldset{
            overflow: auto;
        }
        textarea{
            height: 100px;
        }
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
    @media(max-width: 700px){
        height: auto;
        .limite{
            div{
                width: 100%;
                overflow: auto;
            }
        }
`