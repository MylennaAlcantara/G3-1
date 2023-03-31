import styled from "styled-components";

export const InfoItem = styled.div`
    width: 100%;
    display: flex;
    background-color: #F0F0F0;
    border-radius: 5px;
    margin-bottom: 5px;
    .campos{
        display: flex;
        width: 100%;
        input{
            height: 24px;
            width: 120px;
            margin: 5px;
        }
        img{
            height: 20px;
            width: 20px;
        }
        div{
        display:flex;
        width: 100%;
        align-items: center;
        }
    }
    
    input{
        height: 24px;
        width: 80%;
        margin: 5px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    #checkbox{
        display: block;
        input{
            width: 120px;
        }
        .checkbox{
            display: block;
            .check{
                display: flex;
                align-items: center;
                justify-content: start;
                input{
                    margin: 0;
                    width: 20px;
                }
            }
        }
        div{
            display: flex;
            justify-content: start;
        }
    }
`
export const Geral = styled.div`
    height: 80%;
    width: 100%;
    .geral{
        height: 100%;
        background-color: #F0F0F0;
        border-radius: 5px;
        margin:  5px 0 5px 0;
    }
    div{
        display: flex;
        width: 100%;
    }
    .table-responsive{
        overflow: auto;
    }
    .unid-fornecedor{
        display: block;
        height: 100%;
        .fieldset{
            height: 50%;
        }
        div{
            display: flex;
            align-items: center;
        }
        textarea{
            margin: 5px;
            height: 70%;
            width: 90%;
        }
        input{
            height: 24px;
            width: 120px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        select{
            height: 24px;
        }
        img{
            height: 20px;
            width: 20px;
        }
    }
`
export const Tributacao = styled.div`
    height: 80%;
    width: 100%;
    .tributacao{
        display: flex;
        input{
            height: 24px;
        }
        .codigo{
            width: 50px;
        }
    }
    .ippt{
        img{
            height: 20px;
            width: 20px;
        }
    }
`
export const Custo = styled.div`

`
export const Estoque = styled.div`

`
export const Movimentação = styled.div`

`
export const Fornecedores = styled.div`

`
export const Promocao = styled.div`

`
export const Validade = styled.div`

`