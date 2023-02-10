import React, { useEffect, useState } from "react";
import { Header, Modal} from "./../modal/modal.js";
import * as C from "./produtos.js";

export const Produtos = ({onClose = () => {}, setDataSelectItem, dataIdSelectEmitente, dataIdSelectPgt}) => {

    const [itens, setItens] = useState([]);
    const [busca, setBusca] = useState('');
    const [infoItem, setInfoItem] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch (`http://10.0.1.10:8092/produtos/general/company/${dataIdSelectEmitente}/payment/${dataIdSelectPgt}?size=50`);//http://10.0.1.10:8092/produtos/general/company/1/payment/1?size=50
            const data = await response.json();
            setItens(data.content);
        }
        fetchData();
    }, []);

    // Função para pegar as informações do produto selecionado com dois clicks
    const SelectedItem = (item) => {
        setDataSelectItem({
            id_produto: item.id,
            gtin_produto: item.gtin,
            valor_unitario: item.valor_venda,
            descricao_produto: item.descricaoPdv,
            unidade_produto: item.unidade_produto_nome,
            valor_icms_st: 0,
            acrescimo: 0,
            desconto: 0,
            ncm: item.ncm,
            ncmEx: item.ncmex,
            subtotal: ''
        });
            onClose();
    };

    const EstoqueTrib = (item) =>{
        setInfoItem({
            qtd_estoque: item.qtd_estoque
        })
    }

    //Filtro campo de busca de acordo com codigo ou descrição

    const resultado = Array.isArray(itens) && itens.filter((item) => item.gtin.toLowerCase().includes(busca));
    const resultado2 = Array.isArray(itens) && itens.filter((item) => item.descricaoPdv.toLowerCase().includes(busca));
    
    const [filtroEscolhido, setFiltroEscolhido] = useState('C');

    const select = document.getElementById('opções');

    function FiltroCod(){
        if(select.value === '1'){
            setFiltroEscolhido('C');
        }else if(select.value === '2'){
            setFiltroEscolhido('D');
        }
    }
        
    
        



    console.log(filtroEscolhido)

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
                        <select id="opções" onChange={FiltroCod}>
                            <option id="codigo" value="1" >Código</option>
                            <option id="descricao" value="2" >Descrição</option>
                        </select>
                    </div>
                    <input className="search" placeholder="Buscar" value={busca} onChange={e => setBusca(e.target.value)}/>
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
                        { filtroEscolhido==='C' ?(
                        resultado.slice(0, 8).map( (item) => {
                            return(
                                <tr key={item.id} onClick={EstoqueTrib.bind(this, item)} onDoubleClick={SelectedItem.bind(this, item)} >
                                    <td>{item.id}</td>
                                    <td>{item.referencia}</td>
                                    <td>{item.gtin}</td>
                                    <td>{item.descricaoPdv}</td>
                                    <td>{item.qtd_estoque}</td>
                                    <td></td>                                    
                                </tr>
                            );
                        })) :(
                            resultado2.slice(0, 8).map( (item) => {
                                return(
                                    <tr key={item.id} onClick={EstoqueTrib.bind(this, item)} onDoubleClick={SelectedItem.bind(this, item)} >
                                        <td>{item.id}</td>
                                        <td>{item.referencia}</td>
                                        <td>{item.gtin}</td>
                                        <td>{item.descricaoPdv}</td>
                                        <td>{item.qtd_estoque}</td>
                                        <td></td>                                    
                                    </tr>
                                );
                            })
                        )
                        }
                   
                                                                        
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
                                <tr >
                                    <td>{dataIdSelectEmitente}</td>
                                    <td>{infoItem.qtd_estoque}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>{infoItem.qtd_estoque}</td>
                                </tr>
                            </tbody>
                        </table>
                        <label>Estoque Disp. Total:  </label>
                        <input className="estoque-tot" value={infoItem.qtd_estoque}/>
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