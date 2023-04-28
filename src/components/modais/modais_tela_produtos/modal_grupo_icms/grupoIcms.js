import styled from "styled-components";

export const Content = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    overflow: auto;
    img:hover{
        cursor: pointer;
    }
`
export const GrupoRegra = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    .fieldset{
        height: 50%;
        border-radius: 10px;
    }
    img{
        height: 20px;
        width: 20px;
        margin: 5px;
    }
    select{
        width: 20%;
        height: 24px;
        margin: 5px;
    }
    .table-responsive{
        overflow: auto;
        height: 75%;
        border: 1px solid grey;
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
export const DadosRegra = styled.div`
    height: 100%;
    width: 95%;
    input{
        height: 24px;
        margin: 2px;
    }
    input[type=checkbox]{
        height: auto;
    }
    .codigo{
        width: 60px;
    }
    .descricao{
        width: 60%;
    }
    .grupo{
        margin: auto;
        width: 95%;
        div{
            display: flex;
            align-items: center;
        }
    }
    .regra{
        select{
            height: 24px;
        }
    }
    select{
        margin: 5px;
    }
    .info{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        select{
            height: 24px;
            width: 80%;
            margin: 5px;
        }
        div{
            width: 100%;
            display: flex;
            justify-content: end;
            margin-right: 5px;
            .descricao{
                width: 55%;
                display: flex;
                justify-content: end;
                input{
                    width: 80%;
                }
                .codigo{
                    width: 60px;
                }
            }
        }
    }
    .icms{
        display: flex;
        width: 100%;
        height: 100%;
        fieldset{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: end;
            border-radius: 5px;
            input{
                width: 60px;
            }
        }
    }
    @media(max-width: 1920px){
        .info{
            width: 100%;
            div{
                width: 100%;
                .descricao{
                    width: 70%;
                    input{
                        width: 80%;
                    }
            }
        }
    }
    @media(max-width: 1440px){
        .info{
            width: 100%;
            div{
                width: 100%;
                .descricao{
                    width: 60%;
                    input{
                        width: 80%;
                    }
            }
        }
    }
`
export const Header = styled.div`
    border: 1.5px;
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    width: 100%;
    background-color: #f0f0f0;    
    .close{
        height: 24px;
        width: 30px;
        border: none;
        border-radius: 0 12px 0 0;
    }
    .close:hover{
        cursor: pointer;
        background-color: red;
    }
`;