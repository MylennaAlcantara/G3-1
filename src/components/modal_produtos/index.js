import React, { useEffect, useState } from "react";
import {Container, Header, Modal} from "./../modal/modal.js";
import * as C from "./produtos.js";

export const Produtos = ({onClose = () => {}}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("https://rickandmortyapi.com/api/character");
            const data = await response.json();
            setItems(data.results);
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
                    {items.slice(0, 5).map( (item) => {
                        return(
                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                                <td>N</td>                                    
                            </tr>
                        );
                    })}                                                      
                    </tbody>
                </table>
                </C.ListItems>
                <C.Container>
                    <C.Preço>
                        <label>Preço</label>
                        <input type="radio"/>
                        <label>Varejo</label>
                        <input type="radio"/>
                        <label>Atac.</label>
                        <table >
                            <thead>
                                <tr>
                                    <td>Tipo Pagamento</td>
                                    <td>Vlr. Custo</td>
                                    <td>Vlr. Produto</td>
                                    <td>Deconto (%)</td>
                                    <td>Vlr. Venda</td>
                                    <td>Vlr. ST</td>
                                    <td>Venda + ST</td>
                                    <td>Qtd. Atac.</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                </tr>
                            </tbody>
                        </table>
                    </C.Preço>
                    <C.Estoque>
                        <label>Estoque</label>
                        <input type="checkbox"/>
                        <label>Listar todas empresas</label>
                        <div className="tab-estoque">                            
                            <div>Tipo Pagamento</div>
                            <div>Vlr. Custo</div>
                            <div>Vlr. Produto</div>
                            <div>Deconto (%)</div>
                            <div>Vlr. Venda</div>
                            <div>Vlr. ST</div>
                            <div>Venda + ST</div>
                            <div>Qtd. Atac.</div>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                </tr>
                            </tbody>
                        </table>
                        <label>Estoque Disp. Total</label>
                        <input/>
                    </C.Estoque>
                </C.Container>
            </Container>
            
        </Modal>
    );
};