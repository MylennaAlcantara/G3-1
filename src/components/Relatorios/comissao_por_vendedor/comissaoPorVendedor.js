import React, { useState, useEffect } from "react";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal";
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import * as CV from "./style"
import { Loading } from "../../loading";

export const ComissaoVendedor = () => {

    const [aba, setAba] = useState('Entradas');
    const [abasParceiros, setAbasParceiros] = useState('Clientes')

    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Relatório de Vendas - Por Vendedor</h3>
                    <div className="buttons">
                        <button className="minimizar" ><div className="linha" /></button>
                        <button className="close" >X</button>
                    </div>
                </C.Header>

                <CV.Filtros>
                    <div>
                        <label>Empresa movimento:</label>
                    </div>

                    <div className="eName">
                        <label >Nome da empresa: </label><img src="/images/LUPA.png" />
                    </div>

                    <div className="periodo" >
                        Período:
                    </div>

                    <div>
                        <input type="date" /> A <input type="date" />
                        <button className="setaE" ><img src="/images/setaEsquerda.png" /></button>
                        <button className="setaD" ><img src="/images/setaDireita.png" /></button>
                    </div>

                    <div>
                        <input type="checkbox" /> Exibir detalhes da Venda.
                    </div>

                    <div>
                        <input type="checkbox" /> Considerar desconto máximo de 10%.
                    </div>

                    <div>
                        <input type="checkbox" /> Comissão detalhada por produto.
                    </div>

                    <div>
                        <input type="checkbox" /> Faturamento por vendedor + Margem de lucro + positivação.
                    </div>

                    <div>
                        <input type="checkbox" />Exibir T.OP.
                    </div>

                </CV.Filtros>

                <LB.Navegacao>
                    <div>
                        <button className="CE" onClick={() => setAba('Entradas')} >T.OP.Entradas</button>
                        <button className="botão-filtros" onClick={() => setAba('Saidas')} >T.OP.Saídas</button>
                        <button className="botão-filtros" onClick={() => setAba('Parceiros')} >Parceiros</button>
                        <button className="botão-filtros" onClick={() => setAba('Produto')} >Produto</button>
                        <button className="botão-filtros" onClick={() => setAba('Municipio')} >Município</button>
                        <button className="CD" onClick={() => setAba('Vendedor')} >Vendedor</button>
                    </div>
                </LB.Navegacao>

                {aba === 'Entradas' ? (
                    <>
                        <LB.DataGeral>
                            <div className='dashboardLine'>
                                <label>Entradas</label>
                                <input className="search" />
                            </div>

                            <div className='table-responsive' >
                                <table>
                                    <thead>

                                        <tr>
                                            <th>Código</th>

                                            <th>Descrição</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </LB.DataGeral>
                    </>
                ) : aba === 'Saidas' ? (
                    <>
                        <LB.DataGeral>
                            <div className='dashboardLine'>
                                <label>Saidas</label>
                                <input className="search" />
                            </div>

                            <div className='table-responsive' >
                                <table>
                                    <thead>

                                        <tr>
                                            <th>Código</th>

                                            <th>Descrição</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </LB.DataGeral>
                    </>
                ) : aba === 'Parceiros' ? (
                    <>
                        <LB.DataGeral>

                            <div className='dashboardLine'>
                                <button className="dashboardBtn" onClick={() => setAbasParceiros('Clientes')} >Cliente</button>
                                <button className="dashboardBtn" onClick={() => setAbasParceiros('Fornecedor')} >Fornecedor</button>
                                <button className="btnMenores" ><img className="grafico" src="/images/add.png" /></button>
                            </div>
                            {abasParceiros === 'Clientes' ? (
                                <>
                                    <div className='table-responsive' >
                                        <table>
                                            <thead>

                                                <tr>
                                                    <th>Código</th>

                                                    <th>Data cadastro</th>

                                                    <th>Razão Social</th>

                                                    <th>Nome Fantasia</th>

                                                    <th>Documento</th>

                                                    <th>Endereço</th>

                                                    <th>CEP</th>

                                                    <th>Município</th>

                                                    <th>Telefone</th>

                                                    <th>Celular</th>

                                                    <th>Vendedor</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </>
                            ) : abasParceiros === 'Fornecedor' ? (
                                <>
                                    <div className='table-responsive' >
                                        <table>
                                            <thead>

                                                <tr>
                                                    <th>Código</th>

                                                    <th>Razão Social</th>

                                                    <th>Nome Fantasia</th>

                                                    <th>Documento</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </>
                            ) : null}

                        </LB.DataGeral>
                    </>
                ) : aba === 'Produto' ? (
                    <>
                        <LB.DataGeral>
                            <div className="dashboardLine" >
                                <button className="btnMenores" ><img className="grafico" src="/images/add.png" /></button>
                            </div>

                            <div className='table-responsive' >
                                <table>
                                    <thead>

                                        <tr>
                                            <th>Cod. Int.</th>

                                            <th>Referência</th>

                                            <th>GTIN/EAN</th>

                                            <th>Descrição</th>

                                            <th>Qtd.Caixa</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </LB.DataGeral>
                    </>
                ) : aba === 'Municipio' ? (
                    <>
                        <LB.DataGeral>
                            <div className="dashboardLine" >
                                <button className="btnMenores" ><img className="grafico" src="/images/add.png" /></button>
                            </div>

                            <div className='table-responsive' >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>

                                            <th>Nome</th>

                                            <th>UF</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </LB.DataGeral>
                    </>
                ) : aba === 'Vendedor' ? (
                    <>
                        <LB.DataGeral>
                            <div className="dashboardLine" >
                                <button className="btnMenores" ><img className="grafico" src="/images/add.png" /></button>
                            </div>

                            <div className="table-responsive" >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Códigos</th>

                                            <th>Ativo</th>

                                            <th>Nome</th>

                                            <th>Filial</th>

                                            <th>Telefone</th>

                                            <th>Setor</th>

                                            <th>Nível</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </LB.DataGeral>
                    </>
                ) : null}

            </C.Container>
        </M.Modal>
    )
}

export default ComissaoVendedor;