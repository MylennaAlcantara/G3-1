import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    width: 90%;
    height: 90%;
    overflow: auto;
    margin: auto;
`
export const Filtro = styled.div`
    display: flex;
    justify-content: space-around;
    select{
        width: 120px;
    }
    img{
        height: 20px;
        width: 20px;
        margin: auto 0;
    }
    img:hover{
        cursor: pointer;
    }
`
export const Totais = styled.div`
    height: 90%;
    width: 40%;
    .alinharValor{
        display: flex;
        justify-content: end;
        align-items: center ;
        margin-right: 30px;
        margin-left: 20px;
    }
    .total{
        margin-top: 10px;
        background-color: #064A8B;
        width: 100%;
        height: 10%;
        color: white;
        border-radius: 10px;
        border: 1px solid #00A5DD;
        box-shadow: 3px 5px 5px gray;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .pgto-caixa{
        overflow: auto;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        background-color: #00A5DD;
        width: 100%;
        height: 70%;
        color: white;
        border-radius: 10px;
        border: 1px solid #064A8B;
        box-shadow: 3px 5px 5px gray;
        .pgto{
            display: flex;
            div{
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: end;
                justify-content: space-b;
                label{
                    margin-left: 10px;
                }
            }
        }
    }
    .caixa-pgto{
        overflow: auto;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        background-color: #00A5DD;
        width: 100%;
        height: 40%;
        color: white;
        border-radius: 10px;
        border: 1px solid #064A8B;
        box-shadow: 3px 5px 5px gray;
        .pgto{
            display: flex;
            div{
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: start;
                label{
                    margin-left: 10px;
                }
            }
        }
    }
`

export const Graficos = styled.div`
margin: auto;
.A{
    width: 400px;
    height: 250px;
}
`