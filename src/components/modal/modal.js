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
        font-size: 15px;
        font-weight: bold;
        color: #373435;    
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
    label{
        margin-left: 5px;
    }
    .close{
        height: 30px;
        width: 30px;
        
        border: none;
    }
    .close:hover{
        cursor: pointer;
        background-color: red;
    }
`;

export const Filtro = styled.div`
    width: 100%;
    display: flex;
    margin: 5px 0;
    label{
        font-size: 15px;
        font-weight: bold;
        color: #373435;
        margin-right: 5px;
    }
    .div-checkbox{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .checkbox:hover{
            cursor: pointer;
        }
        div{
            display: flex;
            felx-wrap: wrap;
            justify-content: space-between;
        }
    }
    .div-search{
        display: block;
        width: 80%;
        .search{
            width: 90%;
            height: 24px;
        }
        div{
            display: flex;
            justify-content: end;
            width: 90%;
            .checkbox-search:hover{
            cursor: pointer;
        }
        }
        
    }
`
