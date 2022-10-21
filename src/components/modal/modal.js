import styled from 'styled-components'; 

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.80);
    display: flex;
    justify-content: center;
    align-items: center;
    

`;

export const Container = styled.div`
    width: 60%;
    height: 60%;
    background-color: #fff;
    overflow-y: auto;
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
    }
    th{
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
`;

export const Header = styled.div`
    width: 100%;
    height: 10%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close{
        height: 30px;
        width: 30px;
        background-color: red;
        border: none;
    }
`;

