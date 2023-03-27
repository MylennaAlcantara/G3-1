import styled from "styled-components";

export const DadosCliente = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    .checkbox{
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
    div{
        border: 1px solid gray;
    }
    div:hover{
        cursor: pointer;
    }
`
export const DadosGerais = styled.div`

`
export const DadosAdicionais = styled.div`
    widht: 100%;
    height: 100%;
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
        height: 100%;
        width: 100%;
    }

`
export const Foto = styled.div`

`
export const Historico = styled.div`

`