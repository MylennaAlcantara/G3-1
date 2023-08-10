import React, { useEffect, useState } from "react";
import * as CX from "./caixa";
import { ConsultaProduto } from "./consultaProdutos";
import { EfetuarPagamento } from "./efetuarPagamento";
import { DescontoAcrescimo } from "./desconto";

export const Caixa = () => {
    const [mensagemAreaInserir, setMensagemAreaInserir] = useState("PASSE UM PRODUTO!")
    const [mensagemCampoAtalho, setMensagemCampoAtalho] = useState("CAIXA LIVRE");
    
    // Estados dos atalhos
    const [atalhoVisivel, setAtalhoVisivel] = useState(false);
    const [atalho, setAtalho] = useState();

    const [produtoBipado, setProdutoBipado] = useState({});
    const [listaProdutos, setListaProdutos] = useState([
    ]);

    //campos de codigo e quantidade para inserir produto
    const [codigoBarra, setCodigoBarra] = useState("");
    const [quantidade, setQuantidade] = useState("1,0000");
    const [totalItem, setTotalItem] = useState("0,00");
    const [totalVenda, setTotalVenda] = useState("0,00");
    const [listaCancelados, setListaCancelados] = useState([]);

    //Cabeçalho da venda
    const [cabecalho, setCabecalho] = useState(
    {
        ID: "",
        ID_ECF_DAV: 0,
        id_pre_venda: 0,
        ID_CLIENTE: 0,
        ID_ECF_FUNCIONARIO: 0,
        CPF_CNPJ_ENTREGADOR: 0,
        ID_ECF_MOVIMENTO: 2000,
        id_ecf_empresa: 1,
        CFOP: 5102,
        COO: 0,
        CCF: 0,
        DATA_VENDA: "", // somente data
        HORA_VENDA: "", // somente hora:min:sec
        VALOR_VENDA: "",
        TAXA_DESCONTO: 0.00,
        TAXA_DESCONTO_ITENS: 0.00,
        DESCONTO: 0.00,
        DESCONTO_CABECALHO: 0.00,
        TAXA_ACRESCIMO: 0.00,
        ACRESCIMO: 0.00,
        VALOR_FINAL: "",
        VALOR_RECEBIDO: "",
        TROCO: "",
        VALOR_CANCELADO: null,
        SINCRONIZADO: "S",
        TOTAL_PRODUTOS: "",
        TOTAL_DOCUMENTO: "",
        BASE_ICMS: "", // soma de todos os itens
        ICMS: "", // soma de todos os itens
        ICMS_OUTRAS: "", // somas de todos os itens
        ISSQN: null,
        PIS: "",  // somas de todos os itens
        COFINS: "", // somas de todos os itens
        ACRESCIMO_ITENS: null,
        DESCONTO_ITENS: 0.00,
        TAXA_DESCONTO_TOTAL: null,
        STATUS_VENDA: "F",
        NOME_CLIENTE: null,
        CPF_CNPJ_CLIENTE: null,
        CUPOM_CANCELADO: "N",
        HASH_TRIPA: null,
        CAIXA: null,
        HASH_INCREMENTO: null,
        SERIE_ECF: null,
        ID_ECF_CAIXA: 1,
        ID_PEDIDO_GC: null,
        VERSAO_NFCE: 4.00,
        NUMERO_LOTE: "",
        CHAVE_NFCE: "",
        NUMERO_NFCE: "",
        SERIE_NFCE: "",
        DATA_HORA_CANCELAMENTO: null,
        STATUS_NFCE: "",
        PROTOCOLO_DE_AUTORIZACAO: "",
        PROTOCOLO_DE_CANCELAMENTO: null,
        TIPO_AMBIENTE: null,
        ID_TIPO_PAGAMENTO_ESCOLHIDO: null,
        NFE_DEVOLUCAO: null,
        id_pedido_ifood: null
    });

    // Função para reconhecer caso tenha colocado um numero + * para inserir na quantidade o valor
    const handleInputChange = (e) => {
        const value = e.target.value;
        setCodigoBarra(value);
    
        // Verifica se o valor digitado contém um número seguido de '*'
        const regex = /(\d+)\*/;
        const match = value.match(regex);
    
        if (match) {
          const quantidade = match[1];
          setQuantidade(quantidade+",0000");
          document.getElementById("codigo").select();
        }
    };

    function atalhos(e){
        document.getElementById('codigo').focus();
        if(e.keyCode === 112){
            e.preventDefault();
            setAtalhoVisivel(!atalhoVisivel);
        }else if(e.keyCode === 113){
            e.preventDefault();
            setAtalho(2);
            // F2 atalho
        }else if(e.keyCode === 114){
            e.preventDefault();
            setAtalho(3);
            // F3 Atalho
        }else if(e.keyCode === 115){
            e.preventDefault();
            setAtalho(4);
            // F4 atalho
        }else if(e.keyCode === 116){
            e.preventDefault();
            setAtalho(5);
            // F5 atalho
        }else if(e.keyCode === 117){
            e.preventDefault();
            setAtalho(6);
            // F6 atalho
        }else if(e.keyCode === 118){
            e.preventDefault();
            setAtalho(7);
            // F7 atalho
        }else if(e.keyCode === 119){
            e.preventDefault();
            setAtalho(8);
            const Item = listaProdutos.filter((item)=> item.ITEM == listaProdutos.length);
            if(Item[0].CANCELADO === "N"){
                listaProdutos.pop();
                listaProdutos.push({
                    ID: Item[0].ID,
                    ID_ECF_PRODUTO: Item[0].ID_ECF_PRODUTO,
                    ID_ECF_VENDA_CABECALHO: Item[0].ID_ECF_VENDA_CABECALHO,
                    CFOP: Item[0].CFOP,
                    ITEM: Item[0].ITEM,
                    QUANTIDADE: quantidade,
                    VALOR_UNITARIO: Item[0].VALOR_UNITARIO,
                    VALOR_CUSTO_UNITARIO: Item[0].VALOR_CUSTO_UNITARIO,
                    SUB_TOTAL: Item[0].SUB_TOTAL,
                    TOTAL_FINAL: Item[0].TOTAL_FINAL,
                    BASE_ICMS: Item[0].BASE_ICMS,
                    TAXA_ICMS: Item[0].TAXA_ICMS,
                    ICMS: Item[0].ICMS,
                    TAXA_DESCONTO: Item[0].TAXA_DESCONTO,
                    DESCONTO: Item[0].DESCONTO,
                    TAXA_ISSQN: Item[0].TAXA_ISSQN,
                    ISSQN: Item[0].ISSQN, 
                    TAXA_PIS: Item[0].TAXA_PIS,
                    PIS: Item[0].PIS, 
                    TAXA_COFINS: Item[0].TAXA_COFINS,
                    COFINS: Item[0].COFINS,
                    TAXA_ACRESCIMO: Item[0].TAXA_ACRESCIMO,
                    ACRESCIMO: Item[0].ACRESCIMO,
                    ACRESCIMO_RATEIO: Item[0].ACRESCIMO_RATEIO,
                    DESCONTO_RATEIO: Item[0].DESCONTO_RATEIO,
                    TOTALIZADOR_PARCIAL: Item[0].TOTALIZADOR_PARCIAL,
                    CST: Item[0].CST,
                    CANCELADO: 'S',
                    MOVIMENTA_ESTOQUE: Item[0].MOVIMENTA_ESTOQUE,
                    HASH_TRIPA: Item[0].HASH_TRIPA,
                    SERIE_ECF: Item[0].SERIE_ECF,
                    COO: Item[0].COO,
                    CCF: Item[0].CCF,
                    GTIN: Item[0].GTIN,
                    ID_ECF_CAIXA: Item[0].ID_ECF_CAIXA, 
                    COMISSAO: Item[0].COMISSAO,
                    CST_PIS: Item[0].CST_PIS,
                    CST_COFINS: Item[0].CST_COFINS,
                    CST_IPI: Item[0].CST_IPI,
                    CST_ICMS: Item[0].CST_ICMS,
                    ORIGEM: Item[0].ORIGEM,
                    DESCRICAO_PRODUTO: Item[0].DESCRICAO_PRODUTO,
                    UNIDADE_PRODUTO: Item[0].UNIDADE_PRODUTO,
                    NCM: Item[0].NCM,
                    CEST: Item[0].CEST,
                    PROMOCAO: Item[0].PROMOCAO,
                    QTD_DEVOLVIDA: Item[0].QTD_DEVOLVIDA,
                    ID_CUPOM_CREDITO: Item[0].ID_CUPOM_CREDITO,
                    BC_PIS_COFINS: Item[0].BC_PIS_COFINS,
                    ID_PROMOCAO_DETALHE: Item[0].ID_PROMOCAO_DETALHE,
                    TIPO_PROMOCAO: Item[0].TIPO_PROMOCAO,
                    CODIGO_INTEGRACAO_PROMOCAO: Item[0].CODIGO_INTEGRACAO_PROMOCAO,
                    VALIDOU_PROMOCAO: Item[0].VALIDOU_PROMOCAO
                });
                listaCancelados.push(Item[0].ITEM);
                setTotalVenda("R$" + (parseFloat(totalVenda.replace("R$","").replace(",",'.')).toFixed(2) - parseFloat(Item[0].TOTAL_FINAL).toFixed(2)));
            }else{
                alert("Item já foi cancelado")
            }
            // F8 atalho
        }else if(e.keyCode === 120){
            e.preventDefault();
            setAtalho(9);
            // F9 atalho
        }else if(e.keyCode === 121){
            e.preventDefault();
            setAtalho(10);
            cancelarVenda();
            // F10 atalho
        }else if(e.keyCode === 122){
            e.preventDefault();
            setAtalho(11);
            // F11 atalho
        }else if(e.keyCode === 123){
            e.preventDefault();
            setAtalho(12);
            // F12 atalho
        }else if(e.keyCode === 36){
            e.preventDefault();
            setAtalho("home");
            // Tecla Home
        }
    }

    useEffect(()=>{
        document.getElementById('codigo').focus(); 
        setListaProdutos(listaProdutos)
    },[0]);

    useEffect(()=>{
        var objDiv = document.getElementById("lista");
        objDiv.scrollTop = document.getElementById("lista").scrollHeight;
    }, [listaProdutos]);

    function somarTotal() {
        let total = 0;
    
        for (let i = 0; i < listaProdutos.length; i++) {
            const valorTotalProduto = parseFloat(listaProdutos[i].TOTAL_FINAL);
            if (!isNaN(valorTotalProduto) && listaProdutos[i].CANCELADO === "N") {
                total += valorTotalProduto;
            }
        }        
    
        setTotalVenda("R$"+total.toFixed(2).replace(".",","));
    }

    useEffect(()=>{
        somarTotal();
    },[listaProdutos]);

    document.onkeydown = atalhos;

    async function buscarProduto(e){
        if(e.keyCode === 13 && codigoBarra != ""){
            e.preventDefault();
            const res = await fetch(`http://localhost:8090/produto/${codigoBarra}`);
            const data = await res.json();
            setProdutoBipado(data);
            setListaProdutos([...listaProdutos, {
                ID: "",
                ID_ECF_PRODUTO: data.id,
                ID_ECF_VENDA_CABECALHO: "",
                CFOP: data.cfop,
                ITEM: listaProdutos.length+1,
                QUANTIDADE: quantidade,
                VALOR_UNITARIO: data.valor_VENDA,
                VALOR_CUSTO_UNITARIO: data.valor_CUSTO,
                SUB_TOTAL: data.valor_VENDA,
                TOTAL_FINAL: (parseFloat(quantidade).toFixed(4)*parseFloat(data.valor_VENDA).toFixed(2)).toFixed(2),
                BASE_ICMS: (parseFloat(quantidade).toFixed(4)*parseFloat(data.valor_VENDA).toFixed(2)).toFixed(2),
                TAXA_ICMS: data.icms_ALIQUOTA,
                ICMS: data.cst_ICMS,
                TAXA_DESCONTO: 0.00,
                DESCONTO: 0.00,
                TAXA_ISSQN: "",
                ISSQN: "", 
                TAXA_PIS: data.pis_ALIQUOTA,
                PIS: data.cst_PIS, 
                TAXA_COFINS: data.cofins_ALIQUOTA,
                COFINS: data.cst_COFINS,
                TAXA_ACRESCIMO: 0.00,
                ACRESCIMO: 0.00,
                ACRESCIMO_RATEIO: 0.00,
                DESCONTO_RATEIO: 0.00,
                TOTALIZADOR_PARCIAL: data.totalizador_PARCIAL,
                CST: "",
                CANCELADO: "N",
                MOVIMENTA_ESTOQUE: true,
                HASH_TRIPA: data.hash,
                SERIE_ECF: 1,
                COO: "",
                CCF: "",
                GTIN: data.gtin,
                ID_ECF_CAIXA: 1, 
                COMISSAO: data.comissao_PERCENTUAL,
                CST_PIS: data.cst_PIS,
                CST_COFINS: data.cst_COFINS,
                CST_IPI: data.cst_IPI,
                CST_ICMS: data.cst_ICMS,
                ORIGEM: data.origem,
                DESCRICAO_PRODUTO: data.descricao,
                UNIDADE_PRODUTO: data.unidade,
                NCM: data.ncm,
                CEST: data.cest,
                PROMOCAO: data.promocao,
                QTD_DEVOLVIDA: "",
                ID_CUPOM_CREDITO: "",
                BC_PIS_COFINS: "",
                ID_PROMOCAO_DETALHE: "",
                TIPO_PROMOCAO: "",
                CODIGO_INTEGRACAO_PROMOCAO: "",
                VALIDOU_PROMOCAO: ""
            }]);
            document.getElementById("codigo").select();
            setTotalItem((parseFloat(quantidade).toFixed(4)*parseFloat(data.valor_VENDA).toFixed(2)).toFixed(2));
            limparCampos(data);
        }
    }
    
    function limparCampos(data){
        setCodigoBarra("");
        setQuantidade("1,0000");
        setMensagemAreaInserir(quantidade+" * "+data.descricao);
    }

    function cancelarVenda(){
        setCodigoBarra("");
        setQuantidade("1,0000");
        setMensagemAreaInserir("PASSE UM PRODUTO");
        setListaCancelados([]);
        setListaProdutos([]);
        setTotalVenda("R$ 0,00");
        setTotalItem("0,00");
        setProdutoBipado({});
    }

    return (
        <CX.Container>
            <CX.AreaInserir>
                <div className="espaco1">
                    <div className="campo">
                        <label>CÓDIGO:</label>
                        <input id="codigo" value={codigoBarra} onChange={handleInputChange} onKeyDown={buscarProduto}/>
                    </div>
                    <div className="campo">
                        <label>QUANTIDADE:</label>
                        <input value={quantidade} readOnly style={{cursor: "default", outline:"0"}}/>
                    </div>
                    <div className="campo">
                        <label>VALOR UNITÁRIO:</label>
                        <input value={String(produtoBipado.valor_VENDA).replace(".",",").replace("undefined", "0,00").replace("NaN", "0,00")} readOnly style={{cursor: "default", outline:"0"}}/>
                    </div>
                    <div className="campo">
                        <label>TOTAL DO ITEM:</label>
                        <input value={String(totalItem).replace(".",",").replace("NaN", "0,00").replace("undefined", "0,00")} readOnly style={{cursor: "default", outline:"0"}}/>
                    </div>
                </div>
                <div className="espaco2">
                    <label>{mensagemAreaInserir}</label>
                </div>
            </CX.AreaInserir>
            <CX.ListaItens id="lista">
                <table>
                    <thead>
                        <tr>
                            <th>ITEM</th>
                            <th>CÓDIGO</th>
                            <th>DESCRIÇÃO</th>
                            <th>VALOR UNITÁRIO</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos.map((produto, index)=>{
                            return(
                                <tr key={index}
                                    style={{backgroundColor: produto.CANCELADO === "S" ? "grey" : "white"}}>
                                    <td>{produto.ITEM}</td>
                                    <td style={{textDecoration: produto.CANCELADO === "S" ? "line-through" : ""}}>{produto.GTIN}</td>
                                    <td style={{textDecoration: produto.CANCELADO === "S" ? "line-through" : ""}}>{produto.DESCRICAO_PRODUTO}</td>
                                    <td style={{textDecoration: produto.CANCELADO === "S" ? "line-through" : ""}}>{produto.VALOR_UNITARIO}</td>
                                    <td style={{textDecoration: produto.CANCELADO === "S" ? "line-through" : ""}}>{produto.QUANTIDADE}</td>
                                    <td style={{textDecoration: produto.CANCELADO === "S" ? "line-through" : ""}}>{produto.TOTAL_FINAL}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CX.ListaItens>
            <CX.InformacaoFinal>
                <div className="cliente">
                    <div className="dados-operador">
                        <div>
                            <label>Terminal: </label>
                            <label>caixa01</label>
                        </div>
                        <div>
                            <label>Operador: </label>
                            <label>Fulano</label>
                        </div>
                        <div>
                            <label>Vendedor: </label>
                            <label>Fulano</label>
                        </div>
                    </div>
                    <div className="dados-cliente">
                        <label style={{fontWeight: "bold", fontSize: "16px"}}>Dados do Cliente: </label>
                        <label>Fulaninho</label>
                        <label>777888999-44</label>
                        <label>(81) 9 9999-9999</label>
                    </div>
                </div>
                <div className="total">
                    <label>SUBTOTAL:</label>
                    <input value={totalVenda.replace(".",",")} readOnly/>
                </div>
                <div className="desc-acresc">
                    <div className="desc">
                        <label>DESCONTO:</label>
                        <input value={"R$ "+"0,00"} readOnly style={{cursor: "default", outline:"0"}}/>
                    </div>
                    <div className="acresc">
                        <label>ACRÉSCIMO:</label>
                        <input value={"R$ "+"0,00"} readOnly style={{cursor: "default", outline:"0"}}/>
                    </div>
                </div>
                <div className="total">
                    <label>TOTAL:</label>
                    <input value={totalVenda.replace(".",",")} readOnly/>
                </div>
            </CX.InformacaoFinal>
            <CX.CampoAtalhos>
                {!atalhoVisivel ? (
                    <>
                    <div className="ajuda">
                        <img src="/images/interrogacao.png"/>
                        <label> [F1] Atalhos</label>
                    </div>
                    <label>{mensagemCampoAtalho}</label>
                    </>
                ): (
                    <div className="atalhos">
                        <div className="ajuda">
                            <img src="/images/interrogacao.png"/>
                            <label>[F1] Menu Ajuda</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/menu.png"/>
                            <label>[F2] Menu Principal</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/cliente_caixa.png"/>
                            <label>[F3] Carregar Cliente</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/acrescimo.png"/>
                            <label>[F4] Acréscimo</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/desconto.png"/>
                            <label>[F5] Desconto</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/lupa_caixa.png"/>
                            <label>[F6] Buscar Preço</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/lupa_caixa.png"/>
                            <label>[F7] Buscar Produto</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/cancelar_item.png"/>
                            <label>[F8] Cancelar Útimo Item</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/op_item.png"/>
                            <label>[F9] Opções do Item</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/venda_cancelar.png"/>
                            <label>[F10] Cancelar Nota</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/vendedor_caixa.png"/>
                            <label>[F11] Identificar Vendedor</label>
                        </div>
                        <div className="ajuda">
                            <img src="/images/voltar.png"/>
                            <label>[F12] Sair</label>
                        </div>
                    </div>
                )}
            </CX.CampoAtalhos>
            {atalho == 4 || atalho==5 ? <DescontoAcrescimo atalho={atalho} setAtalho={setAtalho}/> : null}
            {atalho == 7 ? <ConsultaProduto setAtalho={setAtalho} quantidade={quantidade} limparCampos={limparCampos} listaProdutos={listaProdutos} setListaProdutos={setListaProdutos}/> : null}
            {atalho == "home" ? <EfetuarPagamento setAtalho={setAtalho}/> : null}
        </CX.Container>
    )
}