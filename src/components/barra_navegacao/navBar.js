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
        z-index: 1;
    }
    .menu:hover{
        cursor: pointer;
    }
`

export const Barra = styled.div `
    height: 100vh;
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
    z-index: 1;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 100%;
        background-color: #064a8b;
        color: white;
        border: 1px solid #00a5dd;
        margin: 5px 0px 0 0px;
        border-radius: 10px 10px 0 0;
    }
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    .gaveta{
        background-color: #00a5dd;
        margin: 0;
        height: auto;
        border: 1px solid #064a8b;
        border-radius: 0;
    }
    div:hover{
        cursor: pointer;
    }

`