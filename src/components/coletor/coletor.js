import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 90%;
    overflow: auto;
    img{
        width: 20px;
        height: 20px;
        margin: 5px;
    }
    img:hover{
        cursor: pointer;
    }
    button{
        width: 80px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cabecalho{
        width: 90%;
        height: 5%;
        margin: 5px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .produto-add{
        label{
            font-weight: bold;
            font-size: 30px;
        }
    }
    .campos-add{
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        .auto{
            transform: scaleX(-1);
        }

    }
    .campo-lista{
        height: 30%; 
        width: 90%;
        margin: auto;
        overflow: auto;
        table{
            border-collapse: collapse;
            width: 100%;
            border: 1px solid grey;
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
        table tr td{
            cursor: pointer;
        }
        table tr:hover td{
            background-color: #87CEFA;
        }
    }
    @media(max-width: 460px){
        
        img{
            width: 30px;
            height: 30px;
        }
        button{
            width: auto;
            padding-right: 2px;
            img{
                width: 20px;
                height: 20px;
            }
        }
        #reader{
            width: 95%;
            margin-top: 10%;
            margin-left: auto;
            margin-right: auto;
            height: 250px;
            display: flex;
            align-items: center;
        }
        .produto-add{
            label{
                font-weight: bold;
                font-size: 28px;
            }
        }
        .campos-add{
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .auto{
                transform: scaleX(-1);
            }
        }    
        .cabecalho{
            width: 90%;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;
        }
    }
`

export const Editar = styled.div`
    width: 300px;
    height: 200px;
    position: absolute;
    background-color: white;
    border-radius: 12px;
    img{
        width: 20px;
        height: 20px; 
    }
    img:hover{
        cursor: pointer;
    }
    .editar{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media(max-width: 460px){
        img{
            width: 30px;
            height: 30px; 
        }
    }
`