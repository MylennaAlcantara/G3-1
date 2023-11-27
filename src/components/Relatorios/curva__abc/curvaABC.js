import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from '../../cadastro/cadastro';
import * as LB from '../resumo_de_faturamento/resumoFaturamento';
import './curvaABC.css';

export const CurvaABC = () => {

    const { user, empresa, cnpjMask } = useContext(AuthContext);

    const [abasTopo, setAbasTopo] = useState('filial');

    const [aba, setAba] = useState('produtos')

    const [checkNFE, setCheckNFE] = useState(true);
    const [checkNFCE, setCheckNFCE] = useState(true);
    const [checkTOP, setCheckTOP] = useState(true);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mesAtu = String(data.getMonth() + 1).padStart(2, '0');
    const anoAtu = data.getFullYear();
    const dataAtual = anoAtu + '-' + mesAtu + '-' + dia;

    const [dataInicial, setDataInicial] = useState(dataAtual);
    const [dataFinal, setDataFinal] = useState(dataAtual);

    return (
        <C.Container>

            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header><h3>Curva ABC (Faturamento)</h3></C.Header>

            <span></span>

            <LB.Filtros>
                <div className="FTFilterTop" >
                    <div className='btns'>
                        <button className='topFilialBtn' onClick={() => setAbasTopo('filial')} >Filial</button>
                        <button className="midBTN" onClick={() => setAbasTopo('top')} >Tops</button>
                        <button className='topsBtn' onClick={() => setAbasTopo('grupo')} >Grupo</button>
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

                                    <img alt="" src='/images/LUPA.png' />
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

                                    <img alt="" src='/images/LUPA.png' />
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

                                    <img alt="" src='/images/LUPA.png' />
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
                        ) : null}
                    </LB.FilialTop>
                </div>

                <LB.Data>

                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input type="date" value={dataInicial} id="DataIni" />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input type="date" value={dataFinal} id="DataFin" />
                        </div>
                    </div>

                    <div>
                        <button className='setaE'  ><img alt="" className='close' src='/images/setaEsquerda.png' /></button>
                        <button className='setaD' ><img alt="" className='close' src='/images/setaDireita.png' /></button>
                        <div className='checks' >
                            <input type="checkbox" checked={checkTOP} value="false" id='TOP' /><label>Incluir T.OP. Salvas</label>
                            <input type="checkbox" checked={checkNFE} value="false" id='NFE' /><label>NF-e</label>
                            <input type="checkbox" checked={checkNFCE} value="false" id='NFCE' /><label>NFC-e</label>
                        </div>

                    </div>

                    <div className='botao-pesquisar'>
                        <button >Pesquisar</button>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <LB.Navegacao>
                <div>
                    <button className='CE' onClick={() => setAba('produtos')}>Produtos</button>
                    <button className='CD' onClick={() => setAba('classificação')} >Classificação</button>
                </div>
            </LB.Navegacao>

            {aba === "produtos" ? (
                <>
                    <LB.CData>
                        <div className='dashboardLine'>

                            <select>
                                <option>Iniciados</option>
                                <option>Terminados</option>
                                <option>Contenha</option>
                            </select>

                            <input className="ipt" placeholder="Buscar..." />

                            <button className='dashboardBtn' > <img alt="" className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>

                        </div>

                        <div className='table-responsive' >
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id.Prod...</th>

                                        <th>Produto</th>

                                        <th>Qtd.Total</th>

                                        <th>Vlr.Desconto Total</th>

                                        <th>Desconto</th>

                                        <th>Sub Total</th>

                                        <th>Vlr.Venda Total</th>

                                        <th>Vlr.Custo Total</th>

                                        <th>Vlr.Lucro Total</th>

                                        <th>Markup</th>

                                        <th>Margem</th>

                                        <th>Percentual</th>

                                        <th>Classificação</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </LB.CData>
                </>
            ) : aba === "classificação" ? (
                <>
                    <LB.CData>
                        <div className='table-responsive' >
                            <table>
                                <thead>
                                    <tr>
                                        <th>Classificação</th>

                                        <th>Qtd.Itens</th>

                                        <th>Qtd.Total</th>

                                        <th>Vlr.Desconto Total</th>

                                        <th>Desconto</th>

                                        <th>Sub.Total</th>

                                        <th>Vlr.Venda Total</th>

                                        <th>Vlr.Custo Total</th>

                                        <th>Vlr.Lucro Total</th>

                                        <th>Markup</th>

                                        <th>Margem</th>

                                        <th>Perc.Faturamento</th>

                                        <th>Perc.Itens</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </LB.CData>
                </>
            ) : null}

        </C.Container>
    )

}

export default CurvaABC;