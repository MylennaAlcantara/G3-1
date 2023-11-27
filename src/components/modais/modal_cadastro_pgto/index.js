import React, { useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CCL from "../../cadastros/cadastro_cliente/cadastroCliente";
import * as M from "../modal/modal";
import * as CP from "./cadastroPgto";

export const CadastroPgto = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [aba, setAba] = useState('geral');

    return(
        <M.SubModal style={{zIndex: minimizado.pgto ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <h3>Cadastrar Tipo de Pagamento</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, pgto: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <CCL.Navegacao>
                    <div onClick={()=> setAba('geral')} style={{backgroundColor: aba === 'geral' ? 'white' : '', borderBottom: aba === 'geral' ? 'none' : ''}}>Dados Gerais</div>
                    <div onClick={()=> setAba('tipo-pgto')} style={{backgroundColor: aba === 'tipo-pgto' ? 'white' : '', borderBottom: aba === 'tipo-pgto' ? 'none' : ''}}>Vinculo tipo pgto NFCe</div>
                    <div onClick={()=> setAba('tabela')} style={{backgroundColor: aba === 'tabela' ? 'white' : '', borderBottom: aba === 'tabela' ? 'none' : ''}}>Vincular tabela</div>
                </CCL.Navegacao>
                {aba === 'geral' ? (
                    <CP.DadosGerais>
                        <div className="dados">
                            <label>Código:</label>
                            <input/>
                            <input type="checkbox"/>
                            <label>Ativo</label>
                        </div>
                        <div className="dados">
                            <label>Descrição:</label>
                            <input className="descricao"/>
                        </div>
                        <div className="colunas">
                            <div className="coluna">
                                <div>
                                    <label>Valor mínimo: </label>
                                    <input/>
                                </div>
                                <div>
                                    <select>
                                        <option>Pré desconto %:</option>
                                    </select>
                                    <input/>
                                </div>
                            </div>
                            <div className="coluna">
                                <div>
                                    <label>Taxa: </label>
                                    <input/>%
                                </div>
                                <div>
                                    <label>Markup Venda: </label>
                                    <input/>%
                                </div>
                            </div>
                            <div className="coluna">
                                <div>
                                    <label>Preço especial: </label>
                                    <input type="checkbox"/>
                                </div>
                                <div>
                                    <label>Desconto variável: </label>
                                    <input type="checkbox"/>
                                </div>
                                <div>
                                    <label>Pré desc/acres inserido na NF-e: </label>
                                    <input type="checkbox"/>
                                </div>
                            </div>
                        </div>
                        <div className="comissao-desconto">
                            <fieldset>
                                <legend>Fera Comissão?</legend>
                                <div>
                                    <input type="radio" name="comissao"/>
                                    <label>Sim</label>
                                    <input type="radio" name="comissao"/>
                                    <label>Não</label>
                                </div>
                                <div>
                                    <input placeholder="0,0000"/>%
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Concede Desconto?</legend>
                                <div>
                                    <input type="radio" name="desconto"/>
                                    <label>Sim</label>
                                    <input type="radio" name="desconto"/>
                                    <label>Não</label>
                                </div>
                                <div className="coluna">
                                    <div>
                                        <label>Valor mín. para desc.:</label>
                                        <input/>R$
                                    </div>
                                    <div>
                                        <label>Desconto máx.:</label>
                                        <input/>%
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="gerar">
                            <fieldset>
                                <legend>Gerar</legend>
                                <div className="coluna">
                                    <div>
                                        <input type="radio"/>
                                        <label>Cheque</label>
                                    </div>
                                    <div>
                                        <input type="radio"/>
                                        <label>Conta</label>
                                    </div>
                                </div>
                                <div className="coluna">
                                    <div>
                                        <input type="radio"/>
                                        <label>Boleto</label>
                                    </div>
                                    <div>
                                        <input type="radio"/>
                                        <label>Nenhum</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </CP.DadosGerais>
                ) : aba === 'tipo-pgto' ? (
                    <CP.VinculoPgto>
                        <div>
                            <input type="checkbox"/>
                            <label>Vincular todos</label>
                        </div>
                        <div className="table-responsive">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>ECF</th>
                                        <th>Descrição</th>
                                        <th>Vincular?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>99</td>
                                        <td>1</td>
                                        <td>Cupom de Crédito</td>
                                        <td><input type='checkbox'/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CP.VinculoPgto>
                ) : (
                    <CP.VinculoTabela>
                        <div>
                            <label>Vincular a outra tabela: </label>
                            <select>
                                <option> 0 - Não</option>
                            </select>
                        </div>
                    </CP.VinculoTabela>
                )}
                
                <C.Footer>
                    <div className="buttons">
                        <button><img alt="" src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img alt="" src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.SubModal>
    )
}