import styled from "styled-components";

export const Container = styled.div`
    height: 70%;
    width: 80%;
    position: absolute;
    border-radius: 5px;
`
export const Header = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #c5e9f6;
    border-radius: 5px 5px 0 0;
    h1,
    img{
        margin: 0 10px;
    }
    img{
        height: 100%;
    }
    h1{
        font-size: 36px;
        color: grey;
        img{
            height: 40px;
            width: 50px;
        }
    }
`
export const Tabela = styled.div`
    width: 100%;
    height: 80%;
    background-color: #f0f0f0;
    overflow: auto;
    table{
        height: 80%;
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
    }
    thead{
        position: sticky;
        top: 0;
    }
    td,
    th{
        border: 1px solid black;
    }
`
export const Pesquisar = styled.div`
    width: 100%;
    height: 10%;
    background-color: #257fac;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 5px 5px;
    img{
        width: 30px;
        height: 30px;
    }
    input{
        height: 30px;
        width: 100%;
        box-shadow: none;
    }
    img:hover{
        cursor: pointer;
    }
`