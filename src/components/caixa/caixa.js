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
    }

    .campo{
        width: 24%;
        height: 100%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        label{
            font-weight: bold;
            font-size: 18px;
        }
    }

`

export const ListaItens = styled.div`
    background-color: white;
    width: 90%;
    height: 50%;
    border-radius: 10px;
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
    }
    .total{
        height: 100%;
        width: 25%;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
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
        }
        .acresc{
            border: 1px solid black;
            border-radius: 10px;
            height: 45%;
            width: 100%;
            background-color: white;
        }
    }
`