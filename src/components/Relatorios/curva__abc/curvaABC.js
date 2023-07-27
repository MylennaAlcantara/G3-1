import React, { useState, useContext } from "react";
import Modal from 'react-modal'
import { Loading } from "../../loading";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from '../../cadastro/cadastro'
import * as LB from '../resumo_de_faturamento/resumoFaturamento'

export const CurvaABC = () => {

    const { user, empresa, cnpjMask } = useContext(AuthContext);

    const [abasTopo, setAbasTopo] = useState('filial');

    const [aba, setAba] = useState('produtos')

    return (
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
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
                        ) : null}
                    </LB.FilialTop>
                </div>

                <LB.Data>

                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input type="date" id="DataIni" />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input type="date" id="DataFin" />
                        </div>
                    </div>

                    <div>
                        <button className='setaE'  ><img className='close' src='/images/setaEsquerda.png' /></button>
                        <button className='setaD' ><img className='close' src='/images/setaDireita.png' /></button>
                        <div className='checks' >
                            <input type="checkbox" value="false" id='TOP' /><label>Incluir T.OP. Salvas</label>
                            <input type="checkbox" value="false" id='NFE' /><label>NF-e</label>
                            <input type="checkbox" value="false" id='NFCE' /><label>NFC-e</label>
                        </div>

                    </div>

                    <div className='botao-pesquisar'>
                        <button >Pesquisar</button>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <LB.Navegacao>
                <div>
                    <button className='CE' >Produtos</button>
                    <button className='CD' >Classificação</button>
                </div>
            </LB.Navegacao>

            {aba === "produtos" ? (
                <>
                    <LB.CData>

                    </LB.CData>
                </>
            ) : aba === "classificação" ? (
                <></>
            ) : null}

        </C.Container>
    )

}

export default CurvaABC;