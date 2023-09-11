import React, { useState } from "react";
import * as B from "./buscaPreco";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export const BuscaPreco = () => {
    const [produtoEncontrado, setProdutoEncontrado] = useState(false);
    const [mensagem, setMensagem] = useState("Abra a câmera para ler o codigo!");
    const [scanneado, setScanneado] = useState(false);
    const [detalhe, setDetalhe] = useState({
        codigo: "",
        gtin: "",
        descricao_produto: "",
        preco: "",
        preco_atacado: "",
        qtd_atacado: "",
        quantidade: ""
    });

    async function buscarProduto() {
        if (!scanneado) {
            localStorage.setItem("codigo", detalhe.gtin);
        }
        const tipoSistema = localStorage.getItem("tipoSistema");
        const codigo = localStorage.getItem("codigo");
        try {
            const response = await fetch(`http://10.0.1.107:8091/coletor/buscarProduto/${tipoSistema}/${codigo}`);
            const data = await response.json();

            if (response.status === 200 || response.status === 201) {
                setDetalhe((prevDetalhe) => {
                    return { ...prevDetalhe,codigo: data.codigo, descricao_produto: data.descricaopdv, gtin: data.gtin, qtd_estoque: data.qtd_estoque, preco: data.preco, preco_atacado: data.preco_atacado, qtd_atacado: data.qtd_atacado };
                });
                setProdutoEncontrado(true);
            } else {
                setDetalhe((prevDetalhe) => {
                    return { ...prevDetalhe, descricao_produto: "", gtin: codigo, qtd_estoque: "" };
                });
                setMensagem("PRODUTO NÃO ENCONTRADO!");
                setProdutoEncontrado(false);
            }
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
            setDetalhe((prevDetalhe) => {
                return { ...prevDetalhe, descricao_produto: "", gtin: codigo, qtd_estoque: "" };
            });
            setMensagem("PRODUTO NÃO ENCONTRADO!");
            setProdutoEncontrado(false);
        }
        setScanneado(false)
    }

    function scanner() {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
            setScanneado(true)
            scanner.clear();
            window.navigator.vibrate(200)
            localStorage.setItem("codigo", result);
        }

        function error(err) {
            //console.warn(err);
        }
    }

    useEffect(()=>{
        buscarProduto();
    },[scanneado])

    async function enterPesquisar(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            await buscarProduto();
        }
    }

    return(
        <B.Container>
            <div id="reader"/>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <input value={detalhe.gtin} onChange={(e)=> setDetalhe({...detalhe, gtin: e.target.value})} onKeyDown={enterPesquisar}/>
                <img src={"/images/camera.png"} onClick={scanner}/>
            </div>
            {produtoEncontrado ? (
                <div style={{backgroundColor: "#00a5dd", margin: "auto"}}>
                <h1>{detalhe.descricao_produto}</h1>
                <h3>{detalhe.gtin}</h3>
                <h1>PREÇO: {parseFloat(detalhe.preco).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}</h1>
                {detalhe.preco_atacado ? (
                    <div >
                        <h4>PREÇO ATACADO: {parseFloat(detalhe.preco_atacado).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}</h4>
                        <h4>QTD. ATACADO: {parseFloat(detalhe.qtd_atacado).toFixed(4).replace(".",",")}</h4>
                    </div>
                ):null}
                </div>
            ): (
                <h3 style={{color: "red"}}>{mensagem}</h3>
            )}
        </B.Container>
    )
}