import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";
import * as C from "../cadastro/cadastro";
import { rotinaPDF } from "../Relatorios/rotinaPDF";

export const Visualizar = ({codigo, codRotina}) => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [rotinas, setRotinas] = useState([]);
    const [emitente, setEmitente] = useState([]);
    const [top, setTop] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [parceiro, setParceiro] = useState([]);
    const [tipoPagamento, setTipoPagamento] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const responseRotina = await fetch(`http://10.0.1.10:8091/preVenda/${codRotina}`); //http://10.0.1.10:8091/preVenda/id
            const rotina = await responseRotina.json();
            setRotinas(rotina);
            const responseEmitente = await fetch('http://10.0.1.10:8092/emitente/all'); 
            const Emitente = await responseEmitente.json();
            setEmitente(Emitente);
            const responseTop = await fetch('http://10.0.1.10:8091/top/all'); 
            const top = await responseTop.json();
            setTop(top);
            const responseVendedor = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/user/all'); 
            const vendedor = await responseVendedor.json();
            setVendedor(vendedor);
            const responseParceiro = await fetch('http://10.0.1.10:8099/clientes');
            const parceiro = await responseParceiro.json();
            setParceiro(parceiro);
            const responseTipoPagamento = await fetch('http://10.0.1.10:8092/tipoPagamento/all'); 
            const tipoPagamento = await responseTipoPagamento.json();
            setTipoPagamento(tipoPagamento);
        }
        fetchData();
    }, []);

    const razaoSocial = emitente.filter((idEmitente) => {
        if(rotinas.id_empresa === idEmitente.id){
            return idEmitente.razao_social;
        }
    });
    const descricaoTop = top.filter((top) => {
        if(rotinas.id_top === top.id){
            return top.descricao;
        }
    });
    const descricaoVendedor = vendedor.filter((vendedor) => {
        if(rotinas.id_funcionario === vendedor.id){
            return vendedor.nome;
        }
    });
    const descricaoPagamento = tipoPagamento.filter((pagamento) => {
        if(rotinas.id_tipo_pagamento === pagamento.id){
            return pagamento.descricao;
        }
    });
    console.log(rotinas.pre_venda_detalhe)
    const [horaImpressao, setHoraImpressao] = useState('');
    
    const data = new Date();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = String(hora + ':' + minuto + ':' + segundo);

    useEffect(()=>{
        async function setarHoraData(){
            setHoraImpressao(String(horaAtual));
        } 
        setarHoraData();
    },[])

    const voltar = () => {
        navigate('/consultar');
        localStorage.removeItem('rotina');
    }
    const imprimir = () => {
        if(codRotina === undefined){
            console.log('Nenhuma rotina selecionada');
        }else{
            rotinaPDF(rotinas, vendedor, parceiro, tipoPagamento, emitente, horaImpressao);
        }
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Aberta para visualizar</h3>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div>
                            <label>Código da rotina: </label>
                            <input className="cod" value={rotinas.id} readOnly></input>
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
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Aprovado</label>
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Cancelado</label>
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Entregue</label>
                            </div>
                        </div>
                    </form>
                    <form id="information" className="information">
                        <div>
                        <label>Emitente: </label>
                        <input name="id_empresa" className="f1" id="emitente" value={rotinas.id_empresa} readOnly/>
                        {razaoSocial.map((item) => {
                            return <input name="emitente" className="option" value={item.razao_social}/>
                        })}
                                        
                        </div>
                        <div>
                        <label>T.O.P: </label>
                        <input name="cod_top" className="f1" id="top" value={rotinas.id_top} readOnly/>
                        {descricaoTop.map((item)=> {
                            return <input name="top" className="option" value={item.descricao}/>
                        })}
                        </div>
                        <div>
                        <label>Vendedor: </label>
                        <input name="cod_vendedor" className="f1" id="vendedor" value={rotinas.id_funcionario} readOnly/>
                        {descricaoVendedor.map((item) => {
                            return <input name="vendedor" className="option" value={item.nome} />
                        })}
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" value={rotinas.id_cliente} readOnly/>
                                    <div className="div-partner">
                                        <input name="partner" className="partner" value={rotinas.nome_cliente} readOnly/>
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                        </div>
                        <div>
                        <label>Tipo pgto: </label>
                        <input className="f1" id="pgto" value={rotinas.id_tipo_pagamento} readOnly/>
                        {descricaoPagamento.map((item)=> {
                        return <input id="option_pgto" className="option" value={item.descricao} />
                        })}
                        </div>
                    </form>
                </div>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <h4>Produtos</h4>
            </C.Header>
            <C.Add>
            <form >
                <div>
                <label>Código: </label>
                <input 
                    id="produto" 
                    type="text"  
                    name="id_produto" readOnly/>
                </div>
                <div>
                <label>Qtd: </label>
                <input  
                    placeholder="1,000" 
                    name="quantidade" 
                    type="text"
                    id="quantidade"  readOnly/>
                </div>
                <div>
                <label>Vl. Unit.: </label>
                <input 
                className="add-item"  
                name="valor_unitario" 
                type="text" 
                id="valorUnit" readOnly/>
                <datalist></datalist>
                </div>
                <div>
                <label>Desc.: </label>
                <input 
                    id="add-item" 
                    name="descontoPorcen" 
                    className="add-item" 
                    placeholder="0,000000%" 
                    type="text"   readOnly/>% / R$
                <input 
                    id="add-item2" 
                    name="desconto" 
                    className="add-item" 
                    placeholder="R$ 0,000000" 
                    type='text'  readOnly/>
                </div>
                <div>
                <label>Total do item: </label>
                <input 
                    type="text" 
                    name="valor_total" 
                    id="Total"readOnly/>
                <label>Subtotal</label>
                <input 
                    name='subtotal' 
                    id="subtotal"  readOnly/>
                <br/>
                </div>
                <div className="div-descrição" >
                <label>Descrição: </label>
                <input 
                    id="descrição" 
                    className="descrição" 
                    type="text" 
                    name="descricao_produto" 
                    readOnly/>
                </div>
            </form>
            </C.Add>
            <C.Display>
                <div className="table-resp">
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
                            </tr>
                        </thead>
                        <tbody>
                            {rotinas.pre_venda_detalhe && rotinas.pre_venda_detalhe.map((list, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{list.id_produto}</td>
                                        <td>{list.gtin_produto}</td>
                                        <td>{list.descricao_produto}</td>
                                        <td>{list.unidade_produto}</td>
                                        <td>{parseFloat(list.quantidade).toFixed(3).replace('.',',')}</td>
                                        <td>{String(list.valor_unitario).replace('.',',')}</td>
                                        <td>{String(list.subtotal).replace('.',',')}</td>
                                        <td>{parseFloat(list.desconto).toFixed(2).replace('.',',')}</td>
                                    </tr>
                                )
                                })}                         
                        </tbody>
                    </table>
                </div>
            </C.Display>
            <C.Footer>
                <form>
                    <div>
                    <label>Pré-descontoValor:</label>
                    <input placeholder="0,000000"/>
                    </div>
                    <div>
                    <label>Acrésc. Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                    <label className="total-itens"></label>
                    <div>
                    <label>Subtotal da Rotina: </label>
                    <input value={rotinas.subtotal} readOnly/>
                    </div>
                    <div>
                    <label>Total da Rotina: </label>
                    <input value={rotinas.total} readOnly />
                    </div> 
                    <div>
                    <label>descontoValor Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button onClick={imprimir}><img src="/images/printer.png"/>Imprimir</button>
                    <button className="Voltar" onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>   
    );
}