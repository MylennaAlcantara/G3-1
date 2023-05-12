import styled from 'styled-components'; 

export const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    height: 90vh;
    width: 60vw;
    border: 1px solid black;
    border-radius: 12px;
    position: sticky;
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
        height: 100vh;
        width: 95vw;   
    }
    @media (max-width: 425px){
        width: 90%;
        height: 90%;
        position: relative;
        display: block;
        align-items: end;
        justify-content: space-between;
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
    button{
        margin: 0 5px;
        position: relative;
    }
    .buttons{
        display: flex;
        align-items: start;
        height: 100%;
        border-radius: 0 10px 0 0;
        button{
            margin: 0;
        }
    }
    .minimizar,
    .close{
        height: 100%;
        width: 30px;
        border: none;
        border-radius: 0 10px 0 0;
    }
    .minimizar{
        border-radius: 0;
    }
    .linha{
        margin: auto;
        width: 15px;
        border-bottom: 1px solid black;
    }
    .minimizar:hover{
        cursor: pointer;
        border: 1px solid black;
    }
    .close:hover{
        cursor: pointer;
        background-color: red;
    }
`;
export const Info = styled.div`
    display: block;
    flex-wrap: wrap;
    align-content: center;
    width: 100%;
    .div-info{
        width: 95%;
        display: block;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
   }
    form{
        display: flex;
        width: 100%;
        align-content: center;
        margin: 5px 0;
        justify-content: space-between;
    }
    .checkbox{
        margin: 0 15px;
        background-color: #339afe;
        align-content: center;
        
    }
    .checkbox-box{
        box-shadow: none;
    }
    .radio{
        margin: 0 10px;
        box-shadow: none;
    }
    .cod{
        margin-right: 20%;
        margin-left: 15px;
        width: 60px;
        height: 24px;
    }
    #line{
        margin-left: 20px;
        height: 20px;
        width: 0;
        border-right: 1px solid #000;
    }
    .information{
        width: 100%;
        display: inline-block;
        margin: 5px 0;
        align-content: center;
        justify-content: end;
        .cpf{
            margin-right: 10px;
            height: 24px;
            border: none;
            background-color: #D9D9D9;
            box-shadow: 0 3px 5px gray;
            margin: 0 0 0 3px;
        }
    }
    div{
        margin: 0 5px;
        width: 100%;
        display:flex;
        justify-content: end;
    }
    .f1{
        width: 120px;
        heigth: 24px;
        border: none;
        background-color: #D9D9D9;
        margin: 3px;
        box-shadow: 0 3px 5px gray;
    }
    .option{
        background-color: #D9D9D9;
        border: none;
        margin: 3px 10px 3px 3px;
        width: 70%;
        height: 24px;
        box-shadow: 0 3px 5px gray;
    }
    .div-partner{
        width: 70%;
        margin: 3px 10px 3px 3px;
    }
    .partner{
        width: 100%;
        height: 24px;
        border: none;
        margin: 0;
        background-color: #D9D9D9;
        box-shadow: 0 3px 5px gray;
    }
    label{
        font-size: 15px;
        font-weight: bold;
        color: #373435;
    }
    input{
        margin-right: 10px;
        height: 24px;
        border: none;
        background-color: #D9D9D9;
        box-shadow: 0 3px 5px gray;
    }
    fieldset{
       margin: 0 10px ;
    }

    @media (max-width: 425px){
        height: 45vh;
            form{
                display: block;
                margin-left: 0;
                align-content: start;
                div{
                    justify-content: start;
                }
                
            }
            .atacado-varejo{
                margin-left: 0;
            }
            #checkbox{
                display: block;
                align-content: start;
                justify-content: start;
                margin: 0;
                
            }
            .checkbox{
                display:flex;
                margin: 0;
                width: 300px;
            }
            
        
        .information{
            .cpf{
                height: 24px;
                border: none;
                background-color: #D9D9D9;
                box-shadow: 0 3px 5px gray;
                width: 120px;
            }
            div{
                width: 100%;
                display:flex;
                justify-content: end;
            }
            .div-partner{
                width: 50%;
                margin: 3px 10px 3px 3px;
                display: block;
            }
            .partner{
                width: 100%;
                height: 24px;
                border: none;
                background-color: #D9D9D9;
                box-shadow: 0 3px 5px gray;
            }
        }
        .f1{
            width: 60px;
        }  
        .option{
            width: 50%;
        }
    }
    @media (max-width: 1920px){
        .option{
            width: 80%;
        }
        .div-partner{
            width: 80%;
        }
        .codigo{
            justify-content: start;
        }   
    }
    @media (max-width: 1440px){
        .option{
            width: 70%;
        }
        .div-partner{
            width: 70%;
        }
        .codigo{
            justify-content: start;
        }   
    }
    @media (max-width: 1024px){
        .option{
            width: 70%;
        }
        .div-partner{
            width: 70%;
        }
        .codigo{
            justify-content: start;
        }   
    }
`;
export const Add = styled.div`
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    form{
        width: 90%;
        justify-content: start;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px;
    }
    .div-descrição{
        width: 90%;
    }
    .descrição{
        width: 80%;
        height: 24px;
    }
    .add-item{
        width: 70px;
        height: 24px;
    }
    input{
        height: 24px;
        width: 70px;
        border: none;
        background-color: #D9D9D9;
        margin: 3px;
        box-shadow: 0 3px 5px gray;
    }
    label{
        margin: 0 5px;
        font-size: 15px;
        font-weight: bold;
        color: #373435;
    }
    div{
        display: flex;
    }

    @media (max-width: 1440px){
        height: 15vh;
    }
    @media (max-width: 425px){
        height: 40vh;
        form{
            display: block;
            align-items: end;
        }
        div{
            width: 40vw;
            justify-content: space-between;
        }
        .desconto{
            display: flex;
            width: 85%;
        }        
        button{
            width: 117px;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`
export const Display = styled.div`
    margin: 5px 0;
    background-color: #f0f0f0;
    display: flex;
    align-items: start;
    justify-content: center;
    border: 1px solid black;
    height: 20vh;
    width: 100%;
    overflow-x: auto;
    table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid grey;
    }
    thead{
        position: sticky;
        top:0;
    }
    .table-responsive{
        overflow-x: auto;
        height: 75%;
        width: 100%;
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
    div{
        display: flex;
        flex-grow: 1;
        border: solid 1px gray;
    }
    .button-excluir{
        height: 20px;
        width: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
   }
   .button-excluir:hover{
    cursor: pointer;
}
    @media (max-width: 1920px){
        height: 90vw;   
    }
    @media (max-width: 425px){
        height: 20%;
        width: 100%;
        .table-response{
            overflow-x: auto;
            overflow-y: auto;
        }
    }
`
export const Footer = styled.div`
    width: 100%;
    display: flex;
    display-flex: wrapper;
    flex-direction: column;
    justify-content: flex-end;
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
        .ativo{
            height: 30px;
            width: 30px;
        }
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
        height: auto;
        form{
            margin: 0 25px;
        }
    }
`