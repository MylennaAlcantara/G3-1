import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext.js";
import * as C from "./consultar.js";
import { rotinaPDF } from "../Relatorios/rotinaPDF.js";
import { Loading } from "../loading";

export const Consultar = ({ setCodigo, setDataEmissao, setHoraEmissao }) => {
    const [rotinas, setRotinas] = useState([]);
    const navigate = useNavigate();
    const { autenticar, user, empresa, filiais, nivel, cnpjMask, dataMask } = useContext(AuthContext);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    async function fetchDataRotina() {
        fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+`/preVenda/${busca}`)
        .then((response)=> response.json())
        .then((data)=>{
            setRotinas([data]);
            setCarregado(true);
        })
    }
    async function fetchData() {
        fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+'/preVenda/ofMonth')
        .then((response)=> response.json())
        .then((data)=>{
            setRotinas(data);
            setCarregado(true);
        })
    }
    useEffect(() => {
        fetchData();
        autenticar();
        document.getElementById('search').focus();
    }, [])

    //Filtro busca por: Top / id vendedor / codigo / cliente / data
    const [busca, setBusca] = useState('');
    const [filtroSelecionado, setFiltroSelecionado] = useState('cliente');

    //Filtro da situação das rotinas
    const select = document.getElementById('opções');
    const selectFilial = document.getElementById('filial');
    const [filtroEscolhido, setFiltroEscolhido] = useState('T');
    const [filialEscolhida, setFilialEscolhida] = useState('1')

    function FiltroSituacao() {
        if (select.value === '1') {
            setFiltroEscolhido('A');
        } else if (select.value === '2') {
            setFiltroEscolhido('T');
        } else if (select.value === '3') {
            setFiltroEscolhido('P');
        } else if (select.value === '4') {
            setFiltroEscolhido('E');
        } else if (select.value === '5') {
            setFiltroEscolhido('B');
        }
    }

    const resultado3 = Array.isArray(rotinas) && rotinas.filter((rotina) => rotina.id_empresa == selectFilial.value)

    const resultado2 = Array.isArray(resultado3) && resultado3.filter((rotina) => {
        if (filtroEscolhido === 'P') {
            return rotina.situacao === 'P';
        } else if (filtroEscolhido === 'B') {
            return rotina.situacao === 'B';
        } else if (filtroEscolhido === 'T') {
            return rotina.situacao;
        } else if (filtroEscolhido === 'E') {
            return rotina.situacao === 'E'
        } else if (filtroEscolhido === 'A') {
            return rotina.situacao != 'E';
        }
    });

    function handleFiltroChange(event) {
        setFiltroSelecionado(event.target.value);
    }

    const resultado = Array.isArray(resultado2) && resultado2.filter((rotina) => {
        if (filtroSelecionado === 'cliente') {
            return rotina.nome_cliente.toLowerCase().includes(busca);
        } else if (filtroSelecionado === 'data') {
            return dataMask(rotina.dataEmissao).toLowerCase().includes(busca);
        } else if (filtroSelecionado === 'top') {
            return String(rotina.id_top).toLowerCase().includes(busca);
        } else if (filtroSelecionado === 'vendedor') {
            return String(rotina.id_funcionario).toLowerCase().includes(busca);
        } else if (filtroSelecionado === 'numero') {
            return String(rotina.id).toLowerCase().includes(busca);
        }
    });

    //selecionar a rotina atraves da seta para baixo e para cima
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

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
            if(rotinas.length > 0){
                console.log(rotinas[selectIndex])
                selecionado(selectIndex, rotinas[selectIndex]);
                abrirRotina();
            }else{
                if (filtroSelecionado === "numero" && busca !== "") {
                    fetchDataRotina();
                } else {
                    console.log("entrou3")
                    fetchData();
                }
            }
        }
    };

    //Selecionar rotina para abrir para visualizar
    const [codigoRotina, setCodigoRotina] = useState();
    const selecionado = (index, item) => {
        setCodigoRotina(item.id);
        localStorage.setItem('rotina', item.id);
        setCodigo(item.id);
        setDataEmissao(item.dataEmissao);
        setHoraEmissao(item.hora_emissao);
        setSelectIndex(index);
    }

    //Função dos botões
    const Novo = () => {
        navigate("/rotina");
    }
    const abrirRotina = () => {
        navigate(`/rotina/${codigoRotina}`);
    }
    const abrirEditar = async () => {
        const responseRotina = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+`/preVenda/${codigoRotina}`); //http://10.0.1.10:8091/preVenda/id
        const rotina = await responseRotina.json();
        if (codigoRotina === undefined) {
            console.log('nenhuma rotina selecionada')
        } else if (rotina.id === codigoRotina && rotina.situacao === 'B') {
            alert('Rotina esta bloqueada!')
        } else if (rotina.id === codigoRotina && rotina.situacao === 'E') {
            alert('Rotina já emitida!')
        } else if (rotina.id === codigoRotina && rotina.situacao === 'F'){
            abrirRotina();
        }else {
            navigate(`/editarRotina/${codigoRotina}`);
        }
    }

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
    }, []);

    const imprimir = async () => {
        const [responseRotina, responseVendedor, responseParceiro, responseTipoPagamento, responseEmitente] = await Promise.all([
            fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+`/preVenda/${codigoRotina}`),
            fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/user/all'),
            fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/clientes'),
            fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+'/tipoPagamento/all'),
            fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+'/emitente/all')
        ]);

        const [rotina, vendedor, parceiro, tipoPagamento, Emitente] = await Promise.all([
            responseRotina.json(),
            responseVendedor.json(),
            responseParceiro.json(),
            responseTipoPagamento.json(),
            responseEmitente.json()
        ]);

        rotinaPDF(rotina, vendedor, parceiro, tipoPagamento, Emitente, horaImpressao, dataMask);
    }

    function comparar(a, b) {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1
        }
        return 0;
    }


    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))} </C.NaviBar>

            <C.Header>
                <h3>Consultar</h3>
            </C.Header>
            <C.Filtro>
                <div className="div-checkbox">
                    <div>
                        <input type="radio" value="numero" className="checkbox" name="checkbox" id="numero" checked={filtroSelecionado === 'numero'} onChange={handleFiltroChange} />
                        <label>Código</label>
                    </div>
                    <div>
                        <input type="radio" value="data" className="checkbox" name="checkbox" id="data" checked={filtroSelecionado === 'data'} onChange={handleFiltroChange} />
                        <label>Data</label>
                    </div>
                    <div>
                        <input type="radio" value="top" className="checkbox" name="checkbox" id="top" checked={filtroSelecionado === 'top'} onChange={handleFiltroChange} />
                        <label>TOP</label>
                    </div>
                    <div>
                        <input type="radio" value="cliente" className="checkbox" name="checkbox" id="cliente" checked={filtroSelecionado === 'cliente'} onChange={handleFiltroChange} />
                        <label>Cliente</label>
                    </div>
                    <div>
                        <input type="radio" value="vendedor" className="checkbox" name="checkbox" id="vendedor" checked={filtroSelecionado === 'vendedor'} onChange={handleFiltroChange} />
                        <label>Id Vendedor</label>
                    </div>
                </div>
                <select id="filial" onChange={() => setFilialEscolhida(selectFilial.value)}>
                    {filiais.map((op) => {
                        return (
                            <option value={op.id} key={op.id}>{op.id} - {op.razao_social}</option>
                        )
                    })}
                </select>
                <input className="search" id="search" placeholder="Buscar" value={busca} onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown} />
                <div>
                    <label>Situação da Rotina</label>
                    <select id="opções" onChange={FiltroSituacao}>
                        <option value="2">Todas</option>
                        <option value="3">Pendente</option>
                        <option value="4">Emitida</option>
                        <option value="5">Bloqueada</option>
                        <option value="1">Em Aberto</option>
                    </select>
                </div>
                <div className="line" />
            </C.Filtro>
            <C.Rotinas>
                {rotinas.length === 0 && carregado === false ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Loading style={{ margin: "auto" }} />
                    </div>
                ) : rotinas.length === 0 && carregado ? (
                    <div style={{width: "100%"}}>
                        <table id="table" ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Data Venda</th>
                                    <th>Empresa</th>
                                    <th>Cliente</th>
                                    <th>Situação</th>
                                    <th>Valor</th>
                                    <th>TOP</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold" }}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Data Venda</th>
                                <th>Empresa</th>
                                <th>Cliente</th>
                                <th>Situação</th>
                                <th>Valor</th>
                                <th>TOP</th>
                            </tr>
                        </thead>
                        <tbody >
                            {Array.isArray(resultado) &&
                                resultado.sort(comparar).map((item, index) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            onClick={selecionado.bind(this, index, item)}
                                            onDoubleClick={abrirRotina}
                                            className={item.situacao === 'E' ? 'white' : item.situacao === 'B' ? 'red' : 'yellow'}
                                            style={{ background: index === selectIndex ? '#87CEFA' : '' }} >
                                            <td>{item.id}</td>
                                            <td>{dataMask(item.dataEmissao)}</td>
                                            <td>{item.id_empresa}</td>
                                            <td>{item.nome_cliente}</td>
                                            <td>{item.situacao}</td>
                                            <td>{(item.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{item.id_top}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                )}
            </C.Rotinas>
            <C.Footer>
                {/*<div>
                    <label>Para exibir atalhos pressione [Alt]</label>
                        </div>*/}
                <div className="botoes">
                    <button onClick={Novo}><img alt="novo" src="/images/add.png" />Novo</button>
                    <button onClick={abrirEditar}><img alt="abrir" src="/images/abrir.png" />Abrir</button>
                    <button onClick={imprimir}><img alt="imprimir" src="/images/printer.png" />Imprimir</button>
                    <button onClick={() => navigate('/home')}><img alt="voltar" src="/images/voltar.png" />Fechar</button>
                </div>
                <div className="indice">
                    <div>
                        <div className="yellow" /><label>Pendente</label>
                    </div>
                    <div>
                        <div className="white" /><label>NF-e/NFC-e</label>
                    </div>
                    <div>
                        <div className="green" /><label>Cupom F.</label>
                    </div>
                    <div>
                        <div className="blue" /><label>Mesclada</label>
                    </div>
                </div>
            </C.Footer>
        </C.Container>
    );
};