import React, { useContext, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import './evoFatu.css'

export const EvolucaoFaturamento = () => {

    const [filial, setFilial] = useState([]);
    const [produto, setProduto] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [fornecedor, setFornecedor] = useState([]);

    const [dataFinal, setDataFinal] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);

    function changeDateIni(e){
        setDataInicial(e.currentTarget.value);
    }

    function chanceDateFin(e){
        setDataFinal(e.currentTarget.value);
    }

    const [abasTopo, setAbasTopo] = useState("filial");

    return (
        <C.Container>
            <C.Header><h3>Evolução de Faturamento (CAGR) </h3></C.Header>

            <LB.Filtros>
                <div className='FTFilterTop' >

                    <div className="btns">
                        <button className="topFilialBtn" onClick={() => setAbasTopo('filial') } >Filial</button>

                        <button className='midBTN' onClick={() => setAbasTopo('top')} >Tops</button>

                        <button className='midBTN' onClick={() => setAbasTopo('grupo') } >Grupo</button>

                        <button className='fornecedorBTN' onClick={() => setAbasTopo('fornecedor') } >Fornecedor</button>
                    </div>

                    <LB.FilialTop>
                        {abasTopo === "filial" ? (
                            <div className='filial-top' >
                                
                                <div>
                                    <select>
                                        <option>Filial</option>
                                        <option>Região</option>
                                    </select>

                                    <input placeholder='Buscar...' />

                                    <img src='/images/LUPA.png' />
                                </div>

                                <div>
                                    <table id='table' >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Código</th>
                                                <th >Fantasia</th>
                                                <th>Razão Social</th>
                                                <th >Documento</th>
                                                <th >Município</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : abasTopo === 'top' ? (
                            <div className='filial-top' >
                                <div>
                                    <input placeholder='Buscar...' />

                                    <img src='/images/LUPA.png' />
                                </div>

                                <div>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Código</th>
                                                <th >Descrição</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : abasTopo === 'grupo' ? (
                            <div className='filial-top' >
                                <div>
                                    <input placeholder='Buscar...' />

                                    <img src='/images/LUPA.png' />
                                </div>

                                <div>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Código</th>
                                                <th >Grupo</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : abasTopo === 'fornecedor' ? (
                            <div className="filial-top" >
                                <div>
                                    <input placeholder='Buscar...' />

                                    <img src='/images/LUPA.png' />
                                </div>

                                <div>
                                    <table id='table' >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Ativo</th>
                                                <th>Código</th>
                                                <th>Razão Social</th>
                                                <th>Nome Fantasia</th>
                                                <th>Documento</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : null }
                    </LB.FilialTop>

                </div>

                <LB.Data>

                </LB.Data>

            </LB.Filtros>

        </C.Container>
    )

}

export default EvolucaoFaturamento;