<<<<<<< HEAD
import styled from "styled-components";

export const Cadastros = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const TabelasI = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        .colunas-rotina{
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .checkbox{
            width: auto;
            height: auto;
            margin: 0;
        }
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        .op-rotinas{
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const TabelasII = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const Configuracao = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    fieldset{
        width: 50%;
        margin: 5px;
        border-radius: 10px;
    }
    .op-rotinas{
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: end;
    }
`
export const Financeiro = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 100%;
        display: flex;
        flex-direction: column;
        input{
            margin-left: 10px;
        }
        fieldset{
            width: 75%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            .super{
                border-radius: 0 0 0 10px;
                background-color: yellow;
                display: flex;
                justify-content: start;
            }
        }
        .nome{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: start;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
        .colunas-caixa{
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
            .coluna{
                width: 100%;
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                align-items: end;
                fieldset{
                    width: 100%;
                }
                div{
                    width: 100%;
                }
            }
            .coluna2{
                width: 50%;
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                align-items: end;
                fieldset{
                    width: 100%;
                }
                div{
                    width: 100%;
                }
            }
        }
    }
    @media(max-width: 1450px){
        .colunas{
            .colunas-caixa{
                width: 80%;
                .coluna{
                    width: 100%;
                }
            }
        }
    }
`
export const Relatorios = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        .div-relatorio{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        fieldset{
            width: 80%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const Utilitarios = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: 5px;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: start;
        }
    }
=======
import styled from "styled-components";

export const Cadastros = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const TabelasI = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        .colunas-rotina{
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .checkbox{
            width: auto;
            height: auto;
            margin: 0;
        }
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        .op-rotinas{
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const TabelasII = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            .super{
                border-radius: 0 0 10px 10px;
                background-color: yellow;
            }
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const Configuracao = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    fieldset{
        width: 50%;
        margin: 5px;
        border-radius: 10px;
    }
    .op-rotinas{
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: end;
    }
`
export const Financeiro = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 100%;
        display: flex;
        flex-direction: column;
        input{
            margin-left: 10px;
        }
        fieldset{
            width: 75%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            .super{
                border-radius: 0 0 0 10px;
                background-color: yellow;
                display: flex;
                justify-content: start;
            }
        }
        .nome{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: start;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
        .colunas-caixa{
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
            .coluna{
                width: 100%;
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                align-items: end;
                fieldset{
                    width: 100%;
                }
                div{
                    width: 100%;
                }
            }
            .coluna2{
                width: 50%;
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                align-items: end;
                fieldset{
                    width: 100%;
                }
                div{
                    width: 100%;
                }
            }
        }
    }
    @media(max-width: 1450px){
        .colunas{
            .colunas-caixa{
                width: 80%;
                .coluna{
                    width: 100%;
                }
            }
        }
    }
`
export const Relatorios = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: auto;
        }
        .div-relatorio{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        fieldset{
            width: 80%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: end;
        }
    }
`
export const Utilitarios = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    overflow: auto;
    .colunas{
        width: 90%;
        margin-right: 20px;
        input{
            margin-left: 5px;
        }
        fieldset{
            width: 50%;
            margin: 5px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: start;
        }
    }
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
`