import React, { useEffect, useState } from "react";
import * as CP from "./consultaProduto";

export const ConsultaProduto = ({setAtalho}) => {
    const [produtos, setProdutos] = useState([]);
    const [buscaProduto, setBuscaProduto] = useState("");
    document.onkeydown = fechar;

    function fechar(e) {
        if(e.keyCode === 27){
            setAtalho();
        }
    }

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


    return (
        <CP.Container>
            <CP.Header>
                <h1><img src="/images/caixas.png"/> Produtos</h1>
                <img src="/images/logo.png"/>
            </CP.Header>
            <CP.Tabela>
                <table>
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>GTIN</th>
                            <th>DESCRIÇÃO</th>
                            <th>VALOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(produtos) && produtos.map((produto)=>{
                            return(
                                <tr key={produto.id}>
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
                <input id="search" value={buscaProduto} onChange={(e)=> setBuscaProduto(e.target.value)}/>
                <img src="/images/LUPA.png" onClick={pesquisarProduto}/>
                <label>[F12] Importa</label>
            </CP.Pesquisar>
        </CP.Container>
    )
}