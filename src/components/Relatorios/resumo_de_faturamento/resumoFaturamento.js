import styled from "styled-components";

export const Filtros = styled.div`
    width: 95%;
    height: 25%;
    margin: auto;
    display: flex;
    img{
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
    button{
        height: 24px;
    }
    @media(max-width: 420px){
        display: grid;
    }

`
export const FilialTop = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border-top-left-radius: 0;
    background-color: #F0F0F0;
    .filial-top{
        overflow: auto;
        display: flex;
        width: 100%;
        height: 100%;
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
    img:hover,
    button:hover{
        cursor: pointer;
    }
    .table-responsive{
        overflow: auto;
        width: 100%;
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
    @media (max-width: 420px) {
        margin-top: 5%;
        width: 97%;
        margin-left: 0px;
        height: 23vh;
        .data{
            overflow-x: auto;
        }
    }
`
export const Navegacao = styled.div`
    margin: auto;
    margin-bottom: 0;
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
    @media (max-width: 420px) {
        margin-top: 60%;
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

      
`
export const Dashboard = styled.div`
margin-top: 10px;
display: flex;
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
.grafico-reg{
    overflow: auto;
    background-color: #ffffff;
    display: flex;
    width: 80%;
    height: 400px;
    margin-right: 10px;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
}
.grafico {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    width: 310px;
    height: 210px;
    margin-right: 10px;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
}
@media(max-width: 420px){
    display: grid;
    .grafico{
        margin: 10px;
    }
}
@media(min-width: 1500px){
    .grafico{
        width: 32%;
        height: 310px;    
    }
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
margin: 10px;
flex-wrap: wrap;
align-items: center;
justify-content: center;
.grafico {
    background-color: #ffffff;
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 32%;
    height: 95%;
    margin: 10px;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
}
@media(max-width: 420px){
    justify-content: center;
    align-items: center;
    display: grid;
    .grafico{
        width: 300px;
    }
}
@media(min-width: 1500px){
    .grafico{
        width: 45%;
        height: 310px;
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
export const A = styled.div`
overflow-x: auto;
.ajuste{
    display: flex;
}
.labels{
    border-style: solid;
    border-left: transparent;
    border-bottom: transparent;
    height: 35px;
    margin-right: 5px;
    border-top: transparent;
    border-width: 1px;
    font-weight: bold;
    font-size: 15px;
    background-color: #ffffff;
    width: 300px;
}
`