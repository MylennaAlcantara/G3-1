import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        flex-direction: column;
    }
    select{
        height: 24px;
        margin: 5px;
    }
    input{
        height:24px;
        width: 50%;
        margin: 5px;
    }
`

export const Lista = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        height: 100px;
        width: 100px;
    }
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        background-color: #033B85;
        border-radius: 100%;
        margin-top: 10%;
        animation-name: logo;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-direction: alternate; 
    }
    @keyframes logo {
        25%{
            background-color: #064EB0;
        }
        50%{
            background-color: #0761DC;
        }
        75%{
            background-color: #2E6CB7;
        }
        100%{
            background-color: #6AB4FD;
        }
    }
    #pontos{
        display: flex;
        align-items: center;
        height: 20px;
        label{
            color: #033B85;
            font-weight: bold;
        }
        .ponto1{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto1;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate; 
        }
        .ponto2{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto2;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
        .ponto3{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto3;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
    }
    @keyframes ponto1{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: 2px
        }
        100%{
            bottom: -2px;
        }
    }
    @keyframes ponto2{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: -2px
        }
        100%{
            bottom: 2px;
        }
    }
    @keyframes ponto3{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: 2px
        }
        100%{
            bottom: -2px;
        }
    }
    .table-responsive{
        overflow-x: auto;
        height: 100%;
        width: 100%;
    }
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
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
`