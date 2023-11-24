import styled from "styled-components";

export const Documentos = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cnpj-cpf{
        display: block;
        margin: auto;
    }
    .informacao{
        width: 50%;
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
        justify-content: start;
    }
    select{
        height: 24px;
    }
    img{
        height: 20px;
        width: 20px;
        margin: auto 5px;
    }
    img:hover{
        cursor: pointer;
    }
`
export const Informacao = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .informacao{
        width: 90%;
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
    .bairro{
        width: 100%;
    }
    .complemento{
        width: auto;
    }
    label{
        margin: 5px;
    }
    img{
        height: 20px;
        width: 20px;
        margin: auto 5px;
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
        #bairro-complemento{
            display: flex;
            flex-wrap: wrap;
            .bairro{
                width: calc(60% + 5px);
            }
            .complemento{
                width: calc(60% + 5px);
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
export const OutrosDados = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const Historico = styled.div`
    height: 80%;
    overflow-x: auto;
    fieldset{
        margin: 5px;
        display: flex;
        flex-direction: column;
        align-items: start;
        label{
            font-weight: bold;
        }
    }
    .table-responsive{
        overflow-x: auto;
        height: 200px;
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
`