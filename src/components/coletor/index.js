import React, { useEffect, useState } from "react";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./coletor";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/authContext";
import { ListaContagem } from "./listaContagem";


export const Coletor = ({ close }) => {
    const { dataMask } = useContext(AuthContext);
    const [ip, setIp] = useState();
    const [listagem, setListagem] = useState(true);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const [novo, setNovo] = useState(false);
    const [adicionado, setAdicionado] = useState(false);
    //const [produtoEncontrado, setProdutoEncontrado] = useState(false);
    const produtoEncontrado = localStorage.getItem("produtoEncontrado");
    const [editar, setEditar] = useState(false);
    const [auto, setAuto] = useState(false);

    const [lista, setLista] = useState([]);
    const [cabecalho, setCabecalho] = useState({
        id: "",
        descricao: "",
        data_contagem: ""
    });
    const [detalhe, setDetalhe] = useState({
        id: "",
        id_contagem: cabecalho.id,
        gtin: "",
        descricao_produto: "",
        quantidade: "",
        item: ""
    });
    const [detalheEditando, setDetalheEditando] = useState({
        id: "",
        id_contagem: cabecalho.id,
        gtin: "",
        descricao_produto: "",
        quantidade: "",
        item: ""
    });

    useEffect(() => {
        async function pegarIp() {
            fetch("http://10.0.1.107:8091/coletor/ip")
                .then(response => response.text())
                .then(data => setIp(data))
                .catch(error => console.log(error));
        }
        pegarIp();
    }, [])

    // Função que salva o cabeçalho no banco caso tenha descrição
    function salvarCabecalho() {
        if (cabecalho.descricao) {
            fetch("http://10.0.1.107:8091/coletor/cabecalhoSalvar", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    descricao: cabecalho.descricao,
                    data_contagem: dataAtual,
                    aberto: 1,
                    finalizada: 0,
                    data_finalizada: null,
                    ip_aberto: ip
                })
            })
                .then(response => response.json())
                .then(json => { setCabecalho(json); setNovo(true); });
        }
    }

    const [item, setItem] = useState(0);
    // Função que salva um produto caso a busca no banco encontre um produto
    async function salvarDetalhe() {
        await buscarProduto();
        if (produtoEncontrado) {
            fetch("http://10.0.1.107:8091/coletor/detalheSalvar", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    id_contagem: cabecalho.id,
                    gtin: detalhe.gtin,
                    descricao_produto: detalhe.descricao_produto,
                    quantidade: detalhe.quantidade,
                    item: item + 1
                })
            }).then(response => {
                if (response.status === 201 || response.status === 200) {
                    setAdicionado(true);
                    setLista([...lista, {
                        id_contagem: cabecalho.id,
                        gtin: detalhe.gtin,
                        descricao_produto: detalhe.descricao_produto,
                        quantidade: detalhe.quantidade,
                        item: item + 1
                    }]);
                    document.getElementById("codigo").focus();
                    document.getElementById("codigo").select();
                    setItem(item + 1);
                } else {
                    console.log("não foi possivel salvar no banco")
                }
            })
        }
        scanner();
    }

    async function buscarProduto() {
        if (!auto) {
            localStorage.setItem("codigo", detalhe.gtin);
        }
        const codigo = localStorage.getItem("codigo");
        try {
            const response = await fetch(`http://10.0.1.107:8091/coletor/buscarProduto/${codigo}`);
            const data = await response.json();

            if (response.status === 200 || response.status === 201) {
                //setDetalhe({...detalhe, descricao_produto: data.descricaopdv, gtin: data.gtin});
                setDetalhe((prevDetalhe) => {
                    return { ...prevDetalhe, descricao_produto: data.descricaopdv, gtin: data.gtin };
                });
                localStorage.setItem("produtoEncontrado", true);
            } else {
                localStorage.setItem("produtoEncontrado", false);
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            localStorage.setItem("produtoEncontrado", false);
            alert("caiu aqui")
        }
    }
    const [estadoAuto, setEstadoAuto] = useState(false);

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
            if (auto) {
                await buscarProduto();
                setEstadoAuto(!estadoAuto)
            }
        }

        function error(err) {
            //console.warn(err);
        }
    }
    useEffect(() => {
        salvarDetalhe();
    }, [estadoAuto])

    //Função para cancelar o item na lista e no banco
    async function cancelarItem(item, index) {
        var novaLista = lista.filter((item, i) => i !== index);

        //Função para procurar o item na tabela do banco e excluir, caso excluido no banco, ele remove da lista tambem
        fetch(`http://10.0.1.107:8091/coletor/deletarItem/${item.item}/${item.id_contagem}`, {
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
        fetch(`http://10.0.1.107:8091/coletor/editarItem/${parseInt(detalheEditando.item)}/${parseInt(detalheEditando.id_contagem)}/${parseFloat(detalheEditando.quantidade)}`, {
            method: "PUT"
        }).then((resp) => {
            if (resp.status === 200 || resp.status === 201) {
                const itemEncontrado = lista.find((item) => item.item === detalheEditando.item);
                if (itemEncontrado) {
                    itemEncontrado.quantidade = detalheEditando.quantidade;
                }
                setEditar(false);
            }
        })
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

    function voltar() {
        setListagem(true);
        setItem(0);
        setDetalhe({});
        setCabecalho({});
        setNovo(false);
        setLista([]);
        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/0/null/0/null`, {
            method: "PUT"
        })
    }

    function finalizar() {
        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/0/null/1/${dataAtual}`, {
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
        fetch(`http://10.0.1.107:8091/coletor/cabecalho/${cabecalho.id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.aberto == 0) {
                    fetchDetalhes(cabecalho).then(() => {
                        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/1/${ip}/0/null`, { // id/aberto/finalizada/data_finalizada
                            method: "PUT"
                        }).then((resp) => {
                            if (resp.status === 201 || resp.status === 200) {
                                setCabecalho({
                                    id: cabecalho.id,
                                    descricao: cabecalho.descricao,
                                    data_contagem: cabecalho.data_contagem,
                                    aberto: cabecalho.aberto,
                                    ip_aberto: ip
                                });
                                setListagem(false);
                                setNovo(true);
                            }
                        })
                    })
                } else {
                    if (data.ip_aberto == ip) {
                        fetchDetalhes(cabecalho).then(() => {
                            fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/1/${ip}/0/null`, { // id/aberto/finalizada/data_finalizada
                                method: "PUT"
                            }).then((resp) => {
                                if (resp.status === 201 || resp.status === 200) {
                                    setCabecalho({
                                        id: cabecalho.id,
                                        descricao: cabecalho.descricao,
                                        data_contagem: cabecalho.data_contagem,
                                        aberto: cabecalho.aberto,
                                        ip_aberto: ip
                                    });
                                    setListagem(false);
                                    setNovo(true);
                                }
                            })
                        })
                    } else {
                        alert("Contagem aberta no ip: " + data.ip_aberto);
                    }
                }
            });
    }

    async function fetchDetalhes() {
        fetch(`http://10.0.1.107:8091/coletor/detalhe/${cabecalho.id}`)
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

    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Coletor</h3>
                </C.Header>
                {listagem ? (
                    <ListaContagem setCabecalho={setCabecalho} abrir={abrir} />
                ) : (
                    <CO.Content>
                        <div className="cabecalho">
                            <label style={{ fontWeight: "bold" }}>Código:</label>
                            <label style={{ marginLeft: "5px", fontWeight: "bold" }}>{cabecalho.id ? cabecalho.id : ""}</label>
                            <label style={{ margin: "0px 10px", fontWeight: "bold" }}>Descrição:</label>
                            {novo ? (
                                <input value={cabecalho.descricao ? cabecalho.descricao : ""} style={{ backgroundColor: "#f0f0f0" }} readOnly />
                            ) : (
                                <input value={cabecalho.descricao ? cabecalho.descricao : ""} onChange={(e) => setCabecalho({ ...cabecalho, descricao: e.target.value })} />
                            )}
                            <label style={{ fontWeight: "bold" }}>Data:</label>
                            <label style={{ margin: "0px 10px" }}>{cabecalho.data_contagem ? dataMask(cabecalho.data_contagem) : ""} </label>
                            {!novo && <button onClick={salvarCabecalho}><img alt="" src="/images/add.png" />Criar</button>}
                        </div>
                        {novo ? (
                            <>
                                <div id="reader" />
                                {adicionado && produtoEncontrado === true ? (
                                    <div className="produto-add">
                                        <label>{detalhe.descricao_produto} * {detalhe.quantidade}</label>
                                    </div>
                                ) : null}
                                {produtoEncontrado === false ? (
                                    <div className="produto-add" style={{ color: "red" }}>
                                        <label>PRODUTO NÃO ENCONTRADO</label>
                                    </div>
                                ) : null}
                                <div className="campos-add">
                                    <div style={{ display: "flex", alignItems: "start", margin: "20px" }}>
                                        <label>Contagem</label>
                                        <img alt="" src="/images/botao.png" onClick={() => { setAuto(!auto); setDetalhe({ ...detalhe, quantidade: 1 }) }} className={auto ? "auto" : ""} style={{ margin: "auto 5px 0px 5px" }} />
                                        <label>Auto</label>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <label>Código: </label>
                                        <input id="codigo" value={detalhe.gtin} onChange={(e) => setDetalhe({ ...detalhe, gtin: e.target.value })} onFocus={() => setAdicionado(false)} onKeyDown={enterCodigo} />
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
                                                        <td>{item.quantidade}</td>
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
                )}
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