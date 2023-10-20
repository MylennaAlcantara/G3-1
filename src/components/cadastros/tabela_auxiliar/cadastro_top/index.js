import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/Auth/authContext";
import * as M from "../../../modais/modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CT from "./cadastroTop";
import * as CC from "../../cadastro_cliente/cadastroCliente"
import { Pgt } from "../../../modais/modal_pgt";
import { PerfilMovimentacao } from "../../../modais/modal_perfil_mov";
import { Grupo } from "../../../modais/modais_tela_produtos/modal_icms";
import { Ipi } from "../../../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../../../modais/modais_tela_produtos/modal_pis_cofins";
import { MensagemNfe } from "../../../modais/modal_mensagem_nfe";

export const CadastrarTop = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [aba, setAba] = useState('geral');
    const [campoObrigatorio, setCampoObrigatorio] = useState("")
    const [isModalPgto, setIsModalPgto] = useState(false);
    const [isModalPerfil, setIsModalPerfil] = useState(false);
    const [isModalIpi, setIsModalIpi] = useState(false);
    const [isModalPis, setIsModalPis] = useState(false);
    const [isModalMensagem, setIsModalMensagem] = useState(false);

    const tabelaBc = [
        {
            codigo: "01",
            descricao: "Aquisição de bens para revenda"
        },
        {
            codigo: "02",
            descricao: "Aquisição de bens utilizados como insumo",
        },
        {
            codigo: "03",
            descricao: "Aquisição de serviços utilizados como insumo",
        },
        {
            codigo: "04",
            descricao: "Energia elétrica e térmica, inclusive sob a forma de vapor",
        },
        {
            codigo: "05",
            descricao: "Aluguéis de prédios",
        },
        {
            codigo: "06",
            descricao: "Aluguéis de máquinas e equipamentos",
        },
        {
            codigo: "07",
            descricao: "Armazenagem de mercadoria e frete na operação de venda",
        },
        {
            codigo: "08",
            descricao: "Contraprestações de arrendamento mercantil",
        },
        {
            codigo: "09",
            descricao: "Máquinas, equipamentos e outros bens incorporados ao ativo imobilizado (crédito sobre encargos de depreciação).",
        },
        {
            codigo: "10",
            descricao: "Máquinas, equipamentos e outros bens incorporados ao ativo imobilizado (crédito com base no valor de aquisição).",
        },
        {
            codigo: "11",
            descricao: "Amortização e Depreciação de edificações e benfeitorias em imóveis",
        },
        {
            codigo: "12",
            descricao: "Devolução de Vendas Sujeitas à Incidência Não-Cumulativa",
        },
        {
            codigo: "13",
            descricao: "Outras Operações com Direito a Crédito (inclusive os créditos presumidos sobre receitas)",
        },
        {
            codigo: "14",
            descricao: "Transporte de Cargas – Contratação de prestador pessoa física ou PJ transportadora, optante pelo SIMPLES",
        },
        {
            codigo: "15",
            descricao: "Atividade Imobiliária – Custo Incorrido de Unidade Imobiliária",
        },
        {
            codigo: "16",
            descricao: "Atividade Imobiliária – Custo Orçado de unidade não concluída", 
        },
        {
            codigo: "17",
            descricao: "Atividade de Prestação de Serviços de Limpeza, Conservação e Manutenção – vale-transporte, vale-refeição ou vale-alimentação, fardamento ou uniforme.",
        },
        {
            codigo: "18",
            descricao: "Estoque de abertura de bens"
        }
    ]

    const [dadosTop, setDadosTop] = useState({
        perfilMovimentacao: {
            id: "",
            descricao: "",
            usado_norm_entre_filiais: ""
        },
        libera_itens_estoque_indisponivel: false,
        descricao: "",
        tipo_movimentacao: "E",
        rotina_movimenta_estoque_reservado: false,
        gera_financeiro: "R",
        rotina_movimenta_estoque_real: false,
        rotina_movimenta_estoque_deposito_interno: false,
        libera_editar_nome_do_consumidor_final: false,
        editar_preco_rotina: false,
        tipo_edicao_preco_rotina: false,
        nat_operacao: "",
        calcula_ipi: false,
        calcula_icms: false,
        calcula_pis: false,
        calcula_cofins: false,
        emite_nota_fiscal: false,
        emite_cupom_fiscal: false,
        id_grupo_ipi: "",
        id_grupo_pis: "",
        id_grupo_cofins: "",
        index_preco_vinculado: 0,
        incluir_obs_carga_tributaria_nfe: false,
        incluir_obs_cred_sn_nfe: false,
        incluir_obs_nfe: true,
        serie_nfe: "",
        calcula_mva: null,
        calcula_iva: null,
        gera_protocolo: false,
        tipo_protocolo: "PNF",
        finalidade_nfe: 1,
        escolher_vendedor_rotina: false,
        vendedor_cadastro_parceiro_rotina: false,
        atualiza_tabela_preco: false,
        atualiza_fornecedor_produtos: false,
        libera_emitente_como_parceiro: false,
        tipoPagamento: {
            id: "",
            descricao: "",
            gera_comissao: "",
            vinculado: "",
            concede_desconto: "",
            valor_min_para_desconto:"",
            valor_max_do_desconto:"",
            pode_dividir: "",
            qtd_max_parcelas: "",
            taxa_parcelamento: "",
            taxa:"",
            markup_default:"",
            valor_minimo:"",
            preco_especial: "",
            tipo_pagamento_nfe: "",
            id_top_financeiro: "",
            desconto_porc: "",
            id_tipo_pagamento_vinculado: "1",
            desconto_variavel: "",
            comissao:"",
            gera_financeiro_rotina: "",
            gera_financeiro_nfe: "",
            valor_parcela_total_rotina: "",
            excluido: "",
            utiliza_config_default: "",
            pre_desc_acres_nfe: "",
            ativo: ""
        },
        tipo_operacao_fiscal: 3,
        nat_bc_cred: null,
        excluido: false
    });

    const keyPerfil = (e) => {
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPerfil(true);
        }
    }
    const keyPgto = (e) => {
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPgto(true);
        }
    }
    const keyIPI = (e) => {
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalIpi(true);
        }
    }
    const keyPIS = (e) => {
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPis(true);
        }
    }

    const salvar = async () => {
        if(dadosTop.descricao && dadosTop.perfilMovimentacao.id){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+"/top/save",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dadosTop),
                })
                if(res.status === 201 || res.status === 200){
                    alert("Salvo com sucesso!");
                    close();
                }
            }catch(err){
                console.log(err);
            }
        }else{
            alert("Preencha os campos a cima!");
            setCampoObrigatorio("yellow");
        }
    }

    return(
        <M.SubModal style={{zIndex: minimizado && minimizado.top === true ? minimizar : "1"}}>
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
                    <div onClick={()=> setAba('notas-fiscais')} style={{backgroundColor: aba === 'notas-fiscais' ? 'white' : '', borderBottom: aba === 'notas-fiscais' ? 'none' : ''}}>Notas fiscais</div>
                    {dadosTop.emite_nota_fiscal && <div onClick={()=> setAba('emissao')} style={{backgroundColor: aba === 'emissao' ? 'white' : '', borderBottom: aba === 'emissao' ? 'none' : ''}}>Emissão de NFe</div>}
                    {dadosTop.tipo_movimentacao === "E" && <div onClick={()=> setAba('pgto')} style={{backgroundColor: aba === 'pgto' ? 'white' : '', borderBottom: aba === 'pgto' ? 'none' : ''}}>Tipos de Pagamento</div>}
                </CC.Navegacao>
                {aba === 'geral' ? (
                    <CT.DadosGerais>
                        <div>
                            <label>Perfil da Rotina: </label>
                            <input className="codigo" value={dadosTop.perfilMovimentacao.id} onKeyDown={keyPerfil} onDoubleClick={()=> setIsModalPerfil(true)} style={{backgroundColor: campoObrigatorio}}/>
                            <input value={dadosTop.perfilMovimentacao.descricao} style={{backgroundColor: campoObrigatorio}}/>
                        </div>
                        <div>
                            <label>Descrição: </label>
                            <input value={dadosTop.descricao} onChange={(e)=> setDadosTop({...dadosTop, descricao: e.target.value})} style={{backgroundColor: campoObrigatorio}}/>
                        </div>
                        <div>
                            <label>Tipo Movimentação: </label>
                            <input type="radio" name="tipo-mov" checked={dadosTop.tipo_movimentacao === "E" ? true : false} onChange={()=> setDadosTop({...dadosTop, tipo_movimentacao: "E"})}/>
                            <label>Entrada</label>
                            <input type="radio" name="tipo-mov" checked={dadosTop.tipo_movimentacao === "S" ? true : false} onChange={()=> setDadosTop({...dadosTop, tipo_movimentacao: "S"})}/>
                            <label>Saída</label>
                            <input type="radio" name="tipo-mov" checked={dadosTop.tipo_movimentacao === "R" ? true : false} onChange={()=> setDadosTop({...dadosTop, tipo_movimentacao: "R"})}/>
                            <label>Saída de Remessa Interna</label>
                        </div>
                        <div>
                            <label>Financeiro: </label>
                            <input type="radio" name="financeiro" checked={dadosTop.gera_financeiro === "R" ? true : false} onChange={()=> setDadosTop({...dadosTop, gera_financeiro: "R"})}/>
                            <label>Receita</label>
                            <input type="radio" name="financeiro"checked={dadosTop.gera_financeiro === "D" ? true : false} onChange={()=> setDadosTop({...dadosTop, gera_financeiro: "D"})}/>
                            <label>Despesa</label>
                            <input type="radio" name="financeiro"checked={dadosTop.gera_financeiro === "N" ? true : false} onChange={()=> setDadosTop({...dadosTop, gera_financeiro: "N"})}/>
                            <label>Não Gerar</label>
                        </div>
                        <div>
                            <label>Valor dos itens: </label>
                            <select value={dadosTop.index_preco_vinculado} onChange={(e)=> setDadosTop({...dadosTop, index_preco_vinculado: parseInt(e.target.value)})}>
                                <option value="0">0 - PREÇO VENDA</option>
                                <option value="1">1 - PREÇO CUSTO</option>
                                <option value="2">2 - PREÇO COMPRA</option>
                                <option value="3">3 - ZERADO</option>
                                <option value="4">4 - PREÇO DEVOLUÇÃO</option>
                            </select>
                            <label>Gera Protocolo? </label>
                            <input type="checkbox" checked={dadosTop.gera_protocolo ? true : false} onChange={()=> setDadosTop({...dadosTop, gera_protocolo: !dadosTop.gera_protocolo})}/>
                            {dadosTop.gera_protocolo && (
                                <select value={dadosTop.tipo_protocolo} onChange={(e)=> setDadosTop({...dadosTop, tipo_protocolo: e.target.value})}>
                                    <option value="PNF">PNF - Protocolo de Nota Fiscal</option>
                                    <option value="PRZ">PRZ - Protocolo de redução Z</option>
                                </select>
                            )}
                        </div>
                        <div>
                            <input type="checkbox" checked={dadosTop.editar_preco_rotina ? true : false} onChange={()=> setDadosTop({...dadosTop, editar_preco_rotina: !dadosTop.editar_preco_rotina})}/>
                            <label>Editar preço Rotina</label>
                            <select value={dadosTop.tipo_edicao_preco_rotina} onChange={(e)=> setDadosTop({...dadosTop, tipo_edicao_preco_rotina: parseInt(e.target.value)})} disabled={dadosTop.editar_preco_rotina ? false : true}>
                                <option value="0">Livre</option>
                                <option value="1">Para cima, com limite Desc.</option>
                                <option value="2">Para cima</option>
                            </select>
                        </div>
                        <div>
                            <label>Tipo Pag.: </label>
                            <input className="codigo" value={dadosTop.tipoPagamento.id} onKeyDown={keyPgto} onDoubleClick={()=> setIsModalPgto(true)}/>
                            <input value={dadosTop.tipoPagamento.descricao}/>
                        </div>
                        <div>
                            <label>Tipo Operação: </label>
                            <select value={dadosTop.tipo_operacao_fiscal} onChange={(e)=> setDadosTop({...dadosTop, tipo_operacao_fiscal: parseInt(e.target.value)})}>
                                <option value="1">0 - Interna</option>
                                <option value="2">1 - Interestadual</option>
                                <option value="3">2 - Qualquer</option>
                            </select>
                        </div>
                        <div>
                            <label>Código bc do Créd: </label>
                            <select value={dadosTop.nat_bc_cred} onChange={(e)=> setDadosTop({...dadosTop, nat_bc_cred: e.target.value})}>
                                <option value={null}>- Selecione</option>
                                {Array.isArray(tabelaBc) && tabelaBc.map((bc)=> {
                                    return(
                                        <option value={bc.codigo}>{bc.codigo} - {bc.descricao}</option>
                                    )
                                })}
                            </select>
                            <label>*Utilizado para geração de SPED</label>
                        </div>
                        <fieldset className="fieldset">
                            <legend>Na Rotina / Lançamento de N.E.</legend>
                            <fieldset>
                                <legend>Movimentação na Rotina / lançamento N.E.</legend>
                                <div>
                                    <input type="checkbox" checked={dadosTop.rotina_movimenta_estoque_reservado ? true : false} onChange={(e)=> setDadosTop({...dadosTop, rotina_movimenta_estoque_reservado: !dadosTop.rotina_movimenta_estoque_reservado, rotina_movimenta_estoque_real: dadosTop.rotina_movimenta_estoque_reservado ? false : dadosTop.rotina_movimenta_estoque_reservado})}/>
                                    <label>Reservar estoque</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.rotina_movimenta_estoque_real ? true : false} onChange={(e)=> setDadosTop({...dadosTop, rotina_movimenta_estoque_real: !dadosTop.rotina_movimenta_estoque_real, rotina_movimenta_estoque_reservado: dadosTop.rotina_movimenta_estoque_real ? false : dadosTop.rotina_movimenta_estoque_real})}/>
                                    <label>Movimentar estoque real</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.rotina_movimenta_estoque_deposito_interno ? true : false} onChange={()=> setDadosTop({...dadosTop, rotina_movimenta_estoque_deposito_interno: !dadosTop.rotina_movimenta_estoque_deposito_interno})}/>
                                    <label>Movimentar Depósito Interno</label>
                                </div>
                            </fieldset>
                            <div className="rotina">
                                <div>
                                    <input type="checkbox" checked={dadosTop.libera_editar_nome_do_consumidor_final ? true : false} onChange={()=> setDadosTop({...dadosTop, libera_editar_nome_do_consumidor_final: !dadosTop.libera_editar_nome_do_consumidor_final})}/>
                                    <label>Libera editar nome do consumidor final</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.libera_itens_estoque_indisponivel ? true : false} onChange={()=> setDadosTop({...dadosTop, libera_itens_estoque_indisponivel: !dadosTop.libera_itens_estoque_indisponivel})}/>
                                    <label>Libera itens com estoque indisponível</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.escolher_vendedor_rotina ? true : false} onChange={()=> setDadosTop({...dadosTop, escolher_vendedor_rotina: !dadosTop.escolher_vendedor_rotina})}/>
                                    <label>Escolher vendedor</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.vendedor_cadastro_parceiro_rotina ? true : false} onChange={()=> setDadosTop({...dadosTop, vendedor_cadastro_parceiro_rotina: !dadosTop.vendedor_cadastro_parceiro_rotina})}/>
                                    <label>Vendedor do cadastro do parceiro</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.atualiza_fornecedor_produtos ? true : false} onChange={()=> setDadosTop({...dadosTop, atualiza_fornecedor_produtos: !dadosTop.atualiza_fornecedor_produtos})} disabled={dadosTop.tipo_movimentacao != "E" ? true : false}/>
                                    <label>Atualizar produto com dados da N.E.</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.libera_emitente_como_parceiro ? true : false} onChange={()=> setDadosTop({...dadosTop, libera_emitente_como_parceiro: !dadosTop.libera_emitente_como_parceiro})}/>
                                    <label>Libera emitente como parceiro</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Faturamento</legend>
                                <div>
                                    <input type="checkbox" checked={dadosTop.emite_cupom_fiscal ? true : false} onChange={()=> setDadosTop({...dadosTop, emite_cupom_fiscal: !dadosTop.emite_cupom_fiscal})} disabled={dadosTop.rotina_movimenta_estoque_real ? true : false}/>
                                    <label>CUPOM FISCAL / NFCe</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.emite_nota_fiscal ? true : false} onChange={()=> setDadosTop({...dadosTop, emite_nota_fiscal: !dadosTop.emite_nota_fiscal})} disabled={dadosTop.rotina_movimenta_estoque_real ? true : false}/>
                                    <label>NOTA FISCAL (NFe)</label>
                                </div>
                        </fieldset>
                    </CT.DadosGerais>
                ) : aba === 'notas-fiscais' ? (
                    <CT.NotasFiscais>
                        <div className="grupos">
                            <div>
                                <label>Natureza Operação:</label>
                                <input value={dadosTop.nat_operacao} onChange={(e)=> setDadosTop({...dadosTop, nat_operacao: e.target.value})}/>
                            </div>
                            <div>
                                <label>Grupo IPI de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_ipi ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_ipi: !dadosTop.calcula_ipi})}/>
                                <input className="codigo" onKeyDown={keyIPI} onDoubleClick={()=> setIsModalIpi(true)}/>
                                <input/>
                            </div>
                            <div>
                                <label>Grupo PIS de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_pis ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_pis: !dadosTop.calcula_pis})}/>
                                <input className="codigo" onKeyDown={keyPIS} onDoubleClick={()=> setIsModalPis(true)}/>
                                <input/>
                            </div>
                            <div>
                                <label>Grupo COFINS de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_cofins ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_cofins: !dadosTop.calcula_cofins})}/>
                                <input className="codigo"/>
                                <input/>
                            </div>
                        </div>
                    </CT.NotasFiscais>
                ) : aba === 'emissao' && dadosTop.emite_nota_fiscal ? (
                    <CT.EmissaoNfe>
                        <div>
                            <label>Série NFe:</label>
                            <input className="codigo" value={dadosTop.serie_nfe} onChange={(e)=> setDadosTop({...dadosTop, serie_nfe: e.target.value})}/>
                            <label>Finalidade de Emissão: </label>
                            <select value={dadosTop.finalidade_nfe} onChange={(e)=> setDadosTop({...dadosTop, finalidade_nfe: parseInt(e.target.value)})}>
                                <option value="1">1=NF-e normal</option>
                                <option value="2">2=NF-e complementar</option>
                                <option value="3">3=NF-e de ajuste</option>
                                <option value="4">4=Devolução de Mercadoria</option>
                            </select>
                        </div>
                        <div className="obs">
                            <div>
                                <input type="checkbox" checked={dadosTop.incluir_obs_carga_tributaria_nfe ? true : false} onChange={()=> setDadosTop({...dadosTop, incluir_obs_carga_tributaria_nfe: !dadosTop.incluir_obs_carga_tributaria_nfe})}/>
                                <label>Obs. de carga trib. na NFe</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={dadosTop.incluir_obs_cred_sn_nfe ? true : false} onChange={()=> setDadosTop({...dadosTop, incluir_obs_cred_sn_nfe: !dadosTop.incluir_obs_cred_sn_nfe})}/>
                                <label>Obs. Crédito Simples Nacional</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={dadosTop.incluir_obs_nfe ? true : false} onChange={()=> setDadosTop({...dadosTop, incluir_obs_nfe: !dadosTop.incluir_obs_nfe})}/>
                                <label>Obs. adicionais NFe:</label>
                                {dadosTop.incluir_obs_nfe && <button onClick={()=> setIsModalMensagem(true)}><img src="/images/add.png"/>Add</button>}                                
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table id="table">
                                <thead>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </CT.EmissaoNfe>
                ) : aba === 'pgto' ? (
                    <CT.TipoPagamento>
                        <div>
                            <div className="markup">
                                <div>
                                    <input type="checkbox" checked={dadosTop.atualiza_tabela_preco ? true : false} onChange={()=> setDadosTop({...dadosTop, atualiza_tabela_preco: !dadosTop.atualiza_tabela_preco})}/>
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
                        <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {isModalPerfil ? <PerfilMovimentacao close={()=> setIsModalPerfil(false)} dadosTop={dadosTop} setDadosTop={setDadosTop}/> : null}
                {isModalPgto ? <Pgt onClose={()=> setIsModalPgto(false)} dadosTop={dadosTop} setDadosTop={setDadosTop}/> : null}
                {isModalIpi ? <Ipi close={()=> setIsModalIpi(false)}/> : null}
                {isModalPis ? <PisCofins close={()=> setIsModalPis(false)}/> : null }
                {isModalMensagem ? <MensagemNfe close={()=> setIsModalMensagem(false)}/> : null }
            </C.Container>
        </M.SubModal>
    )
}