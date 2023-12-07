import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal";
import * as CO from "../coletor";
import { ListaContagemEntrada } from "../listagemContagemEntrada";

export const ContagemEntrada = ({ close }) => {
    const { dataMask, user } = useContext(AuthContext);
    const [listagem, setListagem] = useState(true);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const [novo, setNovo] = useState(false);
    const [adicionado, setAdicionado] = useState(false);
    const [produtoEncontrado, setProdutoEncontrado] = useState(null);

    const [mensagem, setMensagem] = useState("Abra a câmera para ler o codigo!");
    const [editar, setEditar] = useState(false);
    const [auto, setAuto] = useState(false);
    const estadoAutoRef = useRef(auto);
    const [excluido, setExcluido] = useState(false);
    const [lista, setLista] = useState([]);
    const [cabecalho, setCabecalho] = useState({
        id: '',
        descricao: '',
        chave: '',
        data_conferencia: String(dataAtual),
        id_usuario_insercao: parseInt(localStorage.getItem("id")),
        id_usuario_edicao: '',
        data_edicao: '',
        id_usuario_exclusao: '',
        data_exclusao: '',
        excluido: 0,
        aberto: "",
        finalizada: 0,
        data_finalizada: null
    });
    const [detalhe, setDetalhe] = useState({
        id: "",
        id_contagem: "",
        id_produto: "",
        gtin: "",
        referencia: "",
        descricao_produto: "",
        quantidade: "",
        item: "",
        qtd_estoque: "",
    });
    const [detalheEditando, setDetalheEditando] = useState({
        id: "",
        id_contagem: cabecalho.id,
        id_produto: "",
        gtin: "",
        referencia: "",
        descricao_produto: "",
        quantidade: "",
        item: "",
        qtd_estoque: "",
    });
    const [item, setItem] = useState(0);
    const [estadoAuto, setEstadoAuto] = useState(false);

    // Função que salva o cabeçalho no banco caso tenha descrição
    function salvarCabecalho() {
        if (cabecalho.descricao && cabecalho.chave) {
            fetch("http://10.0.1.107:8091/contagemEntrada/cabecalhoSalvar", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    descricao: cabecalho.descricao,
                    chave: cabecalho.chave,
                    data_conferencia: dataAtual,
                    id_usuario_insercao: parseInt(localStorage.getItem("id")),
                    id_usuario_edicao: null,
                    data_edicao: null,
                    id_usuario_exclusao: null,
                    data_exclusao: null,
                    excluido: 0,
                    aberto: parseInt(localStorage.getItem("id")),
                    finalizada: 0,
                    data_finalizada: null
                })
            })
                .then(response => response.json())
                .then(json => { setCabecalho(json); setNovo(true); });
        }
    }

    // Função que salva um produto caso a busca no banco encontre um produto
    async function salvarDetalhe() {
        await buscarProduto();
        const codigo = localStorage.getItem("codigo");
        const autoAtual = estadoAutoRef.current;
        if (produtoEncontrado) {
            fetch("http://10.0.1.107:8091/contagemEntrada/detalheSalvar", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    id_contagem: cabecalho.id,
                    id_produto: detalhe.id_produto,
                    gtin: codigo,
                    referencia: detalhe.referencia,
                    descricao_produto: detalhe.descricao_produto,
                    quantidade: autoAtual === true ? parseFloat(1).toFixed(4).replace(",", ".") : parseFloat(detalhe.quantidade).toFixed(4).replace(",", "."),
                    item: item + 1,
                    qtd_estoque: parseFloat(detalhe.qtd_estoque).toFixed(4).replace(",", ".")
                })
            }).then(response => {
                if (response.status === 201 || response.status === 200) {
                    setAdicionado(true);
                    setLista([...lista, {
                        id_contagem: cabecalho.id,
                        id_produto: detalhe.id_produto,
                        gtin: codigo,
                        referencia: detalhe.referencia,
                        descricao_produto: detalhe.descricao_produto,
                        quantidade: autoAtual === true ? 1 : detalhe.quantidade,
                        item: item + 1,
                        qtd_estoque: detalhe.qtd_estoque
                    }]);
                    document.getElementById("codigo").focus();
                    document.getElementById("codigo").select();
                    setItem(item + 1);
                    const itensIguais = lista.filter((item) => item.gtin == codigo);
                    const ultimoItem = lista[lista.length - 1];
                    if (itensIguais.length < 50 && ultimoItem.gtin != codigo) {
                        agrupar();
                    } else if (itensIguais.length >= 50) {
                        agrupar();
                    }
                    setAdicionado(true);
                } else {
                    console.log("não foi possivel salvar no banco");
                }
            })
        }
        localStorage.removeItem("codigo");
        scanner();
    }

    async function buscarProduto() {
        const autoAtual = estadoAutoRef.current;
        if (autoAtual == false) {
            localStorage.setItem("codigo", detalhe.gtin);
        }
        const codigo = localStorage.getItem("codigo");
        const tipoSistema = localStorage.getItem("tipoSistema");
        try {
            const response = await fetch(`http://10.0.1.107:8091/contagemEntrada/buscarProduto/${tipoSistema}/${codigo}`);
            const data = await response.json();
            if (response.status === 200 || response.status === 201) {
                setDetalhe({ id_produto: data.codigo, descricao_produto: data.descricaopdv, referencia: data.referencia, gtin: data.gtin, qtd_estoque: data.qtd_estoque, ...(!auto ? {} : { quantidade: 1 }) });
                setProdutoEncontrado(true);
            } else {
                setDetalhe({ id_produto: "", descricao_produto: "", referencia: "", gtin: codigo, qtd_estoque: "", ...(!auto ? {} : { quantidade: 1 }) })
                setMensagem("PRODUTO NÃO ENCONTRADO!");
                setProdutoEncontrado(false);
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            setDetalhe({ id_produto: "", descricao_produto: "", referencia: "", gtin: codigo, qtd_estoque: "", ...(!auto ? {} : { quantidade: 1 }) });
            setMensagem("PRODUTO NÃO ENCONTRADO!");
            setProdutoEncontrado(null);
        }
    }

    //Função para iniciar o scanner, ao iniciar quando encontrar um codigo ele irá pegar o codigo e fechar o scanner
    function scanner() {
        localStorage.removeItem("codigo");
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
            scanner.clear();
            localStorage.setItem("codigo", result);
            window.navigator.vibrate(200)

            const autoAtual = estadoAutoRef.current;

            if (autoAtual) {
                await buscarProduto();
                setEstadoAuto(!estadoAuto);
            } else {
                setDetalhe({ ...detalhe, gtin: result });
            }
        }

        function error(err) {
            //console.warn(err);
        }
    }

    function scannerChave() {
        const scanner = new Html5QrcodeScanner('scanner-chave', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
            scanner.clear();
            window.navigator.vibrate(200)
            setCabecalho({ ...cabecalho, chave: result });
        }

        function error(err) {
            //console.warn(err);
        }
    }

    useEffect(() => {
        salvarDetalhe();
    }, [estadoAuto]);

    //Função para cancelar o item na lista e no banco
    async function cancelarItem(item, index) {
        var novaLista = lista.filter((item, i) => i !== index);

        //Função para procurar o item na tabela do banco e excluir, caso excluido no banco, ele remove da lista tambem
        fetch(`http://10.0.1.107:8091/contagemEntrada/deletarItem/${item.item}/${item.id_contagem}`, {
            method: "DELETE"
        })
            .then((resp) => {
                if (resp.status === 200 || resp.status === 201) {
                    setLista(novaLista);
                }
            })
    }

    //Função para abrir a tela de edição do item
    function editarItem(item, index) {
        setEditar(true);
        setDetalheEditando(item);
    }

    //Função para editar o item na lista e no banco
    async function editarDetalhe() {
        //Função para procurar o item na tabela do banco e editar, caso editado no banco, ele edita da lista tambem
        fetch(`http://10.0.1.107:8091/contagemEntrada/editarItem/${parseInt(detalheEditando.item)}/${parseInt(detalheEditando.id_contagem)}/${parseFloat(detalheEditando.quantidade)}`, {
            method: "PUT"
        }).then((resp) => {
            if (resp.status === 200 || resp.status === 201) {
                const itemEncontrado = lista.find((item) => item.item === detalheEditando.item);
                if (itemEncontrado) {
                    itemEncontrado.quantidade = parseFloat(detalheEditando.quantidade).toFixed(4).replace(",", ".");
                }
                setEditar(false);
            }
        })
    }

    async function agrupar() {
        await fetch(`http://10.0.1.107:8091/contagemEntrada/detalhe/ajustaContagem/${cabecalho.id}`);
        await fetchDetalhes();
    }

    // Atalhos na tecla Enter
    function enterCodigo(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById("quantidade").select();
        }
    }
    function enterQuantidade(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            salvarDetalhe();
        }
    }

    function novaContagem() {
        setListagem(false);
        setDetalhe({});
        setCabecalho({});
        setNovo(false);
        setLista([]);
        setItem(0);
    }

    async function voltar() {
        const usuario = localStorage.getItem("id");
        await agrupar();
        setListagem(true);
        setItem(0);
        setDetalhe({});
        setCabecalho({});
        setNovo(false);
        setLista([]);
        fetch(`http://10.0.1.107:8091/contagemEntrada/alterarStatus/${cabecalho.id}/null/0/null/${usuario}/${excluido ? 1 : 0}`, {
            method: "PUT"
        })
    }

    async function excluir() {
        const usuario = localStorage.getItem("id");
        fetch(`http://10.0.1.107:8091/contagemEntrada/alterarStatus/${cabecalho.id}/null/0/null/${usuario}/${excluido ? 1 : 0}`, {
            method: "PUT"
        })
    }
    useEffect(() => {
        excluir();
    }, [excluido])

    function finalizar() {
        const usuario = localStorage.getItem("id");
        fetch(`http://10.0.1.107:8091/contagemEntrada/alterarStatus/${cabecalho.id}/null/1/${dataAtual}/${usuario}/${excluido ? 1 : 0}`, {
            method: "PUT"
        })
        setListagem(true);
        setItem(0);
        setDetalhe({});
        setCabecalho({});
        setNovo(false);
        setLista([]);
    }

    async function abrir() {
        var usuario = localStorage.getItem("id");
        fetch(`http://10.0.1.107:8091/contagemEntrada/cabecalho/${cabecalho.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.aberto === "null" || data.aberto === null) {
                    fetchDetalhes(cabecalho).then(() => {
                        fetch(`http://10.0.1.107:8091/contagemEntrada/alterarStatus/${cabecalho.id}/${usuario}/0/null/${parseInt(usuario)}/0`, { // id/aberto/finalizada/data_finalizada
                            method: "PUT"
                        }).then((resp) => {
                            if (resp.status === 201 || resp.status === 200) {
                                setCabecalho({
                                    id: data.id,
                                    descricao: data.descricao,
                                    chave: data.chave,
                                    data_conferencia: data.data_conferencia,
                                    aberto: data.aberto,
                                });
                                setListagem(false);
                                setNovo(true);
                            }
                        })
                    })
                } else {
                    if (data.aberto === localStorage.getItem("id")) {
                        fetchDetalhes(cabecalho).then(() => {
                            fetch(`http://10.0.1.107:8091/contagemEntrada/alterarStatus/${cabecalho.id}/${usuario}/0/null/${parseInt(usuario)}/0`, { // id/aberto/finalizada/data_finalizada
                                method: "PUT"
                            }).then((resp) => {
                                if (resp.status === 201 || resp.status === 200) {
                                    setCabecalho({
                                        id: cabecalho.id,
                                        descricao: cabecalho.descricao,
                                        chave: cabecalho.chave,
                                        data_conferencia: cabecalho.data_conferencia,
                                        aberto: cabecalho.aberto,
                                    });
                                    setListagem(false);
                                    setNovo(true);
                                }
                            })
                        })
                    } else {
                        alert("Contagem aberta pelo usuário: " + data.aberto);
                    }
                }
            });
        await agrupar();
    }

    async function fetchDetalhes() {
        fetch(`http://10.0.1.107:8091/contagemEntrada/detalhe/${cabecalho.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setLista(data);
                data.map((i) => {
                    if (i.item > item) {
                        setItem(i.item);
                    }
                });
            })
    }

    function ativarModoAutomatico() {
        setAuto(!auto);
    }

    useEffect(() => {
        if (auto) {
            setDetalhe({
                gtin: "",
                quantidade: 1,
            });
            localStorage.removeItem("codigo");
        }
        estadoAutoRef.current = auto;
    }, [auto])

    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Recepção Nota de Entrada</h3>
                    <div className="buttons">
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                {
                    !listagem ? (
                        <CO.Content>
                            <div className="cabecalho">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <label style={{ fontWeight: "bold" }}>Chave NFe:</label>
                                    {novo ? (
                                        <input value={cabecalho.chave ? cabecalho.chave : ""} style={{ backgroundColor: "#f0f0f0" }} readOnly />
                                    ) : (
                                        <>
                                            <input value={cabecalho.chave ? cabecalho.chave : ""} onChange={(e) => setCabecalho({ ...cabecalho, chave: e.target.value })} />
                                            <img alt="" src="/images/camera.png" onClick={scannerChave} />
                                        </>
                                    )}
                                </div>
                                <label style={{ fontWeight: "bold" }}>Código:</label>
                                <label style={{ marginLeft: "5px", fontWeight: "bold", width: "50px" }}>{cabecalho.id ? cabecalho.id : ""}</label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <label style={{ marginRight: "10px", fontWeight: "bold" }}>Descrição:</label>
                                    {novo ? (
                                        <input value={cabecalho.descricao ? cabecalho.descricao : ""} style={{ backgroundColor: "#f0f0f0" }} readOnly />
                                    ) : (
                                        <input value={cabecalho.descricao ? cabecalho.descricao : ""} onChange={(e) => setCabecalho({ ...cabecalho, descricao: e.target.value })} />
                                    )}
                                </div>
                                <label style={{ fontWeight: "bold", width: "150px", textAlign: "start" }}>Data: <label style={{ fontWeight: "normal" }}>{cabecalho.data_conferencia ? dataMask(cabecalho.data_conferencia) : ""}</label></label>
                                {!novo && <button onClick={salvarCabecalho}><img alt="" src="/images/add.png" />Criar</button>}
                                <label style={{ fontWeight: "bold" }}>Usuário: <label style={{ fontWeight: "normal" }}>{user.map(user => user.id + " - " + user.nome)}</label></label>
                                {novo &&
                                    <div>
                                        <input type="checkbox" onChange={(e) => setExcluido(e.target.checked)} checked={excluido} />
                                        <label>Excluir</label>
                                    </div>
                                }
                                {!novo && <div id="scanner-chave" />}
                            </div>
                            {novo ? (
                                <>
                                    <div id="reader" />
                                    {produtoEncontrado === true && adicionado === true ? (
                                        <div className="produto-add">
                                            <label>{detalhe.descricao_produto} * {detalhe.quantidade}</label>
                                        </div>
                                    ) : null}
                                    {produtoEncontrado === false ? (
                                        <div className="produto-add" style={{ color: "red" }}>
                                            <label>{mensagem}</label>
                                        </div>
                                    ) : null}
                                    <div className="campos-add">
                                        <div style={{ display: "flex", alignItems: "start", margin: "20px" }}>
                                            <label>Contagem</label>
                                            <img alt="" src="/images/botao.png" onClick={ativarModoAutomatico} className={auto ? "auto" : ""} style={{ margin: "auto 5px 0px 5px" }} />
                                            <label>Auto</label>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <label>Código: </label>
                                            <input id="codigo" value={String(detalhe.gtin).replace(undefined, "")} onChange={(e) => setDetalhe({ ...detalhe, gtin: e.target.value })} onFocus={() => setAdicionado(false)} onKeyDown={enterCodigo} />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <label>Quantidade: </label>
                                            {auto ? (
                                                <input type="number" id="quantidade" value={detalhe.quantidade} style={{ width: "60px", backgroundColor: "#f0f0f0" }} readOnly />
                                            ) : (
                                                <input type="number" id="quantidade" value={detalhe.quantidade} onChange={(e) => setDetalhe({ ...detalhe, quantidade: e.target.value })} onFocus={buscarProduto} style={{ width: "60px" }} onKeyDown={enterQuantidade} />
                                            )}
                                            <img alt="+" src="/images/add.png" onClick={salvarDetalhe} />
                                            <img alt="camera" src="/images/camera.png" onClick={scanner} />
                                        </div>
                                    </div>
                                    <div className="campo-lista">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Código</th>
                                                    <th>Descrição</th>
                                                    <th style={{ width: "100px" }}>Quantidade</th>
                                                    <th>Estoque atual</th>
                                                    <th style={{ width: "100px" }}>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {lista.map((item, index) => {
                                                    return (
                                                        <tr key={index + 1}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.gtin}</td>
                                                            <td>{item.descricao_produto}</td>
                                                            <td>{parseFloat(item.quantidade).toFixed(4).replace(".", ",")}</td>
                                                            <td>{parseFloat(item.qtd_estoque).toFixed(4).replace(".", ",")}</td>
                                                            <td><img alt="" src="/images/lixeira.png" onClick={cancelarItem.bind(this, item, index)} /> <img alt="" src="/images/editar.png" onClick={editarItem.bind(this, item, index)} /></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {editar ? (
                                        <M.Modal>
                                            <CO.Editar>
                                                <C.Header>
                                                    <h4>Editando Item {detalheEditando.item}</h4>
                                                    <div className="buttons">
                                                        <button className="close" onClick={() => setEditar(false)}>X</button>
                                                    </div>
                                                </C.Header>
                                                <h3>{detalheEditando.descricao_produto}</h3>
                                                <div className="editar">
                                                    <label style={{ fontWeight: "bold" }}>Gtin: </label>
                                                    <label style={{ marginLeft: "5px" }}>{detalheEditando.gtin}</label>
                                                </div>
                                                <div className="editar">
                                                    <label>Quantidade: </label>
                                                    <input type="number" value={detalheEditando.quantidade} onChange={(e) => setDetalheEditando({ ...detalheEditando, quantidade: e.target.value })} style={{ width: "60px" }} />
                                                    <img alt="" src="/images/add.png" onClick={editarDetalhe} />
                                                </div>
                                            </CO.Editar>
                                        </M.Modal>
                                    ) : null}
                                </>
                            ) : null}
                        </CO.Content>
                    ) : (
                        <ListaContagemEntrada setCabecalho={setCabecalho} abrir={abrir} />
                    )
                }
                <C.Footer>
                    {listagem ? (
                        <div className="buttons">
                            <button onClick={novaContagem}><img alt="" src="/images/add.png" />Novo</button>
                            <button onClick={abrir}><img alt="" src="/images/abrir.png" />Abrir</button>
                            <button onClick={close}><img alt="" src="/images/voltar.png" />Voltar</button>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button onClick={finalizar}><img alt="" src="/images/check.png" />Finalizar</button>
                            <button onClick={voltar}><img alt="" src="/images/voltar.png" />Voltar</button>
                        </div>
                    )}
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}