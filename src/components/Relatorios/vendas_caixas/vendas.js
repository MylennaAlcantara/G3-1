import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    width: 95%;
    height: 90%;
    overflow: auto;
    margin: auto;
    @media(max-width: 460px){
        height: 75%;
        display: grid;
        grid-template-columns: 100%; 
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 
        "graficos"
        "totais";
    }
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
    @media(max-width: 460px){
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        div{
            display: flex;
            align-items: center;
            input[type="date"]{
                width: 100px;
            }
            img{
                height: 30px;
                width: 30px;
            }
        }
    }
`
export const Totais = styled.div`
    height: 90%;
    width: 40%;
    grid-area: totais;
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
        }
    }
    @media(max-width: 460px){
        width: 90%;
        margin: auto;
        .total{
            height: 50px;
        }
        .pgto-caixa,
        .caixa-pgto{
            height: 200px;
        }
    }
`
export const Graficos = styled.div`
    width: 55%;
    margin: auto;
    height: 90%;
    grid-area: graficos;
    overflow: auto;
    .caixa{
        margin-top: -20px;
        height: 240px;
    }
    .A{
        width: 400px;
        height: 250px;
    }
    @media(max-width: 460px){
        height: 600px;
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

`