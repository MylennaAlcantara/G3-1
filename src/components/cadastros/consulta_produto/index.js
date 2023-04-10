import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import * as CP from "./consultarProduto";


export const CounsultarProduto = () =>{
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch (`http://8b38091fc43d.sn.mynetname.net:2005/produtos/general/company/1/payment/1?size=2000`);
            const data = await response.json();
            setItens(data.content);
        }
        fetchData();
    }, []);

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    /*const handleKeyDown = (e) => {
        if(e.keyCode === 38){
            e.preventDefault();
            if(selectIndex === null || selectIndex === 0){
                return;
            }
            setSelectIndex(selectIndex-1);
            setInfoItem({
                qtd_estoque: resultado[selectIndex-1].qtd_estoque,
                qtd_estoque_reservado: resultado[selectIndex-1].qtd_estoque_reservado,
                qtd_estoque_di: resultado[selectIndex-1].qtd_estoque_di
            })
            validarPromocao(resultado[selectIndex+1]);
        }else if (e.keyCode === 40){
            e.preventDefault();
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
            setInfoItem({
                qtd_estoque: resultado[selectIndex+1].qtd_estoque,
                qtd_estoque_reservado: resultado[selectIndex-1].qtd_estoque_reservado,
                qtd_estoque_di: resultado[selectIndex-1].qtd_estoque_di
            });
            validarPromocao(resultado[selectIndex+1]);
        }
    }*/

    const novo = () => {
        navigate("/cadastrarProduto");
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }
    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Produtos</h3>
            </C.Header>
            <CP.Filtro>
                <label>Coluna: </label>
                <select>
                    <option>Descrição</option>
                    <option>cód.</option>
                    <option>Cód. Barra</option>
                    <option>Fornecedor</option>
                    <option>Gurpo / Sub</option>
                    <option>Data Cadastro</option>
                    <option>NCM</option>
                    <option>Familia</option>
                </select>
                <label>Ativo: </label>
                <select>
                    <option>SIM</option>
                    <option>NÃO</option>
                    <option>TODOS</option>
                </select>
                <input placeholder="Buscar..."/>
            </CP.Filtro>
            <CP.Lista>
                <div className="table-responsive">
                <table className="table"  ref={tableRef} tabIndex={0}>
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
                                itens.slice(0, 50).map( (item, index) => {
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
            </CP.Lista>
            
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button><img src="/images/abrir.png"/>Abrir</button>
                    <button><img src="/images/voltar.png"/>Fechar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}