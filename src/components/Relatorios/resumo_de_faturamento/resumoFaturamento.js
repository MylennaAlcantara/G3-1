import styled from "styled-components";

export const Filtros = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    button{
        height: 24px;
    }
    img:hover,
    button:hover{
        cursor: pointer;
    }
    .table-responsive{
        overflow-x: auto;
        height: 75%;
        width: 100%;
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
`
export const FilialTop = styled.div`
    width: 37vw;
    height: 20vh;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #F0F0F0;
    .filial-top{
        width: 37vw;
        display: flex;
        flex-direction: column;
    }
    input{
        width: 100%;
    }
    div{
        width: 100%;
        display: flex;
        align-items: center;
    }
    @media (max-width: 1440px) {
        width: 28vw;
    .filial-top{
        width: 28vw;
    }

    }

    @media (max-width: 1024px) {
        width: 37vw;
    .filial-top{
        width: 37vw;
    }

    }

`
export const Data = styled.div`
    width: 50%;
    margin-left: 10px;
    height: 20vh;
    border-radius: 10px;
    background-color: #F0F0F0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .checks{
        margin-top: 10px;
    }
    .select {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin-left: 8px;
    }
    .data{    
        width: 120px;
        border-radius: 5px;
        border: 2px solid black;
        height: 52px;
        margin-top: 10px;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
    }
    div{
        display: flex;
    }
    .botao-pesquisar{
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: end;
        button{
            width: 100px;
        }
    }
    .pesquisa-result{
        background-color: #ffffff;
    }
    @media (max-width: 800px) {
        overflow-x: scroll;
    }
`
export const Navigacao = styled.div`
margin-left: 15px;
display: flex;
justify-content: center;
width: 50%;
border-style: solid;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-width: 0.5px;
background-color: #ABADB3;
border-bottom: transparent;

@media (max-width: 1440px) {
    width: 75%;
}
@media (max-width: 800px) {
    width: 85%;
}
`
export const DataGeral = styled.div`
position: static;
margin: 0px;
padding: 0px;
overflow-x: scroll;
overflow-y: scroll;
width: 95%;
height: 30vh;
border-style: solid;
border-width: 1px;
margin-left: 15px;
`
export const Dashboard = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
.grafico {
    margin-right: 10px;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
}
`
export const DashboardMenor = styled.div`
height: 31vh;
border-style: solid;
border-radius: 10px;
border-width: 2px;
display: flex;
flex-direction: column;
margin-left: 40px;
margin-top: 50px;
margin-right: 40px;
.graficosReduzidos{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.graficoA {
    margin: 15px;
}
`