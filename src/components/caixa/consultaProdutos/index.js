import React, { useEffect, useRef, useState } from "react";
import * as CP from "./consultaProduto";

export const ConsultaProduto = ({setAtalho,limparCampos, listaProdutos, setListaProdutos, quantidade}) => {
    const [produtos, setProdutos] = useState([]);
    const [buscaProduto, setBuscaProduto] = useState("");

    useEffect(()=>{
        async function fetchProdutos(){
            const res = await fetch(`http://localhost:8090/produto`)
            const data = await res.json();
            setProdutos(data);
            document.getElementById("search").focus();
        }
        fetchProdutos();
    },[])

    async function pesquisarProduto(){
        if(buscaProduto != ""){
            const res = await fetch(`http://localhost:8090/produto/descricao/${buscaProduto}`)
            const data = await res.json();
            setProdutos(data);
        }else{
            const res = await fetch(`http://localhost:8090/produto`)
            const data = await res.json();
            setProdutos(data);
        }
    }

    function selecionado(produto, index){
        setLinhaSelecionada(index)
    }

    const [linhaSelecionada, setLinhaSelecionada] = useState(0);
    const tableRef = useRef(0);


    function importaProduto(e){
        if(e.keyCode === 40){
            e.preventDefault();
            if(linhaSelecionada === null || linhaSelecionada === produtos.length -1 ){
                return;
            }
            setLinhaSelecionada(linhaSelecionada+1);
        }else if(e.keyCode === 38){
            e.preventDefault();
            if(linhaSelecionada === null || linhaSelecionada === 0){
                return
            }
            setLinhaSelecionada(linhaSelecionada-1);
        }else if(e.keyCode === 123){
            e.preventDefault();
            if(linhaSelecionada != null){
                setListaProdutos([
                    ...listaProdutos,
                    {
                        ID: "",
                        ID_ECF_PRODUTO: produtos[linhaSelecionada].id,
                        ID_ECF_VENDA_CABECALHO: "",
                        CFOP: produtos[linhaSelecionada].cfop,
                        ITEM: listaProdutos.length,
                        QUANTIDADE: quantidade,
                        VALOR_UNITARIO: produtos[linhaSelecionada].valor_VENDA,
                        VALOR_CUSTO_UNITARIO: produtos[linhaSelecionada].valor_CUSTO,
                        SUB_TOTAL: produtos[linhaSelecionada].valor_VENDA,
                        TOTAL_FINAL:  (parseFloat(quantidade).toFixed(4)*parseFloat(produtos[linhaSelecionada].valor_VENDA).toFixed(2)).toFixed(2),
                        BASE_ICMS:  (parseFloat(quantidade).toFixed(4)*parseFloat(produtos[linhaSelecionada].valor_VENDA).toFixed(2)).toFixed(2),
                        TAXA_ICMS: produtos[linhaSelecionada].icms_ALIQUOTA,
                        ICMS: produtos[linhaSelecionada].cst_ICMS,
                        TAXA_DESCONTO: 0.00,
                        DESCONTO: 0.00,
                        TAXA_ISSQN: "",
                        ISSQN: "", 
                        TAXA_PIS: produtos[linhaSelecionada].pis_ALIQUOTA,
                        PIS: produtos[linhaSelecionada].cst_PIS, 
                        TAXA_COFINS: produtos[linhaSelecionada].cofins_ALIQUOTA,
                        COFINS: produtos[linhaSelecionada].cst_COFINS,
                        TAXA_ACRESCIMO: 0.00,
                        ACRESCIMO: 0.00,
                        ACRESCIMO_RATEIO: 0.00,
                        DESCONTO_RATEIO: 0.00,
                        TOTALIZADOR_PARCIAL: produtos[linhaSelecionada].totalizador_PARCIAL,
                        CST: "",
                        CANCELADO: false,
                        MOVIMENTA_ESTOQUE: true,
                        HASH_TRIPA: produtos[linhaSelecionada].hash,
                        SERIE_ECF: 1,
                        COO: "",
                        CCF: "",
                        GTIN: produtos[linhaSelecionada].gtin,
                        ID_ECF_CAIXA: 1, 
                        COMISSAO: produtos[linhaSelecionada].comissao_PERCENTUAL,
                        CST_PIS: produtos[linhaSelecionada].cst_PIS,
                        CST_COFINS: produtos[linhaSelecionada].cst_COFINS,
                        CST_IPI: produtos[linhaSelecionada].cst_IPI,
                        CST_ICMS: produtos[linhaSelecionada].cst_ICMS,
                        ORIGEM: produtos[linhaSelecionada].origem,
                        DESCRICAO_PRODUTO: produtos[linhaSelecionada].descricao,
                        UNIDADE_PRODUTO: produtos[linhaSelecionada].unidade,
                        NCM: produtos[linhaSelecionada].ncm,
                        CEST: produtos[linhaSelecionada].cest,
                        PROMOCAO: produtos[linhaSelecionada].promocao,
                        QTD_DEVOLVIDA: "",
                        ID_CUPOM_CREDITO: "",
                        BC_PIS_COFINS: "",
                        ID_PROMOCAO_DETALHE: "",
                        TIPO_PROMOCAO: "",
                        CODIGO_INTEGRACAO_PROMOCAO: "",
                        VALIDOU_PROMOCAO: ""
                    }
                ]);
            }
            setAtalho();
            limparCampos(produtos[linhaSelecionada]);
        }
    }

    function atalhos(e){
        if(e.keyCode === 13){
            e.preventDefault();
            pesquisarProduto();
        }else if(e.keyCode === 123){
            e.preventDefault();
            //função de importar
        }else if(e.keyCode === 27){
            setAtalho();
        }
    }

    document.onkeydown = atalhos;


    return (
        <CP.Container>
            <CP.Header>
                <h1><img src="/images/caixas.png"/> Produtos</h1>
                <img src="/images/logo.png"/>
            </CP.Header>
            <CP.Tabela>
                <table ref={tableRef} onKeyDown={importaProduto} tabIndex={0}>
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>GTIN</th>
                            <th>DESCRIÇÃO</th>
                            <th>VALOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(produtos) && produtos.map((produto, index)=>{
                            return(
                                <tr key={produto.id} 
                                    onClick={selecionado.bind(this, produto, index)}
                                    style={{backgroundColor: index === linhaSelecionada ? "#87CEFA" : ""}}>
                                    <td>{produto.id}</td>
                                    <td>{produto.gtin}</td>
                                    <td>{produto.descricao}</td>
                                    <td style={{textAlign: "end"}}>{parseFloat(produto.valor_VENDA).toFixed(2).replace(".",",")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CP.Tabela>
            <CP.Pesquisar>
                <input id="search" value={buscaProduto} onChange={(e)=> setBuscaProduto(e.target.value)} onKeyDown={importaProduto}/>
                <img src="/images/LUPA.png" onClick={pesquisarProduto}/>
                <label>[F12] Importa</label>
            </CP.Pesquisar>
        </CP.Container>
    )
}