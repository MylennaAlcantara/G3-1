import React, { useState } from "react";
import * as C from "../../cadastro/cadastro"
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import './style.css'

export const ConsultarNFCE = () => {

    const [aba, setAba] = useState('Filial')

    return (
        <C.Container>
            <C.Header>
                <h3>Consultar NFC-e</h3>
            </C.Header>

            <LB.Filtros>
                <div className="FTFilterTop" >
                    <div className="btns" >
                        <button className="topFilialBtn" onClick={() => setAba('Filial')}  >Filial</button>

                        <button className='midBTN' onClick={() => setAba('Fornecedor')} >Fornecedor</button>

                        <button className='midBTN' onClick={() => setAba('Familia')} >Familia</button>

                        <button className='midBTN' onClick={() => setAba('Grupo')} >Grupo</button>

                        <button className='fornecedorBTN' onClick={() => setAba('Produto')} >Produto</button>
                    </div>

                    <LB.FilialTop>
                        {aba === 'Filial' ? (
                            <div className='filial-top' >
                                <div>
                                    <select>
                                        <option>Emitentes</option>
                                        <option>Região</option>
                                        <option>Todos</option>
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
                        ) : aba === 'Fornecedor' ? (
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
                                                <th >Ativo</th>
                                                <th >Código</th>
                                                <th>Razão Social</th>
                                                <th >Nome Fantasia</th>
                                                <th >Documento</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : aba === 'Familia' ? (
                            <div className="filial-top" >
                                <div>
                                    <input placeholder="Buscar..." />

                                    <img src="/images/LUPA.png" />
                                </div>

                                <div>
                                    <table id='table' >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Código</th>
                                                <th>Descrição</th>
                                                <th >Data Cad.</th>
                                                <th >Ativo</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : aba === 'Grupo' ? (
                            <div className="filial-top" >
                                <div>
                                    <input placeholder="Buscar..." />

                                    <img src="/images/LUPA.png" />
                                </div>

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Código</th>
                                                <th>Grupo</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        ) : aba === 'Produto' ? (
                            <div className="filial-top" >
                                <div>
                                    <input placeholder="Buscar..." />

                                    <img src="/images/LUPA.png" />
                                </div>

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Seleção</th>
                                                <th>Cód.Interno</th>
                                                <th>Ativo</th>
                                                <th>Referência</th>
                                                <th>GTIN/EAN</th>
                                                <th>Descrição</th>
                                                <th>NCM</th>
                                                <th>UND</th>
                                                <th>Regra ICMS</th>
                                                <th>Grupo IPI</th>
                                                <th>Grupo PIS</th>
                                                <th>Grupo Cofins</th>
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
                        <label>Numero: <input /> </label>
                        <label>Serie: <input /> </label>

                        <label>Status NFC-e
                            <select >
                                <option id='todo' value="TODOS">TODOS</option>
                                <option value="VENDA">VENDA</option>
                                <option value="ORCAMENTO">ORÇAMENTO</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>Periodo <input type="date" id="DataIni" /></label>

                        <label><input type="date" id="DataFin" /> </label>
                    </div>

                    <div className='botao-pesquisar'>
                        <button >Pesquisar</button>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <LB.Navegacao>
                <div>
                    <button >Vendas</button>
                </div>
            </LB.Navegacao>

            <LB.DataGeral>
                <div className='dashboardLine'>
                    <button className='consultVendBtn' >Lista</button>
                    <button className='consultVendBtn' >Agrupado por status</button>
                    <button className='consultVendBtn' >Agrupado por produto</button>
                </div>

                <div className='table-responsive'>

                    <table id='table'>
                        <tr>
                            
                        </tr>
                    </table>
                </div>
            </LB.DataGeral>

        </C.Container>
    )
}

export default ConsultarNFCE;