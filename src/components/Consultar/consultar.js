import styled from 'styled-components'; 


export const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 90vh;
    width: 60vw;
    border: 1px solid black;
    border-radius: 12px;
    z-index: 0;
    @media (max-width: 1920px){
        height: 80vh;
        width: 80vw;   
    }
    @media (max-width: 1440px){
        height: 90vh;
        width: 60vw;   
    }
    @media (max-width: 1024px){
        height: 80vh;
        width: 80vw;   
    }
    @media (max-width: 768px){
        height: 80vh;
        width: 95vw;   
    }
    @media (max-width: 460px){
        width: 95%;
        height: 80%;
        position: relative;
        display: block;
        align-items: end;
        justify-content: space-between;
        margin: auto;
        overflow: auto;
    }
`;

export const NaviBar = styled.div`
    display: flex;
    justify-content: start;
    align-content: start;
    position: fixed;
    top: 5px;
    left: auto;
    button{
        color: white;
        font-weight: bold;
        width: 50px;
        height: 30px;
        background-color: red;
        border: 1px solid red;
        margin: 0 0 0 5px;
        border-radius: 5px;
    }
    button:hover{
        cursor: pointer;
    }
`

export const Header = styled.div`
    border: 1.5px;
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 24px;
    width: 100%;
    background-color: #f0f0f0;
    position: sticky;
    top: 0;
    button{
        margin: 0 5px;
        position: relative;
    }
`;

export const Filtro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .div-checkbox{
        display: flex;
        flex-wrap: wrap;
    }
    .line{
        border-right: 1px solid #000;
        margin: 5px
    }
    label{
        margin-right: 5px;
    }
    select{
        height: 24px;
        width: 35%;
    }
    .search{
        height: 24px;
        width: 35%;
    }
    @media (max-width: 425px){
        display: block;
    }
    @media (max-width: 1115px){
        display: block;
    }
`;

export const Rotinas = styled.div`
    margin: 5px 0;
    background-color: #f0f0f0;
    display: flex;
    align-items: start;
    justify-content: start;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    height: 80%;
    width: 100%;
    overflow-x: auto;
    #table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
        border-left: none;
        border-right: none;
    }
    thead{
        position: sticky;
        top: 0;
    }
    th{
        font-size: 15px;
        font-weight: bold;
        color: #373435;    
        background-color: #ffffff;
        border: 1px solid grey;
        white-space: nowrap;
    }
    td{
        white-space: nowrap;
        border: 1px solid grey;
    }
    tr{
        background-color: yellow;
    }
    #table tr td{
        cursor: pointer;
    }
    #table tr:hover td{
        background-color: #87CEFA;
    }
    .ativo{
        background-color: blue;
        color: white;
    }
    .red{
        background-color: red;
    }
    .yellow{
        background-color: yellow;
    }
    .white{
        background-color: white;
    }
    @media (max-width: 460px){
        height: 60%;
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    //position: sticky;
    //bottom: 0;
    .yellow{
        height: 20px;
        width: 20px;
        background-color: yellow;
        border: 1px solid grey;
    }
    .white{
        height: 20px;
        width: 20px;
        background-color: white;
        border: 1px solid grey;
    }

    .green{
        height: 20px;
        width: 20px;
        background-color: #66CDAA;
        border: 1px solid grey;
    }

    .blue{
        height: 20px;
        width: 20px;
        background-color: blue;
        border: 1px solid grey;
    }
    .indice{
        display: block;
    }
    div{
        display: flex;
        margin: 0 5px;
    }
    button{
        width: 117px;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 20px;
            width: 20px;
            margin-right: 5px;
        }
        
    }
    button:hover{
        cursor: pointer;
    }
    
    @media (max-width: 1115px){
        display: block;
        .botoes{
            justify-content: center;
        }
    }
    @media (max-width: 425px){
        display: block;
    }
    
`;