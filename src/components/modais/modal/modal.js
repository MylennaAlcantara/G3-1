import styled from 'styled-components'; 

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.80);
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 420px){
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
    }

`;

export const Container = styled.div`
    width: 60%;
    height: 60%;
    background-color: #fff;
    .table-responsive{
        overflow-x: auto;
        height: 75%;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
        margin-top: 2%
    }
    thead{
        position: sticky;
        top:0;
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
    @media (max-width: 420px){
        height: 80%;
        width: 90%;
        overflow-y: initial;
        .table-responsive{
            overflow-x: auto;
        }
        #table{
            width: 100%;
        }
    }
`;

export const Header = styled.div`
    width: 100%;
    height: 10%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
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
    position: sticky;
    top: 10%;
    background-color: white;
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
        position: sticky;
        top:0;
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
export const Footer = styled.div`
    width: 100%;
    display: flex;
    display-flex: wrapper;
    flex-direction: column;
    justify-content: flex-end;
    height: 40%;
    form{
        
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px 0;
        input{
            width: 70px;
            height: 24px;
            border: none;
            background-color: #F0F0F0;
            margin: 3px;
            box-shadow: 0 5px 5px #ABADB3;
        }
        label{
            font-size: 15px;
            font-weight: bold;
            color: #373435;
        }
    }
    .buttons{
        height: 67px;
        display: flex;
        background-color: #F0F0F0;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 12px 12px;
        button{
            width: 117px;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        button:hover{
            cursor: pointer;
        }
        img{
            height: 20px;
            width: 20px;
            margin-right: 5px;
        }
    }
    @media (max-width: 425px){
        height: 30vh;
        form{
            margin: 0 25px;
        }
    }
`
