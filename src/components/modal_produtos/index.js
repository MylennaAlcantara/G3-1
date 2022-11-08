import React, { useEffect, useState } from "react";
import { Header, Modal} from "./../modal/modal.js";
import * as C from "./produtos.js";

export const Produtos = ({onClose = () => {}, setDataSelectItem, setDataIdSelectItem}) => {

    const [itens, setItens] = useState([]);
    const [selectItem, setSelectItem] = useState();
    const [selectIdItem, setSelectIdItem] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("http://10.0.1.10:8092/produtos/general/company/1/payment/1?size=50");
            const data = await response.json();
            setItens(data.content);
        }
        fetchData();
        
    }, []);

    const SelectedItem = (item) => {
        setSelectItem(item.descricaoPdv);
        setDataSelectItem(item.descricaoPdv);
        setSelectIdItem(item.id);
        setDataIdSelectItem(item.id);
        onClose();
    };


    return (
        <Modal>
            <C.ContainerProdutos>
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
                <C.ListItens>
                <table className="table" >
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
                    {itens.slice(0, 8).map( (item) => {
                        return(
                            <tr key={item.id} onClick={SelectedItem.bind(this, item)} >
                                <td>{item.id}</td>
                                <td>{item.referencia}</td>
                                <td>{item.gtin}</td>
                                <td>{item.descricaoPdv}</td>
                                <td>{item.qtd_estoque}</td>
                                <td></td>                                    
                            </tr>
                        );
                    })}                                                      
                    </tbody>
                </table>
                </C.ListItens>
                <C.Valores>
                    <C.Preço>
                        <div>
                            <div className="head-valores">
                                <label className="valores">Preço</label>
                                <div className="radio">
                                    <input type="radio"/>
                                    <label> Varejo </label>
                                    <input type="radio"/>
                                    <label> Atac. </label>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tipo Pagamento</th>
                                    <th>Vlr. Custo</th>
                                    <th>Vlr. Produto</th>
                                    <th>Deconto (%)</th>
                                    <th>Vlr. Venda</th>
                                    <th>Vlr. ST</th>
                                    <th>Venda + ST</th>
                                    <th>Qtd. Atac.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A vista</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                </tr>
                                <tr>
                                    <td>Cartão</td>
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
                        <div>
                            <div className="head-valores">
                                <label className="valores">Estoque</label>
                                <div>
                                    <input type="checkbox"/>
                                    <label>Listar todas empresas</label>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Filial</th>
                                    <th>Qtd. Total</th>
                                    <th>Reservado</th>
                                    <th>Dep. Interno</th>
                                    <th>Disponivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                    <td>123156</td>
                                </tr>
                            </tbody>
                        </table>
                        <label>Estoque Disp. Total: </label>
                        <input className="estoque-tot"/>
                    </C.Estoque>
                </C.Valores>
                <C.Footer>
                    <div>
                        <label> 0 - GRUPO DE ICMS </label>
                        <label> 0 - REGRA DE ICMS </label>
                    </div>
                </C.Footer>
            </C.ContainerProdutos>
            
        </Modal>
    );
};