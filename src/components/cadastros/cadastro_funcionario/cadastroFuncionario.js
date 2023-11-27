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
        display: flex;
        align-items: center;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    @media (max-width: 460px){
        flex-wrap: wrap;
    }
`

export const Geral = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow: auto;
    input{
        height: 24px;
        width: 100%;
        margin: 0px;
        border: none;        
        box-shadow: 0 3px 5px gray;
    }
    .checkbox{
        height: auto;
        width: auto;
    }
    .geral{
        padding: 5px 5px 5px 0;
        width: 90%;
        background-color: #f0f0f0;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-top: 15px;
        label{
            margin: 5px;
        }
        img{
            height: 20px;
            width: 20px;
        }
        img:hover{
            cursor: pointer;
        }
        #municipio-uf{
            margin-right: 0px;
        }
        #municipio{
            width: calc(80% + 83px);
            display: flex;
            justify-content: end;
            margin-left: auto;
            margin-right: 5px;
            #telefone-celular-data{
                margin-right: 0px;
            }
            .telefone-celular-data{
                width: auto;
            }
        }
        .codigo{
            width: 100px;
            height: 24px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        .codigo{
            width: 100px;
            height: 24px;
            margin-right: 5px;
            border: none;        
            box-shadow: 0 3px 5px gray;
        }
        div{
            display: flex;
            justify-content: end;
            align-items: center;
            width: 100%;
        }
        .input-unico{
            width: 80%;
            margin: 0 5px 0 0;
        }
        .div-input{
            display: flex;
            align-items: center;
            select{
                margin-right: 5px;
            }
        }
    }
    @media (max-width: 460px){
        height: 40%;
        .geral{
            heigth: 90%;
            overflow: auto;
            .codigo{
                width: 50px;
            }
            .input-unico{
                width: 60%;
            }
            input{
                width: 100%;
            }
            #municipio{
                display: flex;
                flex-wrap: wrap;
                width: calc(80% + 45px);
                margin-right: 0px;
                .municipio{
                    width: calc(60% - 70px);
                }
                #codigoMunicipio{
                    width: calc(60% - 15px);
                }
                input{
                    width: 60%; 
                }
                #telefone-celular-data{
                    width: 60%;
                    margin-right: 0px;
                }
                .telefone-celular-data{
                    width: 100%;
                }
                #comissao{
                    width: calc(60% - 10px);
                }
                #salario{
                    width: 55%;
                }
                #meta{
                    width: 64%;
                }
                #municipio-uf{
                    width: calc(65% - 5px);
                    margin-right: 5px;
                }
            }
            
            .div-input{
                width: 100%;
                diplay: flex;
                flex-wrap: wrap;
                .codigo{
                    width: 60px;
                }
                input{
                    width: 45%;
                }
            }
            .div-telefone{
                width: 100%;
                diplay: flex;
                flex-wrap: wrap;
            }
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

`