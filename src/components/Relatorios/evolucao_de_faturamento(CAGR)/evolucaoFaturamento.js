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

    const [checkNFE, setCheckNFE] = useState(true);
    const [checkNFCE, setCheckNFCE] = useState(true);
    const [checkTOP, setCheckTOP] = useState(true);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = ano + '-' + mes + '-' + dia;

    const [dataFinal, setDataFinal] = useState(dataAtual);
    const [dataInicial, setDataInicial] = useState(dataAtual);

    const divData = dataInicial && dataInicial.split("-");

    function passarMeses() {
        if (divData[1] === '01') {
            setDataInicial(divData[0] + "-02-01");
            setDataFinal(divData[0] + "-02-28");
        } else if (divData[1] === '02') {
            setDataInicial(divData[0] + "-03-01");
            setDataFinal(divData[0] + "-03-31");
        } else if (divData[1] === '03') {
            setDataInicial(divData[0] + "-04-01");
            setDataFinal(divData[0] + "-04-30");
        } else if (divData[1] === '04') {
            setDataInicial(divData[0] + "-05-01");
            setDataFinal(divData[0] + "-05-31");
        } else if (divData[1] === '05') {
            setDataInicial(divData[0] + "-06-01");
            setDataFinal(divData[0] + "-06-30");
        } else if (divData[1] === '06') {
            setDataInicial(divData[0] + "-07-01");
            setDataFinal(divData[0] + "-07-31");
        } else if (divData[1] === '07') {
            setDataInicial(divData[0] + "-08-01");
            setDataFinal(divData[0] + "-08-31");
        } else if (divData[1] === '08') {
            setDataInicial(divData[0] + "-09-01");
            setDataFinal(divData[0] + "-09-30");
        } else if (divData[1] === '09') {
            setDataInicial(divData[0] + "-10-01");
            setDataFinal(divData[0] + "-10-31");
        } else if (divData[1] === '10') {
            setDataInicial(divData[0] + "-11-01");
            setDataFinal(divData[0] + "-11-30");
        } else if (divData[1] === '11') {
            setDataInicial(divData[0] + "-12-01");
            setDataFinal(divData[0] + "-12-31");
        } else if (divData[1] === '12') {
            setDataInicial((parseFloat(divData[0]) + 1).toString() + "-01-01");
            setDataFinal((parseFloat(divData[0]) + 1).toString() + "-01-31");
        }
    }

    function voltarMeses() {
        if (divData[1] === '01') {
            setDataInicial((parseFloat(divData[0]) - 1).toString() + "-12-01");
            setDataFinal((parseFloat(divData[0]) - 1).toString() + "-12-31");
        } else if (divData[1] === '02') {
            setDataInicial(divData[0] + "-01-01");
            setDataFinal(divData[0] + "-01-31");
        } else if (divData[1] === '03') {
            setDataInicial(divData[0] + "-02-01");
            setDataFinal(divData[0] + "-02-28");
        } else if (divData[1] === '04') {
            setDataInicial(divData[0] + "-03-01");
            setDataFinal(divData[0] + "-03-31");
        } else if (divData[1] === '05') {
            setDataInicial(divData[0] + "-04-01");
            setDataFinal(divData[0] + "-04-30");
        } else if (divData[1] === '06') {
            setDataInicial(divData[0] + "-05-01");
            setDataFinal(divData[0] + "-05-31");
        } else if (divData[1] === '07') {
            setDataInicial(divData[0] + "-06-01");
            setDataFinal(divData[0] + "-06-30");
        } else if (divData[1] === '08') {
            setDataInicial(divData[0] + "-07-01");
            setDataFinal(divData[0] + "-07-31");
        } else if (divData[1] === '09') {
            setDataInicial(divData[0] + "-08-01");
            setDataFinal(divData[0] + "-08-31");
        } else if (divData[1] === '10') {
            setDataInicial(divData[0] + "-09-01");
            setDataFinal(divData[0] + "-09-30");
        } else if (divData[1] === '11') {
            setDataInicial(divData[0] + "-10-01");
            setDataFinal(divData[0] + "-10-31");
        } else if (divData[1] === '12') {
            setDataInicial(divData[0] + "-11-01");
            setDataFinal(divData[0] + "-11-30");
        }
    }

    function changeDateIni(e) {
        setDataInicial(e.currentTarget.value);
    }

    function changeDateFin(e) {
        setDataFinal(e.currentTarget.value);
    }

    function handleCheckNFCE(e) {
        setCheckNFCE(e.currentTarget.checked);
    }

    function handleCheckNFE(e) {
        setCheckNFE(e.currentTarget.checked);
    }

    function handleCheckTOP(e) {
        setCheckTOP(e.currentTarget.checked);
    }

    const [aba, setAba] = useState('filial');

    const [abasTopo, setAbasTopo] = useState("filial");

    return (
        <C.Container>
            <C.Header><h3>Evolução de Faturamento (CAGR) </h3></C.Header>

            <LB.Filtros>
                <div className='FTFilterTop' >

                    <div className="btns">
                        <button className="topFilialBtn" onClick={() => setAbasTopo('filial')} >Filial</button>

                        <button className='midBTN' onClick={() => setAbasTopo('top')} >Tops</button>

                        <button className='midBTN' onClick={() => setAbasTopo('grupo')} >Grupo</button>

                        <button className='fornecedorBTN' onClick={() => setAbasTopo('fornecedor')} >Fornecedor</button>
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
                        ) : null}
                    </LB.FilialTop>

                </div>

                <LB.Data>
                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input value={dataInicial} type="date" id="DataIni" onChange={changeDateIni} />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input value={dataFinal} type="date" id="DataFin" onChange={changeDateFin} />
                        </div>
                    </div>

                    <div>
                        <button className='setaE' onClick={voltarMeses} ><img className='close' src='/images/setaEsquerda.png' /></button>
                        <button className='setaD' onClick={passarMeses} ><img className='close' src='/images/setaDireita.png' /></button>
                        <div className='checks' >
                            <input type="checkbox" value="false" id='TOP' checked={checkTOP} /><label>Incluir T.OP. Salvas</label>
                            <input type="checkbox" value="false" id='NFE' checked={checkNFE} /><label>NF-e</label>
                            <input type="checkbox" value="false" id='NFCE' checked={checkNFCE} /><label>NFC-e</label>
                        </div>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <LB.Navegacao>
                <div>
                    <button className='CE'  >Por Filial</button>
                    <button className='botão-filtros'   >Por Produto</button>
                    <button className='botão-filtros'  >Por Produto Quantidade </button>
                    <button className='botão-filtros'  >Por Grupo </button>
                    <button className='CD'  >Por Fornecedor</button>
                </div>
            </LB.Navegacao>

            {aba === 'filial' ? (
                <>
                    <LB.DataGeral>

                    </LB.DataGeral>
                </>
            ) : aba === 'produto' ? (
                <>
                    <LB.DataGeral>

                    </LB.DataGeral>
                </>
            ) : aba === 'prodQTD' ? (
                <>
                    <LB.DataGeral>

                    </LB.DataGeral>
                </>
            ) : aba === 'grupo' ? (
                <>
                    <LB.DataGeral>

                    </LB.DataGeral>
                </>
            ) : aba === 'fornecedor' ? (
                <>
                    <LB.DataGeral>

                    </LB.DataGeral>
                </>
            ) : null}

        </C.Container>
    )

}

export default EvolucaoFaturamento;