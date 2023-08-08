import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #0063a4;
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
export const AreaInserir = styled.div`
    width: 90%;
    height: 20%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .espaco1,
    .espaco2{
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .espaco2{
        background-color: white;
        border-radius: 10px;
        box-shadow: 3px 3px 8px black;
        display: flex;
        aling-items: center;
        justify-content: center;
        label{
            font-size: 36px;
            color: #000051;
        }
    }

    .campo{
        width: 24%;
        height: 100%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        box-shadow: 3px 3px 8px black;
        label{
            font-weight: bold;
            font-size: 16px;
        }
        input{
            box-shadow: none;
            width: 90%;
            height: 80%;
            text-align: center;
            color: #000051;
            font-weight: bold;
            font-size: 36px;
        }
    }

`

export const ListaItens = styled.div`
    background-color: white;
    width: 90%;
    height: 50%;
    border: 1px solid grey;
    border-radius: 10px;
    table{
        border-collapse: collapse;
        width: 100%;
    }
    tr{
        border-bottom: 1px solid black;
    }
`
export const InformacaoFinal = styled.div`
    width: 90%;
    height: 15%;
    border-radius: 10px;
    display: flex;
    aling-items: center;
    justify-content: space-between;
    .cliente{
        height: 100%;
        width: 30%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        box-shadow: 3px 3px 8px black;
        display: flex;
        .dados-operador{
            height: 100%;
            width: 50%;
            display: flex;
            flex-direction: column;
            aling-items: center;
            justify-content: center;
            div{
                margin: 0 auto;
                width: 90%;
                display: flex;
                aling-items: center;
                justify-content: start;
                label{
                    margin: 0 auto;
                    font-weight: bold;
                }
            }
        }
        .dados-cliente{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            label{
                margin-right: auto;
                font-size: 12px;
            }
        }
    }
    .total{
        height: 100%;
        width: 25%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        box-shadow: 3px 3px 8px black;
        label{
            font-weight: bold;
            font-size: 16px;
        }
        input{
            box-shadow: none;
            width: 90%;
            height: 80%;
            color: #000051;
            font-weight: bold;
            font-size: 36px;
            text-align: center;
        }
    }
    .desc-acresc{
        height: 100%;
        width: 15%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .desc{
            border: 1px solid black;
            border-radius: 10px;
            height: 45%;
            width: 100%;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            box-shadow: 3px 3px 8px black;
            label{
                font-weight: bold;
                font-size: 12px;
            }
            input{
                box-shadow: none;
                width: 90%;
                height: 80%;
                color: green;
                text-align: right;
                font-weight: bold;
            }
        }
        .acresc{
            border: 1px solid black;
            border-radius: 10px;
            height: 45%;
            width: 100%;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            box-shadow: 3px 3px 8px black;
            label{
                font-weight: bold;
                font-size: 12px;
            }
            input{
                box-shadow: none;
                width: 90%;
                height: 80%;
                color: red;
                text-align: right;
                font-weight: bold;
            }
        }
    }
`
export const CampoAtalhos = styled.div`
    width: 90%;
    height: 8%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 3px 3px 8px black;
    img{
        height: 25px;
        width: 25px;
    }
    .ajuda{
        margin: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        label{
            font-weight: bold;
            font-size: 14px;
            color: black;
        }
    }
    label{
        margin: auto;
        font-weight: bold;
        font-size: 36px;
        color: #000051;
    }
    .atalhos{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        aling-items: center;
        justify-content: start;
        label{
            font-size: 12px;
        }
    }
`