import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";
import * as C from "../cadastro/cadastro";
import { rotinaPDF } from "../Relatorios/rotinaPDF";

export const Visualizar = ({ codRotina }) => {
    const navigate = useNavigate();
    const { user, empresa, dataMask } = useContext(AuthContext);
    const [rotinas, setRotinas] = useState({ pre_venda_detalhe: [] });
    const [emitente, setEmitente] = useState([]);
    const [top, setTop] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [parceiro, setParceiro] = useState([]);
    const [tipoPagamento, setTipoPagamento] = useState([]);

    //const descontoTotal = rotinas.pre_venda_detalhe.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.desconto)), 0);
    const totalItens = rotinas.pre_venda_detalhe.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.quantidade)), 0);

    useEffect(() => {
        async function fetchData() {
            const [responseRotina, responseEmitente, responseTop, responseVendedor, responseParceiro, responseTipoPagamento] = await Promise.all([
                fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+`/preVenda/${codRotina}`),
                fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+'/emitente/all'),
                fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+'/top/all'),
                fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/user/all'),
                fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/clientes'),
                fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+'/tipoPagamento/all')
            ]);
            const [rotina, Emitente, top, vendedor, parceiro, tipoPagamento] = await Promise.all([
                responseRotina.json(),
                responseEmitente.json(),
                responseTop.json(),
                responseVendedor.json(),
                responseParceiro.json(),
                responseTipoPagamento.json()
            ]);
            setRotinas(rotina);
            setEmitente(Emitente);
            setTop(top);
            setVendedor(vendedor);
            setParceiro(parceiro);
            setTipoPagamento(tipoPagamento);
        }
        fetchData();
    }, []);

    const razaoSocial = emitente.filter((idEmitente) => {
        if (rotinas.id_empresa === idEmitente.id) {
            return idEmitente.razao_social;
        }
    });
    const descricaoTop = top.filter((top) => {
        if (rotinas.id_top === top.id) {
            return top.descricao;
        }
    });
    const descricaoVendedor = vendedor.filter((vendedor) => {
        if (rotinas.id_funcionario === vendedor.id) {
            return vendedor.nome;
        }
    });
    const descricaoPagamento = tipoPagamento.filter((pagamento) => {
        if (rotinas.id_tipo_pagamento === pagamento.id) {
            return pagamento.descricao;
        }
    });

    const [horaImpressao, setHoraImpressao] = useState('');

    const data = new Date();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = String(hora + ':' + minuto + ':' + segundo);

    useEffect(() => {
        async function setarHoraData() {
            setHoraImpressao(String(horaAtual));
        }
        setarHoraData();
    }, [])

    const voltar = () => {
        navigate('/consultar');
        localStorage.removeItem('rotina');
    }
    const imprimir = () => {
        if (codRotina === undefined) {
            console.log('Nenhuma rotina selecionada');
        } else {
            rotinaPDF(rotinas, vendedor, parceiro, tipoPagamento, emitente, horaImpressao, dataMask);
        }
    }

    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.cnpj)}</C.NaviBar>
            <C.Header>
                <h3>Aberta para visualizar</h3>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div className="codigo">
                            <label>Código da rotina: </label>
                            <input className="cod" value={rotinas.id} style={{ outline: 0 }} disabled readOnly></input>
                        </div>


                        <div id="checkbox">
                            {rotinas.tipo_venda === 'A' ? (
                                <div className="atacado-varejo">
                                    <div id="line"></div>
                                    <input type="radio" id="atacado" className="radio" name="radio" value='atacado' checked></input>
                                    <label>Atacado</label>
                                    <input type="radio" id="varejo" className="radio" name="radio" value='varejo'></input>
                                    <label>Varejo</label>
                                    <div id="line"></div>
                                </div>
                            ) : (<div className="atacado-varejo">
                                <div id="line"></div>
                                <input type="radio" id="atacado" className="radio" name="radio" value='atacado' ></input>
                                <label>Atacado</label>
                                <input type="radio" id="varejo" className="radio" name="radio" value='varejo' checked></input>
                                <label>Varejo</label>
                                <div id="line"></div>
                            </div>
                            )}
                            <div className="checkbox">
                                <input type="checkbox" className="checkbox-box" />
                                <label>Aprovado</label>
                                <input type="checkbox" className="checkbox-box" />
                                <label>Cancelado</label>
                                <input type="checkbox" className="checkbox-box" />
                                <label>Entregue</label>
                            </div>
                        </div>
                    </form>
                    <form id="information" className="information">
                        <div>
                            <label>Emitente: </label>
                            <input name="id_empresa" className="f1" id="emitente" value={rotinas.id_empresa} disabled  readOnly />
                            {razaoSocial.map((item) => {
                                return <input name="emitente" className="option" value={item.razao_social} style={{ outline: 0 }} disabled readOnly />
                            })}

                        </div>
                        <div>
                            <label>T.O.P: </label>
                            <input name="cod_top" className="f1" id="top" value={rotinas.id_top} disabled  readOnly />
                            {descricaoTop.map((item) => {
                                return <input name="top" className="option" value={item.descricao} style={{ outline: 0 }} disabled readOnly />
                            })}
                        </div>
                        <div>
                            <label>Vendedor: </label>
                            <input name="cod_vendedor" className="f1" id="vendedor" value={rotinas.id_funcionario} disabled  readOnly />
                            {descricaoVendedor.map((item) => {
                                return <input name="vendedor" className="option" value={item.nome} style={{ outline: 0 }} disabled readOnly />
                            })}
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" value={rotinas.id_cliente} disabled  readOnly />
                            <div className="div-partner">
                                <input name="partner" className="partner" value={rotinas.nome_cliente} style={{ outline: 0 }} disabled readOnly />
                                <label>CPF/CNPJ: </label>
                                <input className="cpf"  disabled readOnly />
                            </div>
                        </div>
                        <div>
                            <label>Tipo pgto: </label>
                            <input className="f1" id="pgto" value={rotinas.id_tipo_pagamento} disabled  readOnly />
                            {descricaoPagamento.map((item) => {
                                return <input id="option_pgto" className="option" value={item.descricao} style={{ outline: 0 }} disabled readOnly />
                            })}
                        </div>
                    </form>
                </div>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>

            <C.Header style={{ position: "relative" }}>
                <h4>Produtos</h4>
            </C.Header>
            <C.Add>
                <form >
                    <div>
                        <label>Código: </label>
                        <input
                            id="produto"
                            type="text"
                            name="id_produto" disabled  readOnly />
                    </div>
                    <div>
                        <label>Qtd: </label>
                        <input
                            placeholder="1,000"
                            name="quantidade"
                            type="text"
                            id="quantidade" disabled  readOnly />
                    </div>
                    <div>
                        <label>Vl. Unit.: </label>
                        <input
                            className="add-item"
                            name="valor_unitario"
                            type="text"
                            id="valorUnit" disabled  readOnly />
                        <datalist></datalist>
                    </div>
                    <div className="desconto">
                        <label>Desc.: </label>
                        <input
                            id="add-item"
                            name="descontoPorcen"
                            className="add-item"
                            placeholder="0,000000%"
                            type="text" disabled  readOnly />% / R$
                        <input
                            id="add-item2"
                            name="desconto"
                            className="add-item"
                            placeholder="R$ 0,000000"
                            type='text' disabled  readOnly />
                    </div>
                    <div className="desconto">
                        <label>Total: </label>
                        <input
                            type="text"
                            name="valor_total"
                            id="Total"
                            style={{ outline: 0 }}
                            disabled
                            readOnly />
                        <label>Subtotal</label>
                        <input
                            name='subtotal'
                            id="subtotal"
                            style={{ outline: 0 }}
                            disabled
                            readOnly />
                        <br />
                    </div>
                    <div className="div-descrição" >
                        <label>Descrição: </label>
                        <input
                            id="descrição"
                            className="descrição"
                            type="text"
                            name="descricao_produto"
                            style={{ outline: 0 }}
                            disabled
                            readOnly />
                    </div>
                </form>
            </C.Add>
            <C.Display>
                <div className="table-responsive">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cód. I.</th>
                                <th>EAN</th>
                                <th>Descrição</th>
                                <th>Unidade</th>
                                <th>Quant.</th>
                                <th>Valor Unid.</th>
                                <th>Subtotal</th>
                                <th>Desc. R$</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rotinas.pre_venda_detalhe && rotinas.pre_venda_detalhe.map((list, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.id_produto}</td>
                                        <td>{list.gtin_produto}</td>
                                        <td>{list.descricao_produto}</td>
                                        <td>{list.unidade_produto}</td>
                                        <td>{parseFloat(list.quantidade).toFixed(3).replace('.', ',')}</td>
                                        <td>{String(list.valor_unitario).replace('.', ',')}</td>
                                        <td>{parseFloat(list.subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')}</td>
                                        <td>{parseFloat(list.desconto).toFixed(2).replace('.', ',')}</td>
                                        <td>{parseFloat(list.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </C.Display>
            <C.Footer style={{ position: "relative" }}>
                <label className="total-itens">{totalItens > 1 ? totalItens + " itens" : totalItens + " item"}</label>
                <form>
                    <div>
                        <label>Pré-descontoValor:</label>
                        <input placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                    <div>
                        <label>Acrésc. Total(R$): </label>
                        <input placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                    <div>
                        <label>Subtotal da Rotina: </label>
                        <input value={parseFloat(rotinas.subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')} disabled  readOnly />
                    </div>
                    <div>
                        <label>Total da Rotina: </label>
                        <input value={parseFloat(rotinas.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')} disabled  readOnly />
                    </div>
                    <div>
                        <label>descontoValor Total(R$): </label>
                        <input value={parseFloat(rotinas.desconto).toFixed(2).replace('NaN', '').replace('.', ',')} placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                </form>
            </C.Footer>
            <C.Footer>
                <div className="buttons">
                    <button onClick={imprimir}><img alt="imprimir" src="/images/printer.png" />Imprimir</button>
                    <button className="Voltar" onClick={voltar}><img alt="voltar" src="/images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    );
}