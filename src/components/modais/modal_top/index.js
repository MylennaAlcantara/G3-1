import React, { useEffect, useRef, useState } from "react";
import { CadastrarTop } from "../../cadastros/tabela_auxiliar/cadastro_top/index.js";
import { EditarTop } from "../../cadastros/tabela_auxiliar/editar_top/index.js";
import { Loading } from "../../loading/index.js";
import { Container, Filtro, Footer, Header, Modal } from './../modal/modal.js';


export const Top = ({ onClose = () => { }, focoCampoSeguinte, setDataSelectTop, setTopAlterada, setValorTop, valorTop, cadastro, setMinimizado, minimizado, dadosRotina, setDadosRotina }) => {

    const [top, setTop] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('codigo');
    const [modalCadastro, setModalCadastro] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO + "/top/all");//http://localhost:5000/tops
            const data = await response.json();
            setTop(data);
            if (response.status === 200) {
                setCarregado(true);
            }
        }
        fetchData();
        document.getElementById('search').focus();
    }, []);

    const SelectedTop = (top) => {
        setValorTop && setValorTop([...valorTop, top])
        setDataSelectTop && setDataSelectTop({
            id_top: top.id,
            id_perfil_movimentacao: top.id_perfil_movimentacao,
            libera_itens_estoque_indisponivel: top.libera_itens_estoque_indisponivel,
            descricao: top.descricao,
            tipo_movimentacao: top.tipo_movimentacao,
            rotina_movimenta_estoque_reservado: top.rotina_movimenta_estoque_reservado,
            gera_financeiro: top.gera_financeiro,
            rotina_movimenta_estoque_real: top.rotina_movimenta_estoque_real,
            rotina_movimenta_estoque_deposito_interno: top.rotina_movimenta_estoque_deposito_interno,
            libera_editar_nome_do_consumidor_final: top.libera_editar_nome_do_consumidor_final,
            editar_preco_rotina: top.editar_preco_rotina,
            tipo_edicao_preco_rotina: top.tipo_edicao_preco_rotina,
            index_preco_vinculado: top.index_preco_vinculado
        });
        setDadosRotina && setDadosRotina({
            ...dadosRotina,
            top: {
                id_top: top.id,
                id_perfil_movimentacao: top.id_perfil_movimentacao,
                libera_itens_estoque_indisponivel: top.libera_itens_estoque_indisponivel,
                descricao: top.descricao,
                tipo_movimentacao: top.tipo_movimentacao,
                rotina_movimenta_estoque_reservado: top.rotina_movimenta_estoque_reservado,
                gera_financeiro: top.gera_financeiro,
                rotina_movimenta_estoque_real: top.rotina_movimenta_estoque_real,
                rotina_movimenta_estoque_deposito_interno: top.rotina_movimenta_estoque_deposito_interno,
                libera_editar_nome_do_consumidor_final: top.libera_editar_nome_do_consumidor_final,
                editar_preco_rotina: top.editar_preco_rotina,
                tipo_edicao_preco_rotina: top.tipo_edicao_preco_rotina
            }
        })
        onClose();
        focoCampoSeguinte();
        setTopAlterada(true);
    };

    // Filtro de busca

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value)
    };

    const resultado = Array.isArray(top) && top.filter((top) => {
        if (filtro === 'codigo') {
            return String(top.id).toLowerCase().includes(busca);
        } else if (filtro === 'descricao') {
            return top.descricao.toLowerCase().includes(busca);
        } else {
            return null;
        }
    });

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (top, index) => {
        setSelectIndex(index);
        localStorage.setItem("idTop", top.id);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            e.preventDefault();
            if (selectIndex === null || selectIndex === 0) {
                return;
            }
            setSelectIndex(selectIndex - 1);
        } else if (e.keyCode === 40) {
            e.preventDefault();
            if (selectIndex === null || selectIndex === resultado.length - 1) {
                return;
            }
            setSelectIndex(selectIndex + 1);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (selectIndex !== null) {
                setValorTop && setValorTop([...valorTop, resultado[selectIndex]])
                setDataSelectTop({
                    id_top: resultado[selectIndex].id,
                    id_perfil_movimentacao: resultado[selectIndex].id_perfil_movimentacao,
                    libera_itens_estoque_indisponivel: resultado[selectIndex].libera_itens_estoque_indisponivel,
                    descricao: resultado[selectIndex].descricao,
                    tipo_movimentacao: resultado[selectIndex].tipo_movimentacao,
                    rotina_movimenta_estoque_reservado: resultado[selectIndex].rotina_movimenta_estoque_reservado,
                    gera_financeiro: resultado[selectIndex].gera_financeiro,
                    rotina_movimenta_estoque_real: resultado[selectIndex].rotina_movimenta_estoque_real,
                    rotina_movimenta_estoque_deposito_interno: resultado[selectIndex].rotina_movimenta_estoque_deposito_interno,
                    libera_editar_nome_do_consumidor_final: resultado[selectIndex].libera_editar_nome_do_consumidor_final,
                    editar_preco_rotina: resultado[selectIndex].editar_preco_rotina,
                    tipo_edicao_preco_rotina: resultado[selectIndex].tipo_edicao_preco_rotina,
                    index_preco_vinculado: resultado[selectIndex].index_preco_vinculado
                });
                setDadosRotina && setDadosRotina({
                    ...dadosRotina,
                    top: {
                        id_top: resultado[selectIndex].id,
                        id_perfil_movimentacao: resultado[selectIndex].id_perfil_movimentacao,
                        libera_itens_estoque_indisponivel: resultado[selectIndex].libera_itens_estoque_indisponivel,
                        descricao: resultado[selectIndex].descricao,
                        tipo_movimentacao: resultado[selectIndex].tipo_movimentacao,
                        rotina_movimenta_estoque_reservado: resultado[selectIndex].rotina_movimenta_estoque_reservado,
                        gera_financeiro: resultado[selectIndex].gera_financeiro,
                        rotina_movimenta_estoque_real: resultado[selectIndex].rotina_movimenta_estoque_real,
                        rotina_movimenta_estoque_deposito_interno: resultado[selectIndex].rotina_movimenta_estoque_deposito_interno,
                        libera_editar_nome_do_consumidor_final: resultado[selectIndex].libera_editar_nome_do_consumidor_final,
                        editar_preco_rotina: resultado[selectIndex].editar_preco_rotina,
                        tipo_edicao_preco_rotina: resultado[selectIndex].tipo_edicao_preco_rotina
                    }
                })
                onClose();
                focoCampoSeguinte();
                setTopAlterada(true);
            }
        }
    };


    const [minimizar, setMinimizar] = useState("");

    return (
        <Modal style={{ zIndex: minimizado && minimizado.top === true ? minimizar : "1" }}>
            <Container>
                <Header>
                    <label> Top</label>
                    <div className="buttons">
                        <button className="minimizar" onClick={() => { setMinimizar("-5"); setMinimizado({ ...minimizado, top: true }) }}><div className="linha" /></button>
                        <button className="close" onClick={onClose}>X</button>
                    </div>
                </Header>
                <Filtro>
                    <div className="div-checkbox">
                        <div>
                            <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange} />
                            <label> Código </label>
                        </div>
                        <div>
                            <input type="radio" value="descricao" className="checkbox" name="checkbox" checked={filtro === 'descricao'} onChange={handleFiltroChange} />
                            <label> Descrição </label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>
                </Filtro>
                {top.length === 0 && carregado === false ? (
                    <Loading />
                ) : top.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table" ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Mov. Est. reservado</th>
                                    <th>Mov. Est. Real</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold" }}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0} >
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Mov. Est. reservado</th>
                                    <th>Mov. Est. Real</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((top, index) => {
                                    return (
                                        <tr
                                            key={top.id}
                                            onClick={selecionado.bind(this, top, index)}
                                            onDoubleClick={SelectedTop.bind(this, top)}
                                            style={{ backgroundColor: index === selectIndex ? '#87CEFA' : '' }} >
                                            <td>{top.id}</td>
                                            <td>{top.descricao}</td>
                                            <td>{top.rotina_movimenta_estoque_reservado === false ? ('Não') : ('Sim')}</td>
                                            <td>{top.rotina_movimenta_estoque_real === false ? ('Não') : ('Sim')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {cadastro && cadastro.top ? (
                    <Footer>
                        <div className="buttons">
                            <button onClick={() => setModalCadastro(true)}><img alt="adicionar" src="/images/add.png" />Novo</button>
                            <button onClick={() => setModalEditar(true)}><img alt="abrir" src="/images/abrir.png" />Abrir</button>
                            <button onClick={onClose}><img alt="voltar" src="/images/voltar.png" />Fechar</button>
                        </div>
                    </Footer>
                ) : null}
                {modalCadastro ? <CadastrarTop close={() => setModalCadastro(false)} setMinimizado={setMinimizado} minimizado={minimizado} setMinimizar={setMinimizar} minimizar={minimizar} /> : null}
                {modalEditar ? <EditarTop close={() => setModalEditar(false)} setMinimizado={setMinimizado} minimizado={minimizado} setMinimizar={setMinimizar} minimizar={minimizar} /> : null}
            </Container>
        </Modal>
    );
};