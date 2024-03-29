import styled from "styled-components";

export const Filtros = styled.div`
    width: 95%;
    height: 25%;
    margin: 0 auto auto auto;
    display: flex;
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    button{
        height: 24px;
    }
    @media(max-width: 460px){
        height: 50vh;
        flex-direction: column;
    }

`
export const NavBarFiltro = styled.div`
    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
    display: flex;
    justify-content: start;
    width: 95%;
    border: none;
    background-color: white;

    @media(max-width: 460px){
        margin-top: 10px;
    }
`
export const FilialTop = styled.div`
    width: 50%;
    height: 100%;
    border-radius: 10px;
    border-top-left-radius: 0;
    background-color: #F0F0F0;
    .filial-top{
        display: flex;
        width: 100%;
        height: 100%;
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
    img:hover,
    button:hover{
        cursor: pointer;
    }
    .table-responsive{
        display: flex;
        flex-direction: column;
        align-items: start;
        overflow: auto;
        width: 98%;
        height: 80%;
    }
    .tr{
        margin-top: auto;
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
        white-space: nowrap;
    }
    table tr:nth-child(even){
        background-color: #f0f0f0;   
    }
    table tr:nth-child(odd){
        background-color: #ffffe6;
    }
    #table tr td{
        cursor: pointer;
    }
    #table tr:hover td{
        background-color: #87CEFA;
    }
    @media(max-width: 460px){
        width: 100%;
        height: 50%;
        .table-responsive{
            display: flex;
            flex-direction: column;
            align-items: start;
            overflow: auto;
            width: 98%;
            height: 75%;
        }
    }
`
export const Data = styled.div`
    width: 50%;
    margin-left: 10px;
    height: 100%;
    border-radius: 10px;
    background-color: #F0F0F0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow-y: auto;
    .checks{
        margin-top: 10px;
        label{
            font-size: 12px;
        }
        input{
            margin: 3px;
        }
    }
    .select {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin-left: 8px;
        label{
            font-size: 12px;
        }
        select{
            width: 85px;
        }
    }
    .data{    
        width: 105px;
        border-radius: 5px;
        border: 2px solid black;
        height: 48px;
        margin-top: 10px;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        margin-left: 8px;        
    }
    div{
        display: flex;
        .seta{
            width: 45px;
            margin-left: 6px;
        }
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
        overflow-x: auto;
    }
    @media(max-width: 460px){
        margin-top: 10px;
        margin-left: 0px;
        width: 100%;
        height: 50%;
        input{
            width: auto;
        }
        .data{
            overflow-x: auto;
            margin: 10px auto 0 auto;
        }
    }
`
export const Navegacao = styled.div`
    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
    display: flex;
    justify-content: start;
    width: 95%;
    border: none;
    background-color: white;
    button:hover{
        cursor: pointer;
        background-color: #87CEFA;
    }
    div{
        display: flex;
        width: 60%;
        overflow-x: auto;
    }
    .botão-filtros {
        margin-bottom: 0;
        border: 1px solid grey;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    .CE{
        border: 1px solid grey;
        border-radius: 10px 0 0 0;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    .CD{
        border: 1px solid grey;
        border-radius: 0 10px 0 0 ;
        width: 117px;
        height: 33px;
        border-bottom: none;
    }
    @media (max-width: 460px) {
        margin-top: 10px;
        div{
            width: 90%;
        }
        .botão-filtros{
            font-size: 11.8px;
        }
        .CE{
            font-size: 11.8px;
        }
        .CD{
            font-size: 11.8px;
        }
    }
`
export const DataGeral = styled.div`
    width: 95%;
    height: 40%;
    border-style: solid;
    border-width: 1px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    .table-responsive{
        overflow: auto;
        height: 70%;
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
        white-space: nowrap;
    }
    td{
        border: 1px solid grey;
        white-space: nowrap;
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
    @media(max-width: 460px){    
        .table-responsive{
            overflow: auto;
            height: 60%;
            width: 100%;
        }
    }
`
export const Dashboards = styled.div `
    width: 100%; 
    height: 75%; 
    display: flex; 
    flexWrap: wrap;
    .graficos-tipo-pgto{
        display: flex;
        border: 1px solid black;
        background-color: white;
        height: 100%;
        width: 50%;
        overflow: none;
        margin-top: 10px; 
        margin-right: auto;
        border-radius: 8px;
    }
    .grafico-maior{
        width: 50%;
        height: 100%;
        background-color: white;
        border: 1px solid black;
        border-radius: 8px;
        margin: 0px auto;
    }
    @media(max-width: 460px){
        height: 100%;
        display: flex;
        flex-direction: column;
        .graficos-tipo-pgto{
            width: 100%;
        }
        #grafico-barra{
            height: 40%;
        }
        .grafico-maior{
            width: 100%;
            margin: 5px auto;
        }
    }
`
export const Dashboard = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
    height: 40%;
    overflow: auto;
    display: flex;
    justify-content: start;
    align-items: center;
    .grafico{
        width: 400px;
        height: 210px;
        border: 1px solid black;
        border-radius: 8px;
        align-items: center;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
    }
    @media(max-width: 460px){
        height: 100%;
        flex-direction: column;
        overflow: none;
        .grafico{
            width: 100%;
            margin: 5px auto;
        }
    }
`
export const DashboardGrafico = styled.div`
    margin: 10px auto 10px auto;
    display: flex;
    width: 40%;
    overflow: auto;
    background-color: #ffffff;
    display: flex;
    height: 20%;
    border: 1px solid black;
    border-radius: 8px;
    .next{
        display: flex;
        flex-direction: column;
        margin: 2px;
        button{
            margin: 2px;
            width: 100px;
        }
    }
    justify-content: space-between;
    @media(max-width: 460px){
        width: 100%;
        height: 20vh;
    }
`
export const DashboardMenor = styled.div`
height: 45%;
border-style: solid;
border-radius: 10px;
border-width: 2px;
overflow-x: auto;
display: flex;
background-color: #ffffff;
flex-direction: column;
margin: 50px;
.graficosReduzidos{
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
@media(max-width: 420px){
    h2{
        width: 230px;
    }
    width: 250px;
    margin: 20px;
    .graficosReduzidos{
        display: grid;
    }
}
`
export const Dashboard0 = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    .grafico {
        background-color: #ffffff;
        align-items: center;
        display: flex;
        justify-content: space-around;
        width: 32%;
        height: 20%;
        margin: 10px;
        border-style: solid;
        border-radius: 8px;
        border-width: 1px;
    }
    @media(max-width: 420px){
        width: 100%;
        justify-content: center;
        align-items: center;
        .grafico{
            margin: 5px auto 0px auto;
            width: 90%;
            height: 150px;
        }
    }
`
export const LinhaTotais = styled.div`
overflow: auto;
display: flex;
border-style: solid;
border-width: 1px;
width: 95%;
align-items: center;
border-top: transparent;
margin-left: auto;
margin-right: auto;

div{
    font-weight: bold;
    font-size: 10px;
    margin: 2px;
    border-style: solid;
    border-width: 1px;
}

@media(min-width: 1600px){
    div{
        font-size: 14px;
    }
}
`
export const ValoresTipoPagamento = styled.div`
    display: flex;
    overflow-x: auto;
    border: 1px solid black;
    border-right: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 15px;
`
export const CData = styled.div`
    width: 95%;
    height: 50%;
    border-style: solid;
    border-width: 1px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    .table-responsive{
        overflow: auto;
        height: 70%;
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
        white-space: nowrap;
    }
    td{
        border: 1px solid grey;
        white-space: nowrap;
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