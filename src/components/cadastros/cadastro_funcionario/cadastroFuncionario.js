<<<<<<< HEAD
import styled from "styled-components";

export const DadosFuncionario = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    input{
        height: 24px;
        width: 150px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .campo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    div{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    @media (max-width: 425px){
        flex-wrap: wrap;
    }
`

export const Geral = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;
    img{
        height: 20px;
        width: 20px;
    }
    input{
        height: 24px;
        width: 85%;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    .geral{
        width: 90%;
        background-color: #f0f0f0;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-top: 15px;
        .codigo{
            width: 100px;
            height: 24px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        div{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: end;
        }
        .double-input{
            width: 90%;
        }
        .municipio{
            width: 95%;
        }
        .telefone-comissao{
            display: flex;
            justify-content: center;
        }
    }
    @media (max-width: 425px){
        height: 40%;
        .geral{
            heigth: 90%;
            overflow: auto;
            .codigo{
                width: 60px;
            }
        }
        .telefone-comissao{
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
        }
    }
`

export const Documentos = styled.div`
    height: 80%;
    width: 100%;
    overflow: auto;
    input{
        height: 24px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .documentos{
        width: 100%;
        display: block;
    }
    .doc{
        margin-top: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-around;
        background-color: #f0f0f0;
        border-radius: 10px;
    }
    .cpf-ctps{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
    }
    textarea{
        width: 70%;
        height: 200px;
    }
    div{
        display: flex;
        align-items: center;
    }
    @media (max-width: 425px){
        height: 40%;
        overflow: auto;
        .doc{
            flex-wrap: wrap;
        }
    }
`

export const Fieldset = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    fieldset{
        width: 90%;
        background-color: #f0f0f0;
        border-radius: 10px;
        margin-bottom: 5px;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    input{
        height: 24px;
        width: 85%;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }

=======
import styled from "styled-components";

export const DadosFuncionario = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    input{
        height: 24px;
        width: 150px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .campo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    div{
        width: 100%;
        display: flex;
        align-items: center;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    @media (max-width: 425px){
        flex-wrap: wrap;
    }
`

export const Geral = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;
    img{
        height: 20px;
        width: 20px;
    }
    input{
        height: 24px;
        width: 85%;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    .geral{
        width: 90%;
        background-color: #f0f0f0;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-top: 15px;
        .codigo{
            width: 100px;
            height: 24px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        div{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: end;
        }
        .double-input{
            width: 90%;
        }
        .municipio{
            width: 95%;
        }
        .telefone-comissao{
            display: flex;
            justify-content: center;
        }
    }
    @media (max-width: 425px){
        height: 40%;
        .geral{
            heigth: 90%;
            overflow: auto;
            .codigo{
                width: 60px;
            }
        }
        .telefone-comissao{
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
        }
    }
`

export const Documentos = styled.div`
    height: 80%;
    width: 100%;
    overflow: auto;
    input{
        height: 24px;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }
    .documentos{
        width: 100%;
        display: block;
    }
    .doc{
        margin-top: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-around;
        background-color: #f0f0f0;
        border-radius: 10px;
    }
    .cpf-ctps{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
    }
    textarea{
        width: 70%;
        height: 200px;
    }
    div{
        display: flex;
        align-items: center;
    }
    @media (max-width: 425px){
        height: 40%;
        overflow: auto;
        .doc{
            flex-wrap: wrap;
        }
    }
`

export const Fieldset = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    fieldset{
        width: 90%;
        background-color: #f0f0f0;
        border-radius: 10px;
        margin-bottom: 5px;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    input{
        height: 24px;
        width: 85%;
        border: none;        
        box-shadow: 0 3px 5px gray;
        margin: 5px;
    }

>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
`