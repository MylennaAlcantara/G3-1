import React, { useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CP from "./cadastroProduto";
import * as CC from "../cadastro_cliente/cadastroCliente"

export const CadastroProduto = () => {
    const [aba, setAba] = useState('geral');

    function geral (){
        setAba('geral');
    }
    function tributacao (){
        setAba('tributacao');
    }
    function infoCusto (){
        setAba('info-custo');
    }
    function estoque (){
        setAba('estoque');
    }
    function movimentacao (){
        setAba('movimentacao');
    }
    function fornecedores (){
        setAba('fornecedores');
    }
    function promocao (){
        setAba('promocao');
    }
    function validade (){
        setAba('validade');
    }

    return(
        <C.Container>
            <C.Header>
                <h3>Cadastro de Produto</h3>
            </C.Header>
            <CC.DadosCliente>
                <div>
                    <label>Código Interno:</label>
                    <input/>
                </div>
                <div>
                    <input className="checkbox" type="checkbox"/>
                    <label>Desativado</label>
                </div>
            </CC.DadosCliente>
            <CP.InfoItem>
                <div>
                    <div className="campos">
                        <div>
                            <label>Código: </label>
                            <input/>
                        </div>
                        <div>
                            <label>Cód. 2: </label>
                            <input/>
                        </div>
                        <div>
                            <label>Código Ref.: </label>
                            <input/>
                        </div>
                    </div>
                    <div>
                        <label>Descrição: </label>
                        <input/>
                    </div>
                    <div className="campos">
                        <div>
                            <label>NCM / SH:</label>
                            <input/>
                            <img src="images/lupa.png"/>
                        </div>
                        <div>
                            <label>CEST:</label>
                            <input/>
                            <img src="images/lupa.png"/>
                        </div>
                    </div>
                    <div className="campos">
                        <div>
                            <label>Trib. Nac.:</label>
                            <input readOnly/>
                        </div>
                        <div>
                            <label>Trib. Import.:</label>
                            <input readOnly/>
                        </div>
                        <div>
                            <label>Trib. Estad.:</label>
                            <input readOnly/>
                        </div>
                    </div>
                </div>
                <div id="checkbox">
                    <div>
                        <label>Data Cadastro: </label>
                        <input readOnly/>
                    </div>
                    <div>
                        <label>Últ. Modificação: </label>
                        <input readOnly/>
                    </div>
                    <div>
                        <div className="checkbox">
                            <div className="check">
                                <input type="checkbox"/>
                                <label>Pesagem no Caixa</label> 
                            </div>
                            <div className="check">
                                <input type="checkbox"/>
                                <label>Produto de Balança</label>
                            </div>
                        </div>
                        <div className="checkbox">
                            <div className="check">
                                <input type="checkbox"/>
                                <label>Venda PDV</label>
                            </div>
                            <div className="check">
                                <input type="checkbox"/>
                                <label>Sazonal</label>
                            </div>
                        </div>
                    </div>
                </div>
            </CP.InfoItem>
            <CC.Navegacao>
                <div onClick={geral} style={{backgroundColor: aba === "geral" ? "white" : "", borderBottom: aba === "geral" ? "0" : ""}}>Geral</div>
                <div onClick={tributacao} style={{backgroundColor: aba === "tributacao" ? "white" : "", borderBottom: aba === "tributacao" ? "0" : ""}}>Tributações para Emissão</div>
                <div onClick={infoCusto} style={{backgroundColor: aba === "info-custo" ? "white" : "", borderBottom: aba === "info-custo" ? "0" : ""}}>Informações de Custo</div>
                <div onClick={estoque} style={{backgroundColor: aba === "estoque" ? "white" : "", borderBottom: aba === "estoque" ? "0" : ""}}>Estoque</div>
                <div onClick={movimentacao} style={{backgroundColor: aba === "movimentacao" ? "white" : "", borderBottom: aba === "movimentacao" ? "0" : ""}}>Movimentação</div>
                <div onClick={fornecedores} style={{backgroundColor: aba === "fornecedores" ? "white" : "", borderBottom: aba === "fornecedores" ? "0" : ""}}>Fornecedores / +</div>
                <div onClick={promocao} style={{backgroundColor: aba === "prommocao" ? "white" : "", borderBottom: aba === "promocao" ? "0" : ""}}>Promoção</div>
                <div onClick={validade} style={{backgroundColor: aba === "validade" ? "white" : "", borderBottom: aba === "validade" ? "0" : ""}}>Validade Est.</div>
            </CC.Navegacao>
            {aba === "geral"? (
                <CP.Geral>
                    <div className="geral">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Filial</th>
                                        <th>Tipo Pgto.</th>
                                        <th>PréDsc(%)</th>
                                        <th>Markup %</th>
                                        <th>MArgem %</th>
                                        <th>Valor Venda</th>
                                        <th>Markup At. %</th>
                                        <th>Margem At. %</th>
                                        <th>Qtd. Atac.</th>
                                        <th>Valor Atac.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>3</td>
                                        <td>A VISTA</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                    </tr>
                                    <tr>
                                        <td>0</td>
                                        <td>3</td>
                                        <td>A VISTA</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="unid-fornecedor">
                            <div>
                                <label>Unid. de Venda: </label>
                                <select>
                                    <option>0 - Escolha</option>
                                    <option>1 - CX</option>
                                    <option>2 - UN</option>
                                    <option>3 - PC</option>
                                </select>
                                <img src="images/add.png"/>
                                <label>Qtd. p/ caixa: </label>
                                <input/>
                            </div>
                            <div>
                                <label>Desconto Max.(%): </label>
                                <input/>
                            </div>
                            <fieldset>
                                <legend>Fornecedor</legend>
                                <input/><input/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend>Grupo</legend>
                                <div>
                                    <input/><input/>
                                </div>
                                <textarea readOnly/>
                            </fieldset>
                            <div>
                                <label>Tipo de Item (SPED): </label>
                                <select></select>
                                <label> *Na visão da Empresa</label>
                            </div>
                        </div>
                    </div>
                </CP.Geral>
            ) : aba === "tributacao" ? (
                <CP.Tributacao>
                    <div className="tributacao">
                        <div className="icms">
                            <fieldset>
                                <legend>ICMS</legend>
                                <div>
                                    <label>Aliquota no ECF (Imp. Fiscal)</label>
                                    <input className="codigo"/>
                                    <label>Totalizador Parcial no ECF:</label>
                                    <select></select>
                                </div>
                                <div>
                                    <label>Grupo de Regra ICMS:</label>
                                    <input className="codigo"/>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>--</legend>
                                <div>
                                    <div>
                                        <label style={{color: "red"}}>Grupo de Regra para IPI: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "blue"}}>Grupo de Regra para PIS: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "blue"}}>Grupo de Regra para COFINS: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "green"}}>Natureza da Receita: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                </div>
                            </fieldset>
                            <div>
                                <button>Visualizar Árvore MVA ST</button>
                                <fieldset>
                                    <div>
                                        <input type='checkbox'/>
                                        <label>Produto Regulamentado pela ANP</label>
                                        <label>Valor de PArtida: </label>
                                        <input value="0,00"/>
                                    </div>
                                    <div>
                                        <label>Identificação ANP: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset>
                                <legend>Origem do Produto</legend>
                                <div>
                                    <select>
                                        <option>0 - Nacional</option>
                                        <option>1 - ESTRANGEIRA - IMPORTAÇÃO DIRETA</option>
                                        <option>2 - ESTRANGEIRA - ADQUIRIDA NO MERCADO INTERNO</option>
                                        <option>3 - NACIONAL</option>
                                        <option>4 - NACIONAL</option>
                                        <option>5 - NACIONAL</option>
                                        <option>6 - ESTRANGEIRA</option>
                                        <option>7 - ESTRANGEIRA</option>
                                    </select>
                                    <textarea readOnly/>
                                </div>
                            </fieldset>
                        </div>
                        <div className="ippt">
                            <div>
                                <label>IPPT: </label>
                                <div>
                                    <input type="radio" name="ippt"/>
                                    <label>Próprio</label>
                                </div>
                                <div>
                                    <input type="radio" name="ippt"/>
                                    <label>Terceiros</label>
                                </div>
                            </div>
                            <div>
                                <label>IAT: </label>
                                <div>
                                    <input type="radio" name="iat"/>
                                    <label>Arredondamento</label>
                                </div>
                                <div>
                                    <input type="radio" name="iat"/>
                                    <label>Truncamento</label>
                                </div>
                            </div>
                            <div>
                                <label>Cód. Enquadramento IPI: </label>
                                <input className="codigo"/>
                                <img src="/images/lupa.png"/>
                            </div>
                            <div>
                                <div>
                                    <label>BC do ICMS ST Retido Montante: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>Valor ICMS ST Retido Montante: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>BC do ICMS ST Retido por Unid: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>Valor ICMS ST Retido por Unid: </label>
                                    <input value="0,000000"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CP.Tributacao>
            ) : (
                <CP.Custo/>
            )}
                
            <C.Footer>
                <div className="buttons">
                    <button><img src="images/salvar.png"/>Salvar</button>
                    <button><img src="images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}