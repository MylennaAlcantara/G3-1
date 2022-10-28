import React, { useEffect, useState } from "react";
import {Container, Header, Modal} from "./../modal/modal.js";
import * as C from "./produtos.js";

export const Produtos = ({onClose = () => {}}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("");
            const data = await response.json();
            setItems(data);
        }
        fetchData();
        
    }, []);

    console.log(items);

    return (
        <Modal>
            <Container>
                <Header>
                    <label> Lista de Produtos </label>
                    <button className="close" onClick={onClose}>X</button>
                </Header>
                <C.Filtro>
                    <div>
                        <label>Pesquisar</label>
                        <select>
                            <option value="1">Código</option>
                            <option value="2">Descrição</option>
                        </select>
                    </div>
                    <input className="search" placeholder="Buscar" />
                    <div>
                        <label>Fornecedor</label>
                        <input />
                    </div>
                    <div>
                        <label>Ordenar</label>
                        <select>
                            <option value="1">Descrição</option>
                            <option value="2">Data Modificação</option>
                            <option value="3">Data Cadastro</option>
                            <option value="4">Cód. Interno</option>
                        </select>
                    </div>
                    </C.Filtro>
                    <C.ListItems>
                    <table id="table-items" >
                        <thead>
                            <tr>
                                <th>Cód. Interno</th>
                                <th>Cód. referência</th>
                                <th>Código Barras</th>
                                <th>Descrição</th>
                                <th>Qtd. Estoque</th>
                                <th>Promoção</th>                        
                            </tr>
                        </thead>
                        <tbody>
                        {items.map( (item) => {
                            return(
                                <tr key={item.id} >
                                    <td>{item.id}</td>
                                    <td>{item.referencia}</td>
                                    <td>{item.gtin}</td>
                                    <td>{item.descricaoPdv}</td>
                                    <td>{item.qtd_estoque}</td>
                                    <td>N</td>                                    
                                </tr>
                            );
                        })}                                                      
                        </tbody>
                    </table>
                    </C.ListItems>
            </Container>
        </Modal>
    );
};