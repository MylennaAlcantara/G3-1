import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: #f5fafd;
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    .campo{
        height: 90px;
        margin: 5px;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 15px;
        border: 5px solid #63aade;
        span{
            background-color: #63aade;
            font-size: 20px;
        }
        label{
            font-size: 36px;
            font-weight: bold;
            margin-left: auto;
        }
    }
`
export const Pagamento = styled.div`
    width: 70%;
    height: 100%;
    .formas-valor{
        width: 100%;
        height: 40%;
        display: flex;
        .formas{
            margin: 5px;
            width: 50%;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 15px;
            border: 5px solid #63aade;
            span{
                background-color: #63aade;
                font-size: 20px;
            }
        }
        .valor{
            width: 50%;
        }
    }
    .recebido{
        width: auto;
        height: 55%;
        margin: 5px;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 15px;
        border: 5px solid #63aade;
        span{
            background-color: #63aade;
            font-size: 20px;
        }
    }
`

export const Valores = styled.div`
    width: 30%;
    height: 100%;
`
export const Troco = styled.div`
    height: 20%;
    width: auto;
    display: flex;
    .mensagem{
        width: 80%;
        .dados-caixa{
            display: flex;
            flex-wrap: wrap;
            div{
                margin: 5px;
                label{
                    margin: 5px;
                }
            }
        }
    }
`