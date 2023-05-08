import React, { useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import * as CC from "../../cadastros/cadastro_cliente/cadastroCliente";
import * as EN from "../modal_editar_nivel/editarNivel";

export const CadastrarNivel = ({close, minimizar, setMinimizar, minimizado, setMinimizado}) => {
    const [aba, setAba] = useState('cadastros');

    return(
        <M.SubModal style={{zIndex: minimizado.nivel === true ? minimizar : "1"}}>
            <C.Container>
                <C.Header>
                    <h3>Cadastrar Nível</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, nivel: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <CC.DadosCliente>
                    <div>
                        <label>Código: </label>
                        <input readOnly/>
                    </div>
                        <label>Descrição: </label>
                        <input style={{width: "50%"}} readOnly/>
                </CC.DadosCliente>
                <CC.Navegacao>
                    <div onClick={()=> setAba('cadastros')} style={{backgroundColor: aba==="cadastros" ? 'white' : '', borderBottom: aba==="cadastros" ?  "none" : ""}}>Cadastros</div>
                    <div onClick={()=> setAba('tabelasI')} style={{backgroundColor: aba==="tabelasI" ? 'white' : '', borderBottom: aba==="tabelasI" ?  "none" : ""}}>Cadastros/Tabelas Auxiliares(Cont.)</div>
                    <div onClick={()=> setAba('tabelasII')} style={{backgroundColor: aba==="tabelasII" ? 'white' : '', borderBottom: aba==="tabelasII" ?  "none" : ""}}>Cadastros/Tabelas Auxiliares(Cont.)</div>
                    <div onClick={()=> setAba('config')} style={{backgroundColor: aba==="config" ? 'white' : '', borderBottom: aba==="config" ?  "none" : ""}}>Configuração</div>
                    <div onClick={()=> setAba('financeiro')} style={{backgroundColor: aba==="financeiro" ? 'white' : '', borderBottom: aba==="financeiro" ?  "none" : ""}}>Financeiro</div>
                    <div onClick={()=> setAba('relatorios')} style={{backgroundColor: aba==="relatorios" ? 'white' : '', borderBottom: aba==="relatorios" ?  "none" : ""}}>Relatórios</div>
                    <div onClick={()=> setAba('utilitarios')} style={{backgroundColor: aba==="utilitarios" ? 'white' : '', borderBottom: aba==="utilitarios" ?  "none" : ""}}>Utilitários</div>
                </CC.Navegacao>
                {aba === 'cadastros' ? (
                    <EN.Cadastros>
                        <div className="colunas">
                            <div>
                                <div>
                                    <label>Acessa Cadastro</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Clientes</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Produtos</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Funcionários</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Fornecedores</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Contador</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>NFe</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Notas Entrada</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Romaneio</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Ord.Produção</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Ord. Serviço</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>                        
                        </div>
                        <div className="colunas">
                            <div>
                                <div>
                                    <label>Tabelas Auxiliares</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Transportadora</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Grupo</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Tipos de Pagamento</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Veículos</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Tipo Operação</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Regras de ICMS</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Recibo</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Pedido Compra MF</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Sit. Ord. Serviço</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </EN.Cadastros>
                ) : aba === 'tabelasI' ? (
                    <EN.TabelasI>
                        <div className="colunas">
                            <div>
                                <div>
                                    <label>Tipo de Título</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Natureza</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Movimentação Financeira</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Lançamento</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Movimentação Bancária</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Manutenção Inventário</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Motivo Cancelamento Rotina</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>MDF-e</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Regime Tributário</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>                     
                        </div>
                        <div className="colunas">
                            <div>
                                <div>
                                    <label>Rotina</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div style={{backgroundColor: 'yellow'}}>
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Liberar Tab. Preço</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Liberar preço Especial</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Duplicar Rotina</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Devolver Produtos na Rotina</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Mesclar Rotina</label>
                                    </div>
                                    <div className="op-rotinas">
                                        <input type="checkbox" className="checkbox"/>
                                        <label>Finalizar Rotina</label>
                                        <input style={{width: '60px', height: '24px', marginLeft: "5px"}}/>
                                    </div>
                                    <div >
                                        <div className="colunas-rotina" >
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Liberar preço</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Desbloquear Rotina</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Permite desconto</label>
                                                <label style={{color: "blue"}}>Limite</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Permite acréscimo</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Inserir regra ICMS avulsa</label>
                                            </div>
                                        </div>
                                        <fieldset >
                                            <legend>Status da Rotina</legend>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Autorizado</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Cancelado</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Entregue</label>
                                            </div>
                                            <div className="op-rotinas">
                                                <input type="checkbox" className="checkbox"/>
                                                <label>Pago</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>CT-e</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Região</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Especiais</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </EN.TabelasI>
                ) : aba === 'tabelasII' ? (
                    <EN.TabelasII>
                    <div className="colunas">
                        <div>
                            <div>
                                <label>Grupo IPI</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Grupo PIS</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Grupo COFINS</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Impressoras Fiscais</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Banco</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Unidade Produto</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Rotas</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Tipo Produção</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Perfil de Moviment.</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Agência Bancária</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>                        
                    </div>
                    <div className="colunas">
                        <div>
                            <div>
                                <label>Config. Juros Parc. Rec.</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Config. Import. XML</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Setor Funcionário</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Totalizador Parcial</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Níveis Funcionário</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Tabela de Preços</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Perfil de Regra</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Mensagem NFe</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Conta Bancária</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <div>
                                <label>Ramo Atividade</label>
                                <input type="checkbox"/>
                            </div>
                            <fieldset>
                                <div>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                    <input type="checkbox"/>
                                    <label>Especiais</label>
                                </div>
                                <div className="super">
                                    <input type="checkbox"/>
                                    <label>Super</label>
                                    <input type="checkbox"/>
                                    <label>I</label>
                                    <input type="checkbox"/>
                                    <label>E</label>
                                    <input type="checkbox"/>
                                    <label>X</label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    </EN.TabelasII>
                ) : aba === "config" ? (
                    <EN.Configuracao>
                        <div>
                            <label>Configuração</label>
                            <input type="checkbox"/>
                        </div>
                        <fieldset>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>Empresa</label>
                            </div>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>Nota Fiscal Eletrônica</label>
                            </div>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>Banco - Boleto</label>
                            </div>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>CFOP</label>
                            </div>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>Configuração de Caixas</label>
                            </div>
                            <div className="op-rotinas">
                                <input type="checkbox" className="checkbox"/>
                                <label>Configuração do Sistema</label>
                            </div>
                            <fieldset >
                                <legend>tabela de Conversão</legend>
                                <div className="op-rotinas">
                                    <input type="checkbox" className="checkbox"/>
                                    <label>Acessa</label>
                                </div>
                                <div className="op-rotinas">
                                    <input type="checkbox" className="checkbox"/>
                                    <label>Insere</label>
                                </div>
                                <div className="op-rotinas">
                                    <input type="checkbox" className="checkbox"/>
                                    <label>Edita</label>
                                </div>
                                <div className="op-rotinas">
                                    <input type="checkbox" className="checkbox"/>
                                    <label>Deleta</label>
                                </div>
                            </fieldset>
                        </fieldset>
                    </EN.Configuracao>
                ) : aba === "financeiro" ? (
                    <EN.Financeiro>
                        <div className="colunas">
                            <div>
                                <div className="nome">
                                    <label>Financeiro</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Contas A Pagar</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Inserir</label>
                                        <input type="checkbox"/>
                                        <label>Baixar</label>
                                        <input type="checkbox"/>
                                        <label>Estornar</label>
                                        <input type="checkbox"/>
                                        <label>Editar</label>
                                        <input type="checkbox"/>
                                        <label>Excluir</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Senha Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>Baixar</label>
                                        <input type="checkbox"/>
                                        <label>Extornar</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Contas A Receber</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset >
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Inserir</label>
                                            <input type="checkbox"/>
                                            <label>Baixar</label>
                                            <input type="checkbox"/>
                                            <label>Estornar</label>
                                            <input type="checkbox"/>
                                            <label>Editar</label>
                                            <input type="checkbox"/>
                                            <label>Excluir</label>
                                            <input type="checkbox"/>
                                            <label>Edição de Parcela</label>
                                            <input type="checkbox"/>
                                            <label>Aqr. Remessa</label>
                                        </div>
                                        <div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Senha Super</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>Baixar</label>
                                                <input type="checkbox"/>
                                                <label>Extornar</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                            <input type="checkbox"/>
                                            <label>Antecipação Bancaria</label>
                                            <input type="checkbox"/>
                                            <label>Aqr. Retorno</label>
                                        </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <label>Controle de Cheques</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                        <input type="checkbox"/>
                                        <label>Depositar</label>
                                        <input type="checkbox"/>
                                        <label>Quitar</label>
                                        <input type="checkbox"/>
                                        <label>Sustar</label>
                                        <input type="checkbox"/>
                                        <label>Repassar</label>
                                        <input type="checkbox"/>
                                        <label>Devolver</label>
                                        <input type="checkbox"/>
                                        <label>Add Evento</label>
                                    </div>
                                    <div className="super">
                                        <input type="checkbox"/>
                                        <label>Senha Super</label>
                                        <input type="checkbox"/>
                                        <label>I</label>
                                        <input type="checkbox"/>
                                        <label>E</label>
                                        <input type="checkbox"/>
                                        <label>X</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div className="nome">
                                    <label>Caixa</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div className="colunas-caixa">
                                <div className="coluna">    
                                    <div>
                                        <div>
                                            <label>Lançamentos</label>
                                            <input type="checkbox"/>
                                        </div>
                                        <fieldset>
                                            <div>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                                <input type="checkbox"/>
                                                <label>Liberar Limite Nat.</label>
                                            </div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Senha Super</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <div>
                                            <label>Borderô</label>
                                            <input type="checkbox"/>
                                        </div>
                                        <fieldset>
                                            <div>
                                                <input type="checkbox"/>
                                                <label>S</label>
                                                <input type="checkbox"/>
                                                <label>B</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>C</label>
                                                <input type="checkbox"/>
                                                <label>A</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                            </div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Senha Super</label>
                                                <input type="checkbox"/>
                                                <label>S</label>
                                                <input type="checkbox"/>
                                                <label>B</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>C</label>
                                                <input type="checkbox"/>
                                                <label>A</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <div>
                                            <label>Despesas</label>
                                            <input type="checkbox"/>
                                        </div>
                                        <fieldset>
                                            <div>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Senha Super</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <div>
                                            <label>Subdespesas</label>
                                            <input type="checkbox"/>
                                        </div>
                                        <fieldset>
                                            <div>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Senha Super</label>
                                                <input type="checkbox"/>
                                                <label>I</label>
                                                <input type="checkbox"/>
                                                <label>E</label>
                                                <input type="checkbox"/>
                                                <label>X</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <div>
                                            <label>Acerto de Caixa</label>
                                            <input type="checkbox"/>
                                        </div>
                                        <fieldset>
                                            <div>
                                                <input type="checkbox"/>
                                                <label>Estornar</label>
                                                <input type="checkbox"/>
                                                <label>Alterar Pagamento</label>
                                            </div>
                                            <div className="super">
                                                <input type="checkbox"/>
                                                <label>Super</label>
                                                <input type="checkbox"/>
                                                <label>Estornar</label>
                                                <input type="checkbox"/>
                                                <label>Alterar Pagamento</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="coluna2">
                                    <div>
                                        <label>Fechamento Caixa</label>
                                        <input type="checkbox" />
                                    </div>
                                    <div>
                                        <label>Conferência de Caixa</label>
                                        <input type="checkbox" />
                                    </div>
                                    <div>
                                        <label>Cupom de Crédito Avulso</label>
                                        <input type="checkbox" />
                                    </div>
                                    <div>
                                        <label>Manutenção de Lançamentos (Natureza)</label>
                                        <input type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </EN.Financeiro>
                ) : aba === "relatorios" ? (
                    <EN.Relatorios>
                        <div className="colunas">
                            <div className="div-relatorio">
                                <div>
                                    <label>Relátorios</label>
                                    <input type="checkbox"/>
                                </div>
                                <div>
                                    <label>Visualizar Todas as Filiais</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Produtos</label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Produto</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Estoque</label>
                                    </div>
                                    <fieldset>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Relátorio de Estoque</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Incluir Totais</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Positivação de Produto</label>
                                        </div>
                                    </fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Produto por ICMS</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Lote</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <label>Caixa</label>
                                        <input type="checkbox"/>
                                    </div>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Fechamento de Caixa</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Cancelamentos</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <label>NFe</label>
                                        <input type="checkbox"/>
                                    </div>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Relatório</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Exportar XML</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <label>Vendas</label>
                                        <input type="checkbox"/>
                                    </div>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Devolução</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Resumo Faturamento</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Pico de Venda</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Comissão</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Consultar NFC-e</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Alterar Vendedor (Consultar NFC-e)</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="colunas">
                            <div>
                                <div>
                                    <div>
                                        <label>Financeiro</label>
                                        <input type="checkbox"/>
                                    </div>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Cheques</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Despesas/Receitas</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Extrato de Conta Bancária</label>
                                    </div>
                                    <fieldset>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Relatório Conciliados</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Nota de Entrada</label>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Contábil</legend>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Contábil</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Apuração PIS/COFINS</label>
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </div>
                            <div>
                                <input type="checkbox"/>
                                <label>Rotina</label>
                            </div>
                            <div>
                                <input type="checkbox"/>
                                <label>Funcionários</label>
                            </div>
                        </div>
                    </EN.Relatorios>
                ) : (
                    <EN.Utilitarios>
                        <div className="colunas">
                            <div>
                                <div>
                                    <label>Utilitários</label>
                                    <input type="checkbox"/>
                                </div>
                                <fieldset>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Troca de mercadoria</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Libera troca de mercadoria</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Flash de Vendas</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Sugestão de Compras</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Carga dos Caixas</label>
                                    </div>
                                    <div>
                                        <input type="checkbox"/>
                                        <label>Servidor DF-e</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </EN.Utilitarios>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.SubModal>
    )
}