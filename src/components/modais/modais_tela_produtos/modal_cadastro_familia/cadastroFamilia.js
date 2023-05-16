import styled from "styled-components";

export const DadosFamilia = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    .dados-familia{
        width: 95%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        div{
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 0 5px 0 5px;
            input{
                height: 24px;
                border: none;        
                box-shadow: 0 3px 5px gray;
            }
        }
        #descricao{
            width: 100%;
            .descricao{
                width: 100%;
            }
        }
    }
`
export const DadosProduto = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .dados-produto{
        width: 95%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        div{
            display: flex;
            flex-direction: column;
            align-items: start;
            margin: 0 5px 0 5px;
            input{
                height: 24px;
                border: none;        
                box-shadow: 0 3px 5px gray;
            }
        }
        #descricao{
            width: 40%;
            min-width: 169px;
            .descricao{
                width: 100%;
            }
        }
        .grupo{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: end;
            flex-wrap: wrap;
            select{
                height: 24px;
                width: 150px;
            }
            button{
                height: 24px;
                width: 24px;
                display: flex;
                aling-items: center;
                justify-content: center;
                margin-bottom: 5px;
            }
            img{
                height: 20px;
                width: 20px;
                margin-bottom: 5px;
                margin-left: 5px;
            }
            img:hover{
                cursor: pointer;
            }
            #descricao{
                width: 90%;
                min-width: 169px;
                .descricao{
                    width: 100%;
                }
            }
        }
    }
`