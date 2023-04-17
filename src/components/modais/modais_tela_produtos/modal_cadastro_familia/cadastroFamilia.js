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
        .grupo{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: end;
            select{
                height: 24px;
            }
            button{
                height: 24px;
            }
            img{
                height: 20px;
                width: 20px;
                margin-top: 15px;
            }
            #descricao{
                width: 100%;
                .descricao{
                    width: 100%;
                }
            }
        }
    }
`