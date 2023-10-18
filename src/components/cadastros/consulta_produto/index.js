import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading";
import * as CP from "./consultarProduto";


export const CounsultarProduto = () =>{
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const {user, empresa, nivel, cnpjMask} = useContext(AuthContext);
    const [busca, setBusca] = useState('');
    
    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch (process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+`/produtos/general/company/0/payment/0?size=50`);
            const data = await response.json();
            setItens(data.content);
            if( response.status === 200){
                setCarregado(true);
            }
        }
        fetchData();
        document.getElementById("search").focus();
    }, []);
    
    const selectColuna = document.getElementById('coluna');
    const selectAtivo = document.getElementById('ativo');

    const resultado = itens.filter((item)=> {
        if(selectColuna.value === "1"){
            return item.descricaoPdv.toLowerCase().includes(busca);
        }else if(selectColuna.value === "2"){
            return String(item.id).toLowerCase().includes(busca);
        }else if(selectColuna.value === "3"){
            return item.gtin.toLowerCase().includes(busca);
        }else if(selectColuna.value === "4"){
            return item.fornecedor.toLowerCase().includes(busca);
        }else if(selectColuna.value === "5"){
            return item.grupo.toLowerCase().includes(busca);
        }else if(selectColuna.value === "7"){
            return item.ncm.toLowerCase().includes(busca);        //falta por familia e por data que não tem a informação na api
        }
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const handleKeyDown = (e) => {
        if(e.keyCode === 38){
            e.preventDefault();
            if(selectIndex === null || selectIndex === 0){
                return;
            }
            setSelectIndex(selectIndex-1);
        }else if (e.keyCode === 40){
            e.preventDefault();
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }
    }

    const novo = () => {
        if(nivel.cadastro_produto_incluir){
            navigate("/cadastrarProduto");
        }else{
            alert("Nivel de acesso negado!");
        }
    }
    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Produtos</h3>
            </C.Header>
            <CP.Filtro>
                <label>Coluna: </label>
                <select id="coluna">
                    <option value="1">Descrição</option>
                    <option value="2">cód.</option>
                    <option value="3">Cód. Barra</option>
                    <option value="4">Fornecedor</option>
                    <option value="5">Gurpo / Sub</option>
                    <option value="6">Data Cadastro</option>
                    <option value="7">NCM</option>
                    <option value="8">Familia</option>
                </select>
                <label>Ativo: </label>
                <select id="ativo">
                    <option value="1">SIM</option>
                    <option value="2">NÃO</option>
                    <option value="3">TODOS</option>
                </select>
                <input placeholder="Buscar..." id="search" value={busca} onChange={(e)=> setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
            </CP.Filtro>
            <CP.Lista>
                {itens.length === 0 && carregado === false ? (
                    <Loading/>
                ) : itens.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Cód. Interno</th>
                                    <th>Ativo</th>
                                    <th>Referência</th>
                                    <th>GTIN / EAN</th>
                                    <th>Descrição</th>                     
                                </tr>
                            </thead>
                        </table>
                        <div style={{height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold"}}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Cód. Interno</th>
                                    <th>Ativo</th>
                                    <th>Referência</th>
                                    <th>GTIN / EAN</th>
                                    <th>Descrição</th>                     
                                </tr>
                            </thead>
                                <tbody>
                                    { 
                                    resultado.slice(0, 50).map( (item, index) => {
                                        return(
                                            <tr 
                                                id="produto" 
                                                key={item.id}
                                                style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                                    <td>{item.id}</td>
                                                    <td>SIM</td>                                    
                                                    <td>{item.referencia}</td>
                                                    <td>{item.gtin}</td>
                                                    <td>{item.descricaoPdv}</td>
                                            </tr>
                                        );
                                    }) 
                                    }                                    
                                </tbody>
                        </table>
                    </div>
                )}
            </CP.Lista>
            
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button><img src="/images/abrir.png"/>Abrir</button>
                    <button onClick={()=> navigate('/home')}><img src="/images/voltar.png"/>Fechar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}