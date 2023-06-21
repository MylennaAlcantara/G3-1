import styled from "styled-components";

export const Container = styled.div`
    .menu{
        height: 40px;
        width: 20px;
        font-size: 25px;
        background-color: #105b9e;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 0 40% 40% 0;
        position: fixed;
        left: 150px;
        z-index: 2;
        img{
            height: 20px;
            width: 20px;
        }
    }
    .menu:hover{
        cursor: pointer;
    }
`

export const Barra = styled.div `
    height: 100%;
    width: 150px;
    background-color: white;
    background-image: url('/images/lateral.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 2;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 100%;
        background-color: #064a8b;
        color: white;
        font-size: 13px;
        border: 1px solid #00a5dd;
        margin: 5px 0px 0 0px;
        border-radius: 10px 10px 0 0;
    }
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    .seta{
        transform: rotate(90deg);
        height: 15px;
        width: 15px;
    }
    .gaveta{
        background-color: #00a5dd;
        margin: 0;
        height: 30px;
        border-radius: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    div:hover{
        border-bottom: 1px solid #064a8b;
        cursor: pointer;
    }
    .sincronizar{
        position: fixed;
        bottom: 50px;
        color: white;
        font-weight: bold;
        width: 117px;
        height: 33px;
        background-color: orange;
        border: 1px solid orange;
        border-radius: 5px;
    }
    .sincronizar-sinc{
        position: fixed;
        bottom: 50px;
        color: white;
        font-weight: bold;
        width: 117px;
        height: 33px;
        background-color: orange;
        border: 1px solid orange;
        border-radius: 5px;
    }
    button{
        position: fixed;
        bottom: 15px;
        color: white;
        font-weight: bold;
        width: 117px;
        height: 33px;
        background-color: red;
        border: 1px solid red;
        border-radius: 5px;
    }
    button:hover{
        cursor: pointer;
    }
    .sincronizando{
        margin-left: 20px;
        background-color: yellow;
        color: red;
        font-weight: bold;
        font-size: 12px;
        border: 1px solid orange;
        border-radius: 30px 20px 20px 0px;
        width: 100px;
        position: fixed;
        bottom: 85px;
    }
    .sincronizar:hover,
    .sincronizando:hover{
        cursor: wait;
    }
    .sincronizado{
        margin-left: 20px;
        background-color: Green;
        color: white;
        border-radius: 30px 20px 20px 0px;
        width: 100px;
        position: fixed;
        bottom: 85px;
    }

    .sincronizar-sinc:hover{
        cursor: pointer;
    }
    .sincronizado:hover{
        cursor: auto;
    }
    @keyframes hide {
        from { opacity: 1 }
        to   { opacity: 0 }
    }
    
    .sincronizado {
    animation: hide 2s 2s forwards
    }

    .loader {
        margin-left: 2px;
        background-color: yellow;
        animation: is-rotating 1s infinite;
        border: 3px solid #51d4db;
        border-radius: 50%;
        border-top-color: #00a5dd;
        height: 5px;
        width: 5px;
    }
    
    @keyframes is-rotating {
    to {
        transform: rotate(1turn);
    }
    }
`