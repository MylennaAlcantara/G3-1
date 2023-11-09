import React, { useEffect, useState } from "react";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./coletor";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/authContext";
import { ListaContagem } from "./listaContagem";
import { BuscaPreco } from "./buscaPreco";


export const Coletor = ({ close }) => {
    const { dataMask, user } = useContext(AuthContext);
    const [ip, setIp] = useState();
    const [listagem, setListagem] = useState(true);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const [novo, setNovo] = useState(false);
    const [adicionado, setAdicionado] = useState(false);
    const [produtoEncontrado,setProdutoEncontrado] = useState(null);
    const [mensagem, setMensagem] = useState("Abra a câmera para ler o codigo!");
    const [editar, setEditar] = useState(false);
    const [auto, setAuto] = useState(false);
    const [excluido, setExcluido] = useState(false);

    const [aba, setAba] = useState("balanco");
    const [lista, setLista] = useState([]);
    const [cabecalho, setCabecalho] = useState({
        id: "",
        descricao: "",
        data_contagem: "",
        id_usuario_insercao: "",
        id_usuario_edicao: "",
        excluido: 0
    });
    const [detalhe, setDetalhe] = useState({
        id: "",
        id_produto: "",
        id_contagem: cabecalho.id,
        gtin: "",
        descricao_produto: "",
        quantidade: "",
        item: "",
        qtd_estoque: ""
    });
    const [detalheEditando, setDetalheEditando] = useState({
        id: "",
        id_contagem: cabecalho.id,
        gtin: "",
        descricao_produto: "",
        quantidade: "",
        item: "",
        qtd_estoque: ""
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
                    ip_aberto: ip,
                    id_usuario_insercao: parseInt(localStorage.getItem("id")),
                    id_usuario_edicao: null,
                    excluido: 0,
                    importado_balanco: false,
                    importado_preVenda: false,
                    id_preVenda: null
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
                    id_produto: detalhe.id_produto,
                    gtin: detalhe.gtin,
                    descricao_produto: detalhe.descricao_produto,
                    referencia: "",
                    quantidade: parseFloat(detalhe.quantidade).toFixed(4).replace(",", "."),
                    item: item + 1,
                    qtd_estoque: parseFloat(detalhe.qtd_estoque).toFixed(4).replace(",", ".")
                })
            }).then(response => {
                if (response.status === 201 || response.status === 200) {
                    setAdicionado(true);
                    setLista([...lista, {
                        id_contagem: cabecalho.id,
                        id_produto: detalhe.id_produto,
                        gtin: detalhe.gtin,
                        descricao_produto: detalhe.descricao_produto,
                        quantidade: detalhe.quantidade,
                        item: item + 1,
                        qtd_estoque: detalhe.qtd_estoque
                    }]);
                    document.getElementById("codigo").focus();
                    document.getElementById("codigo").select();
                    setItem(item + 1);
                    const itensIguais = lista.filter((item)=> item.gtin == detalhe.gtin);
                    const ultimoItem = lista[lista.length-1];
                    if(itensIguais.length < 50 && ultimoItem.gtin !=detalhe.gtin){
                        agrupar();
                    }else if(itensIguais.length >= 50 ){
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
        if (!auto) {
            localStorage.setItem("codigo", detalhe.gtin);
        }
        const codigo = localStorage.getItem("codigo");
        const tipoSistema = localStorage.getItem("tipoSistema");
        try {
            const response = await fetch(`http://10.0.1.107:8091/coletor/buscarProduto/${tipoSistema}/${codigo || detalhe.gtin}`);
            const data = await response.json();

            if (response.status === 200 || response.status === 201) {
                setDetalhe((prevDetalhe) => {
                    return { ...prevDetalhe, id_produto: data.codigo, descricao_produto: data.descricaopdv, gtin: data.gtin, qtd_estoque: data.qtd_estoque };
                });
                //localStorage.setItem("produtoEncontrado", true);
                setProdutoEncontrado(true);
            } else {
                //localStorage.setItem("produtoEncontrado", false);
                setDetalhe((prevDetalhe) => {
                    return { ...prevDetalhe, id_produto: "", descricao_produto: "", gtin: codigo, qtd_estoque: "" };
                });
                setMensagem("PRODUTO NÃO ENCONTRADO!");
                setProdutoEncontrado(false);
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            //localStorage.setItem("produtoEncontrado", false);
            setDetalhe((prevDetalhe) => {
                return { ...prevDetalhe, descricao_produto: "", gtin: codigo, qtd_estoque: "" };
            });
            setMensagem("PRODUTO NÃO ENCONTRADO!");
            setProdutoEncontrado(false);
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
            window.navigator.vibrate(200)
            if (auto) {
                await buscarProduto();
                setEstadoAuto(!estadoAuto)
            }else{
                setDetalhe({...detalhe, gtin: result});
            }
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
                    itemEncontrado.quantidade = parseFloat(detalheEditando.quantidade).toFixed(4).replace(",", ".");
                }
                setEditar(false);
            }
        })
    }
    
    async function agrupar (){
        await fetch(`http://10.0.1.107:8091/coletor/detalhe/ajustaContagem/${cabecalho.id}`);
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
        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/0/null/0/null/${usuario}/${excluido ? 1 : 0}`, {
            method: "PUT"
        })
    }

    async function excluir(){
        const usuario = localStorage.getItem("id");
        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/0/null/0/null/${usuario}/${excluido ? 1 : 0}`, {
            method: "PUT"
        })
    }
    useEffect(()=>{
        excluir();
    },[excluido])

    function finalizar() {
        const usuario = localStorage.getItem("id");
        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/0/null/1/${dataAtual}/${usuario}/${excluido ? 1 : 0}`, {
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
                        fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/1/${ip}/0/null/${cabecalho.id_usuario_insercao}/0`, { // id/aberto/finalizada/data_finalizada
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
                            fetch(`http://10.0.1.107:8091/coletor/alterarStatus/${cabecalho.id}/1/${ip}/0/null/${cabecalho.id_usuario_insercao}/0`, { // id/aberto/finalizada/data_finalizada
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
            await agrupar();
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
                    <div className="buttons">
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <CO.NaviBar>
                    <button onClick={()=> setAba("balanco")} style={{backgroundColor: aba === "balanco" ? "white" : ""}}>Balanço</button>
                    <button onClick={()=> setAba("preco")} style={{backgroundColor: aba === "preco" ? "white" : ""}}>Busca preço</button>
                </CO.NaviBar>
                {aba === "balanco" ? (
                    listagem ? (
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
                                <label style={{ fontWeight: "bold" }}>Data: <label style={{fontWeight: "normal"}}>{cabecalho.data_contagem ? dataMask(cabecalho.data_contagem) : ""}</label></label>
                                {!novo && <button onClick={salvarCabecalho}><img alt="" src="/images/add.png" />Criar</button>}
                                <label style={{fontWeight: "bold", marginLeft: 10}}>Usuario: <label style={{fontWeight: "normal"}}>{user.map(user => user.id + " - " + user.nome )}</label></label>
                                {novo && <input type="checkbox" onChange={(e)=> setExcluido(e.target.checked)} checked={excluido}/> }
                                {novo && <label>Excluir</label>}
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
                                    ):null}
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
                    )
                ):(
                    <BuscaPreco/>
                )}

                <C.Footer>
                    {listagem && aba === "balanco" ? (
                        <div className="buttons">
                            <button onClick={novaContagem}><img alt="" src="/images/add.png" />Novo</button>
                            <button onClick={abrir}><img alt="" src="/images/abrir.png" />Abrir</button>
                            <button onClick={close}><img alt="" src="/images/voltar.png" />Voltar</button>
                        </div>
                    ) : aba === "balanco" ? (
                        <div className="buttons">
                            <button onClick={finalizar}><img alt="" src="/images/check.png" />Finalizar</button>
                            <button onClick={voltar}><img alt="" src="/images/voltar.png" />Voltar</button>
                        </div>
                    ) : null}
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}