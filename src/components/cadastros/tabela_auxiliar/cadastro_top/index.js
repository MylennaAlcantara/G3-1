import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/Auth/authContext";
import * as M from "../../../modais/modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CT from "./cadastroTop";
import * as CC from "../../cadastro_cliente/cadastroCliente"

export const CadastrarTop = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [aba, setAba] = useState('geral');

    return(
        <M.SubModal style={{zIndex: minimizado && minimizado.setor === true ? minimizar : "1"}}>
            <C.Container>
                <C.Header>
                    <h3>Cadastrar TOP</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, top: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <CC.DadosCliente>
                    <div style={{width: "100%",display: "flex", justifyContent: "start", alignItems: "center", margin: '5px'}}>
                        <label>Código:</label>
                        <input className="codigo"/>
                    </div>
                </CC.DadosCliente>
                <CC.Navegacao>
                    <div onClick={()=> setAba('geral')} style={{backgroundColor: aba === 'geral' ? 'white' : '', borderBottom: aba === 'geral' ? 'none' : ''}}>Geral</div>
                    <div>Notas fiscais</div>
                    <div>Emissão de NFe</div>
                    <div onClick={()=> setAba('pgto')} style={{backgroundColor: aba === 'pgto' ? 'white' : '', borderBottom: aba === 'pgto' ? 'none' : ''}}>Tipos de Pagamento</div>
                </CC.Navegacao>
                {aba === 'geral' ? (
                    <CT.DadosGerais>
                        <div>
                            <label>Perfil da Rotina: </label>
                            <input className="codigo"/>
                            <input/>
                        </div>
                        <div>
                            <label>Descrição: </label>
                            <input/>
                        </div>
                        <div>
                            <label>Tipo Movimentação: </label>
                            <input type="radio" name="tipo-mov"/>
                            <label>Entrada</label>
                            <input type="radio" name="tipo-mov"/>
                            <label>Saída</label>
                            <input type="radio" name="tipo-mov"/>
                            <label>Saída de Remessa Interna</label>
                        </div>
                        <div>
                            <label>Financeiro: </label>
                            <input type="radio" name="financeiro"/>
                            <label>Receita</label>
                            <input type="radio" name="financeiro"/>
                            <label>Despesa</label>
                            <input type="radio" name="financeiro"/>
                            <label>Não Gerar</label>
                        </div>
                        <div>
                            <label>Valor dos itens: </label>
                            <select>
                                <option>0 - PREÇO VENDA</option>
                            </select>
                            <label>Gera Protocolo? </label>
                            <input type="checkbox"/>
                        </div>
                        <div>
                            <input type="checkbox"/>
                            <label>Editar preço Rotina</label>
                            <select>
                                <option>Livre</option>
                            </select>
                        </div>
                        <div>
                            <label>Tipo Pag.: </label>
                            <input className="codigo"/>
                            <input/>
                        </div>
                        <div>
                            <label>Tipo Operação: </label>
                            <select>
                                <option>2 - Qualquer</option>
                            </select>
                        </div>
                        <div>
                            <label>Código bc do Créd: </label>
                            <select>
                                <option>- Selecione</option>
                            </select>
                            <label>*Utilizado para geração de SPED</label>
                        </div>
                        <fieldset className="fieldset">
                            <legend>Na Rotina / Lançamento de N.E.</legend>
                            <fieldset>
                                <legend>Movimentação na Rotina / lançamento N.E.</legend>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Reservar estoque</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Movimentar estoque real</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Movimentar Depósito Interno</label>
                                </div>
                            </fieldset>
                            <div className="rotina">
                                <div>
                                    <input type="checkbox"/>
                                    <label>Libera editar nome do consumidor final</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Libera itens com estoque indisponível</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Escolher vendedor</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Vendedor do cadastro do parceiro</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Atualizar produto com dados da N.E.</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Libera emitente como parceiro</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Faturamento</legend>
                                <div>
                                    <input type="checkbox"/>
                                    <label>CUPOM FISCAL / NFCe</label>
                                </div>
                                <div>
                                    <input type="checkbox"/>
                                    <label>NOTA FISCAL (NFe)</label>
                                </div>
                        </fieldset>
                    </CT.DadosGerais>
                ) : aba === 'pgto' ? (
                    <CT.TipoPagamento>
                        <div>
                            <div className="markup">
                                <div>
                                    <input type="checkbox"/>
                                    <label>Atualização Automatica</label>
                                </div>
                                <select>
                                    <option>0 - Escolha uma tabela</option>
                                </select>
                            </div>
                            <div className="markup">
                                <label>Markup ( % )</label>
                                <input />
                            </div>
                            <div className="markup">
                                <label>Marku At. ( % )</label>
                                <input />
                            </div>
                            <img src="/images/add.png"/>
                        </div>
                        <div className="table-responsive">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Tipo Pagamento</th>
                                        <th>Margen (%)</th>
                                        <th>Markup (%)</th>
                                        <th>Margem At. (%)</th>
                                        <th>Markup At. (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </CT.TipoPagamento>
                ) : null}
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.SubModal>
    )
}