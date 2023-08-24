import React, { useEffect, useState } from "react";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./coletor";
import Quagga from 'quagga';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/authContext";
import { ExitStatus } from "typescript";


export const Coletor = ({ close }) => {
    const {dataMask} = useContext(AuthContext);
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);
    const [novo, setNovo] = useState(false);
    const [adicionado, setAdicionado] = useState(false);
    const [produtoEncontrado, setProdutoEncontrado] = useState(false);
    const [lista, setLista] = useState([]);
    const [cabecalho, setCabecalho] = useState({
        id: "",
        descricao: "",
        data_contagem: dataAtual
    });
    const [detalhe, setDetalhe] = useState({
        id: "",
        id_contagem: cabecalho.id,
        gtin: "",
        descricao_produto: "",
        quantidade: ""
    })


    function salvarCabecalho(){
        if(cabecalho.descricao){
            fetch("http://10.0.1.107:8091/coletor/cabecalhoSalvar",{
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    id: 0,
                    descricao: cabecalho.descricao,
                    data_contagem: cabecalho.data_contagem
                })
            })
            .then(response => response.json()) 
            .then(json => {setCabecalho(json); setNovo(true);});
        }
    }

    async function salvarDetalhe(){
        buscarProduto().then(()=>{
            if(produtoEncontrado){
                fetch("http://10.0.1.107:8091/coletor/detalheSalvar",{
                    method: "POST",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({
                        id: 0,
                        id_contagem: cabecalho.id,
                        gtin: detalhe.gtin,
                        descricao_produto: detalhe.descricao_produto,
                        quantidade: detalhe.quantidade
                    })
                })
                .then(response => {
                    if(response.status === 201 || response.status === 200){
                        setLista([...lista, detalhe]);
                        setAdicionado(true);
                    }else{
                        console.log("não foi possivel salvar no banco")
                    }
                })
            }
        })
        scanner();
    }

    async function buscarProduto (){
        const response = await fetch(`http://10.0.1.107:8091/coletor/buscarProduto/${detalhe.gtin}`)
        const data = await response.json();
        if(response.status === 200 || response.status === 201){
            setDetalhe({...detalhe, descricao_produto: data.descricaopdv});
            setProdutoEncontrado(true);
        }else{
            alert("Produto não encontrado")
        }
    }

    /*useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.getElementById('reader'),
                constraints: {
                    width: 200,
                    height: 350
                },
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            //alert("Initialization finished. Ready to start");
            Quagga.start();
        },
        Quagga.onDetected((data) => {
            var code = data.codeResult.code;
            document.getElementById('input').value = code;
            Quagga.stop();
        })
        );
    }, [])*/

    function scanner(){
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
            setDetalhe({...detalhe, gtin: result, quantidade: ""});
            scanner.clear();
            //document.getElementById("quantidade").focus();
            //document.getElementById("quantidade").select();
        }

        function error(err) {
            console.warn(err);
        }
    }

    /*useEffect(() => {
        if(novo === true){
            scanner();
        }
    }, [novo === true])*/
    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Coletor</h3>
                    <div className="buttons">
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <CO.Content>
                    <div className="cabecalho">
                        <label style={{fontWeight: "bold"}}>Código:</label>
                        <label style={{marginLeft: "5px", fontWeight: "bold"}}>{cabecalho.id ? cabecalho.id : ""}</label>
                        <label style={{margin: "0px 10px",fontWeight: "bold"}}>Descrição:</label>
                        <input value={cabecalho.descricao ? cabecalho.descricao : ""} onChange={(e)=> setCabecalho({...cabecalho, descricao: e.target.value})}/>
                        <label style={{fontWeight: "bold"}}>Data:</label>
                        <label style={{margin: "0px 10px"}}>{cabecalho.data_contagem ? dataMask(cabecalho.data_contagem) : ""} </label>
                        { !novo && <button onClick={salvarCabecalho}>Criar</button>}
                    </div>
                    {novo ? (
                        <>
                            <div id="reader"/>        
                            {adicionado && (
                                <div className="produto-add">
                                    <label>{detalhe.descricao_produto} * {detalhe.quantidade}</label>
                                </div>
                            )}
                            <div className="campos-add">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <label>Código: </label>
                                    <input value={detalhe.gtin} onChange={(e)=> setDetalhe({...detalhe, gtin: e.target.value})} onFocus={()=> {setAdicionado(false)}}/>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <label>Quantidade: </label>
                                    <input type="number" id="quantidade" value={detalhe.quantidade} onChange={(e)=> setDetalhe({...detalhe, quantidade: e.target.value})} onFocus={buscarProduto} style={{ width: "60px" }} />
                                    <img alt="" src="/images/add.png" onClick={salvarDetalhe}/>
                                </div>
                            </div>
                            <div className="campo-lista">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descrição</th>
                                            <th style={{ width: "100px" }}>Quantidade</th>
                                            <th style={{ width: "80px" }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lista.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{item.gtin}</td>
                                                    <td>{item.descricao_produto}</td>
                                                    <td>{item.quantidade}</td>
                                                    <td><img alt="" src="/images/lixeira.png" /> <img alt="" src="/images/editar.png" /></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>                       
                        </>
                    ): null}
                </CO.Content>
            </C.Container>
        </M.Modal>
    )
}