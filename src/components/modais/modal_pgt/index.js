import React, {useEffect, useState, useRef} from "react";
import { Loading } from "../../loading/index.js";
import { CadastroPgto } from "../modal_cadastro_pgto/index.js";
import * as M from './../modal/modal.js';


export const Pgt = ({onClose = () =>{}, focoCampoSeguinte, setDataSelectPgt, setDataIdSelectPgt, setTipoPgtoAlterado, cadastro, minimizado, setMinimizado, dadosRotina, setDadosRotina, dadosTop, setDadosTop}) => {

    const [pgto, setPgto] = useState([]);
    const [selectPgt, setSelectPgt] = useState();
    const [selectIdPgt, setSelectIdPgt] = useState();
    const [busca, setBusca] = useState('');
    const [cadastrar, setCadastrar] = useState(false);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+"/tipoPagamento/all");
            const data = await response.json();
            setPgto(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const SelectedPgt = (pgto) => {
        setSelectPgt(pgto.descricao);
        setSelectIdPgt(pgto.id);
        setDataSelectPgt && setDataSelectPgt(pgto.descricao);
        setDataIdSelectPgt && setDataIdSelectPgt(pgto.id);
        setDadosRotina && setDadosRotina({
            ...dadosRotina,
            pgto: {
                id: pgto.id,
                descricao: pgto.descricao
            }
        });
        setDadosTop && setDadosTop({
            ...dadosTop,
            tipoPagamento: {
                id: pgto.id,
                descricao: pgto.descricao,
                gera_comissao: pgto.gera_comissao,
                vinculado: pgto.vinculado,
                concede_desconto: pgto.concede_desconto,
                valor_min_para_desconto: pgto.valor_min_para_desconto,
                valor_max_do_desconto: pgto.valor_max_do_desconto,
                pode_dividir: pgto.pode_dividir,
                qtd_max_parcelas: pgto.qtd_max_parcelas,
                taxa_parcelamento: pgto.taxa_parcelamento,
                taxa: pgto.taxa,
                markup_default: pgto.markup_default,
                valor_minimo: pgto.valor_minimo,
                preco_especial: pgto.preco_especial,
                tipo_pagamento_nfe: pgto.tipo_pagamento_nfe,
                id_top_financeiro: pgto.id_top_financeiro,
                desconto_porc: pgto.desconto_porc,
                id_tipo_pagamento_vinculado: pgto.id_tipo_pagamento_vinculado,
                desconto_variavel: pgto.desconto_variavel,
                comissao:pgto.comissao,
                gera_financeiro_rotina: pgto.gera_financeiro_rotina,
                gera_financeiro_nfe: pgto.gera_financeiro_nfe,
                valor_parcela_total_rotina: pgto.valor_parcela_total_rotina,
                excluido: pgto.excluido,
                utiliza_config_default: pgto.utiliza_config_default,
                pre_desc_acres_nfe: pgto.pre_desc_acres_nfe,
                ativo: pgto.ativo
            }
        })
        onClose();
        focoCampoSeguinte();
        setTipoPgtoAlterado(true);
    };

    //Filtro de busca
    const resultado = Array.isArray(pgto) && pgto.filter((pgto) => {
        return pgto.descricao.toLowerCase().includes(busca);
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (pgto, index) => {
        setSelectIndex(index);
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 38){
            e.preventDefault();
            if(selectIndex === null || selectIndex === 0){
                return;
            }
            setSelectIndex(selectIndex-1);
        }else if (e.keyCode === 40){
            e.preventDefault();
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                setSelectPgt(resultado[selectIndex].descricao);
                setSelectIdPgt(resultado[selectIndex].id);
                setDataSelectPgt(resultado[selectIndex].descricao);
                setDataIdSelectPgt(resultado[selectIndex].id);
                setDadosRotina && setDadosRotina({
                    ...dadosRotina,
                    pgto: {
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].descricao
                    }
                });
                setDadosTop && setDadosTop({
                    ...dadosTop,
                    tipoPagamento: {
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].descricao,
                        gera_comissao: resultado[selectIndex].gera_comissao,
                        vinculado: resultado[selectIndex].vinculado,
                        concede_desconto: resultado[selectIndex].concede_desconto,
                        valor_min_para_desconto: resultado[selectIndex].valor_min_para_desconto,
                        valor_max_do_desconto: resultado[selectIndex].valor_max_do_desconto,
                        pode_dividir: resultado[selectIndex].pode_dividir,
                        qtd_max_parcelas: resultado[selectIndex].qtd_max_parcelas,
                        taxa_parcelamento: resultado[selectIndex].taxa_parcelamento,
                        taxa: resultado[selectIndex].taxa,
                        markup_default: resultado[selectIndex].markup_default,
                        valor_minimo: resultado[selectIndex].valor_minimo,
                        preco_especial: resultado[selectIndex].preco_especial,
                        tipo_pagamento_nfe: resultado[selectIndex].tipo_pagamento_nfe,
                        id_top_financeiro: resultado[selectIndex].id_top_financeiro,
                        desconto_porc: resultado[selectIndex].desconto_porc,
                        id_tipo_pagamento_vinculado: resultado[selectIndex].id_tipo_pagamento_vinculado,
                        desconto_variavel: resultado[selectIndex].desconto_variavel,
                        comissao:resultado[selectIndex].comissao,
                        gera_financeiro_rotina: resultado[selectIndex].gera_financeiro_rotina,
                        gera_financeiro_nfe: resultado[selectIndex].gera_financeiro_nfe,
                        valor_parcela_total_rotina: resultado[selectIndex].valor_parcela_total_rotina,
                        excluido: resultado[selectIndex].excluido,
                        utiliza_config_default: resultado[selectIndex].utiliza_config_default,
                        pre_desc_acres_nfe: resultado[selectIndex].pre_desc_acres_nfe,
                        ativo: resultado[selectIndex].ativo
                    }
                })
                onClose();
                focoCampoSeguinte();
                setTipoPgtoAlterado(true);
            }
        }
    };

    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.Modal style={{zIndex: minimizado && minimizado.pgto ? minimizar : "1"}}>
            <M.Container>
            <M.Header>
                <label>Tipo Pagamento</label>
                <div className="buttons">
                    <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, pgto: true})}}><div className="linha"/></button>
                    <button className="close" onClick={onClose}>X</button>
                </div>
            </M.Header>
            <M.Filtro>                        
                <label>Buscar: </label>                    
                <div className="div-search">
                    <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>                
            </M.Filtro>
            {pgto.length === 0 && carregado === false ? (
                <Loading/>
            ) : pgto.length === 0 && carregado ? (
                <div className="table-responsive">
                    <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Ativo</th>
                                <th>Descrição</th>
                                <th>Raiz</th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold"}}>
                        Não Existem dados a serem exibidos!
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Ativo</th>
                                <th>Descrição</th>
                                <th>Raiz</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map( (pgto, index) => {
                                return(
                                    <tr 
                                        key={pgto.id} 
                                        onClick={selecionado.bind(this, pgto, index)}
                                        onDoubleClick={SelectedPgt.bind(this, pgto)}
                                        style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}} >
                                            <td>{pgto.id}</td>
                                            <td>Sim</td>
                                            <td>{pgto.descricao}</td>
                                            <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {cadastro && cadastro.pgto ? (
                <M.Footer>
                    <div className="buttons">
                        <button onClick={()=> setCadastrar(true)}><img alt="" src="/images/add.png"/>Novo</button>
                        <button><img alt="" src="/images/abrir.png"/>Abrir</button>
                        <button onClick={onClose}><img alt="" src="/images/voltar.png"/>Fechar</button>
                    </div>
                </M.Footer>
            ) : null}
            </M.Container>
            {cadastrar ? <CadastroPgto close={()=> setCadastrar(false)} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar}/> : null}
        </M.Modal>
    );
};