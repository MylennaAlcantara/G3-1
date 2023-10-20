import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/Auth/authContext";
import * as M from "../../../modais/modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CT from "../cadastro_top/cadastroTop";
import * as CC from "../../cadastro_cliente/cadastroCliente"
import { Pgt } from "../../../modais/modal_pgt";
import { PerfilMovimentacao } from "../../../modais/modal_perfil_mov";

export const EditarTop = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [aba, setAba] = useState('geral');
    const [campoObrigatorio, setCampoObrigatorio] = useState("")
    const [isModalPgto, setIsModalPgto] = useState(false);
    const [isModalPerfil, setIsModalPerfil] = useState(false);
    const top = localStorage.getItem("idTop");

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

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+`/top/${top}`);
            const data = await response.json();
            setDadosTop({
                id: data.id,
                perfilMovimentacao: {
                    id: data.perfilMovimentacao.id,
                    descricao: data.perfilMovimentacao.descricao,
                    usado_norm_entre_filiais: data.perfilMovimentacao.usado_norm_entre_filiais
                },
                libera_itens_estoque_indisponivel: data.libera_itens_estoque_indisponivel,
                descricao: data.descricao,
                tipo_movimentacao: data.tipo_movimentacao,
                rotina_movimenta_estoque_reservado: data.rotina_movimenta_estoque_reservado,
                gera_financeiro: data.gera_financeiro,
                rotina_movimenta_estoque_real: data.rotina_movimenta_estoque_real,
                rotina_movimenta_estoque_deposito_interno: data.rotina_movimenta_estoque_deposito_interno,
                libera_editar_nome_do_consumidor_final: data.libera_editar_nome_do_consumidor_final,
                editar_preco_rotina: data.editar_preco_rotina,
                tipo_edicao_preco_rotina: data.tipo_edicao_preco_rotina,
                nat_operacao: data.nat_operacao,
                calcula_ipi: data.calcula_ipi,
                calcula_icms: data.calcula_icms,
                calcula_pis: data.calcula_pis,
                calcula_cofins: data.calcula_cofins,
                emite_nota_fiscal: data.emite_nota_fiscal,
                emite_cupom_fiscal: data.emite_cupom_fiscal,
                id_grupo_ipi: data.id_grupo_ipi,
                id_grupo_pis: data.id_grupo_pis,
                id_grupo_cofins: data.id_grupo_cofins,
                index_preco_vinculado: data.index_preco_vinculado,
                incluir_obs_carga_tributaria_nfe: data.incluir_obs_carga_tributaria_nfe,
                incluir_obs_cred_sn_nfe: data.incluir_obs_cred_sn_nfe,
                incluir_obs_nfe: data.incluir_obs_nfe,
                serie_nfe: data.serie_nfe,
                calcula_mva: null,
                calcula_iva: null,
                gera_protocolo: data.gera_protocolo,
                tipo_protocolo: data.tipo_protocolo,
                finalidade_nfe: data.finalidade_nfe,
                escolher_vendedor_rotina: data.escolher_vendedor_rotina,
                vendedor_cadastro_parceiro_rotina: data.vendedor_cadastro_parceiro_rotina,
                atualiza_tabela_preco: data.atualiza_tabela_preco,
                atualiza_fornecedor_produtos: data.atualiza_fornecedor_produtos,
                libera_emitente_como_parceiro: data.libera_emitente_como_parceiro,
                tipoPagamento: {
                    id: data.tipoPagamento.id,
                    descricao: data.tipoPagamento.descricao,
                    gera_comissao: data.tipoPagamento.gera_comissao,
                    vinculado: data.tipoPagamento.vinculado,
                    concede_desconto: data.tipoPagamento.concede_desconto,
                    valor_min_para_desconto:data.tipoPagamento.valor_min_para_desconto,
                    valor_max_do_desconto:data.tipoPagamento.valor_max_do_desconto,
                    pode_dividir: data.tipoPagamento.pode_dividir,
                    qtd_max_parcelas: data.tipoPagamento.qtd_max_parcelas,
                    taxa_parcelamento: data.tipoPagamento.taxa_parcelamento,
                    taxa:data.tipoPagamento.taxa,
                    markup_default:data.tipoPagamento.markup_default,
                    valor_minimo:data.tipoPagamento.valor_minimo,
                    preco_especial: data.tipoPagamento.preco_especial,
                    tipo_pagamento_nfe: data.tipoPagamento.tipo_pagamento_nfe,
                    id_top_financeiro: data.tipoPagamento.id_top_financeiro,
                    desconto_porc: data.tipoPagamento.desconto_porc,
                    id_tipo_pagamento_vinculado: data.tipoPagamento.id_tipo_pagamento_vinculado,
                    desconto_variavel: data.tipoPagamento.desconto_variavel,
                    comissao:data.tipoPagamento.comissao,
                    gera_financeiro_rotina: data.tipoPagamento.gera_financeiro_rotina,
                    gera_financeiro_nfe: data.tipoPagamento.gera_financeiro_nfe,
                    valor_parcela_total_rotina: data.tipoPagamento.valor_parcela_total_rotina,
                    excluido: data.tipoPagamento.excluido,
                    utiliza_config_default: data.tipoPagamento.utiliza_config_default,
                    pre_desc_acres_nfe: data.tipoPagamento.pre_desc_acres_nfe,
                    ativo: data.tipoPagamento.ativo
                },
                tipo_operacao_fiscal: data.tipo_operacao_fiscal,
                nat_bc_cred: data.nat_bc_cred,
                excluido: false
            })
        }
        fetchData();
    }, [])

    const [dadosTop, setDadosTop] = useState({
        id:  "",
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

    const salvar = async () => {
        if(dadosTop.descricao && dadosTop.perfilMovimentacao.id){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+"/top/edit",{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dadosTop),
                })
                if(res.status === 200){
                    alert("Editado com sucesso!");
                    close();
                    localStorage.removeItem("idTop");
                }
            }catch(err){
                console.log(err);
            }
        }else{
            alert("Preencha os campos a cima!");
            setCampoObrigatorio("yellow");
        }
    }

    const excluir = async () => {
        if(dadosTop.descricao && dadosTop.perfilMovimentacao.id){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+"/top/edit",{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        ...dadosTop,
                        excluido: true
                    }),
                })
                if(res.status === 200){
                    alert("Excluido com sucesso!");
                    close();
                    localStorage.removeItem("idTop");
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
                    <h3>Editar TOP</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, top: true})}}><div className="linha"/></button>
                        <button className="close" onClick={()=> {close(); localStorage.removeItem("idTop")}}>X</button>
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
                            <input className="codigo" value={dadosTop.perfilMovimentacao.id} onDoubleClick={()=> setIsModalPerfil(true)} style={{backgroundColor: campoObrigatorio}}/>
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
                            <input className="codigo" value={dadosTop.tipoPagamento.id} onDoubleClick={()=> setIsModalPgto(true)}/>
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
                                    <input type="checkbox" checked={dadosTop.rotina_movimenta_estoque_reservado ? true : false} onChange={(e)=> setDadosTop({...dadosTop, rotina_movimenta_estoque_reservado: !dadosTop.rotina_movimenta_estoque_reservado})}/>
                                    <label>Reservar estoque</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.rotina_movimenta_estoque_real ? true : false} onChange={(e)=> setDadosTop({...dadosTop, rotina_movimenta_estoque_real: !dadosTop.rotina_movimenta_estoque_real})}/>
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
                                    <input type="checkbox" checked={dadosTop.emite_cupom_fiscal ? true : false} onChange={()=> setDadosTop({...dadosTop, emite_cupom_fiscal: !dadosTop.emite_cupom_fiscal})}/>
                                    <label>CUPOM FISCAL / NFCe</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked={dadosTop.emite_nota_fiscal ? true : false} onChange={()=> setDadosTop({...dadosTop, emite_nota_fiscal: !dadosTop.emite_nota_fiscal})}/>
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
                                <label>Grupo ICMS de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_icms ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_icms: !dadosTop.calcula_icms})}/>
                                <input className="codigo"/>
                                <input/>
                            </div>
                            <div>
                                <label>Grupo IPI de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_ipi ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_ipi: !dadosTop.calcula_ipi})}/>
                                <input className="codigo"/>
                                <input/>
                            </div>
                            <div>
                                <label>Grupo PIS de Top:</label>
                                <input type="checkbox" checked={dadosTop.calcula_pis ? true : false} onChange={()=> setDadosTop({...dadosTop, calcula_pis: !dadosTop.calcula_pis})}/>
                                <input className="codigo"/>
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
                                {dadosTop.incluir_obs_nfe && <button><img src="/images/add.png"/>Add</button>}                                
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
                        <button onClick={()=> {excluir(); setDadosTop({...dadosTop, excluido: true})}}><img src="/images/lixeira.png"/>Excluir</button>
                        <button onClick={()=> {close(); localStorage.removeItem("idTop")}}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {isModalPerfil ? <PerfilMovimentacao close={()=> setIsModalPerfil(false)} dadosTop={dadosTop} setDadosTop={setDadosTop}/> : null}
                {isModalPgto ? <Pgt onClose={()=> setIsModalPgto(false)} dadosTop={dadosTop} setDadosTop={setDadosTop}/> : null}
            </C.Container>
        </M.SubModal>
    )
}