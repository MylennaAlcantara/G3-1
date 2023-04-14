import React, { useEffect, useState, useRef } from "react";
import { Header, Modal} from "./../modal/modal.js";
import * as C from "../modal_produtos/produtos";
import { Loading } from "../../loading/index";

export const Produtos = ({onClose = () => {}, focoQtd, setDataSelectItem, setPromocao, dataIdSelectEmitente, dataIdSelectPgt, dataSelectTop, rotinas, tipoPgtoAlterado, emitenteAlterado, liberaEstoque, tipoMovimentacao}) => {

    const [itens, setItens] = useState([]);
    const [busca, setBusca] = useState('');
    const [infoItem, setInfoItem] = useState([]);


    useEffect(() => {
        async function fetchData (){
            if(emitenteAlterado === true && tipoPgtoAlterado === true){
                console.log("passou 1");
                const response = await fetch (`http://8b38091fc43d.sn.mynetname.net:2005/produtos/general/company/${dataIdSelectEmitente}/payment/${dataIdSelectPgt}?size=50`);//http://10.0.1.10:8092/produtos/general/company/1/payment/1?size=50
                const data = await response.json();
                setItens(data.content);
            }else if(emitenteAlterado === true && tipoPgtoAlterado === false){
                console.log("passou 2");
                const response = await fetch (`http://8b38091fc43d.sn.mynetname.net:2005/produtos/general/company/${dataIdSelectEmitente}/payment/${rotinas.id_tipo_pagamento}?size=50`);
                const data = await response.json();
                setItens(data.content);
            }else if(emitenteAlterado === false && tipoPgtoAlterado === true){
                console.log("passou 3");
                const response = await fetch (`http://8b38091fc43d.sn.mynetname.net:2005/produtos/general/company/${rotinas.id_empresa}/payment/${dataIdSelectPgt}?size=50`);
                const data = await response.json();
                setItens(data.content);
            }else if(emitenteAlterado === false && tipoPgtoAlterado === false){
                console.log("passou 4");
                const response = await fetch (`http://10.0.1.10:8092/produtos/general/company/${rotinas.id_empresa}/payment/${rotinas.id_tipo_pagamento}?size=50`);
                const data = await response.json();
                setItens(data.content);
            }else{
                console.log("passou 5");
                const response = await fetch (`http://8b38091fc43d.sn.mynetname.net:2005/produtos/general/company/${dataIdSelectEmitente}/payment/${dataIdSelectPgt}?size=2000`);
                const data = await response.json();
                setItens(data.content);
            }
        }
        fetchData();
        document.getElementById('search').focus();
    }, []);

    const validarPromocao = async(item) => {
        const promocao = await fetch(`http://8b38091fc43d.sn.mynetname.net:2005/promocaoProduto/${item.id}/${dataIdSelectEmitente}`)
        const data = await promocao.json();
        setPromocao(data);
    }

    // Função para pegar as informações do produto selecionado com dois clicks
    const SelectedItem = (item) => {
        if(dataSelectTop.libera_itens_estoque_indisponivel === true || liberaEstoque === true ){
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
                subtotal: '',
                descontoPorcen: '',
                qtd_estoque: item.qtd_estoque,
                quantidade: 1,
                id_top: dataSelectTop.id_top,
                preco_atacado: item.preco_atacado,
                qtd_atacado: item.qtd_atacado
            });
            onClose();
            focoQtd();
        }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false) && resultado[selectIndex].qtd_estoque <= 0 && (dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S')){
            alert('Produto com estoque indisponivel');
        }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false)  && (dataSelectTop.tipo_movimentacao === 'E' || tipoMovimentacao === 'E')){
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
                subtotal: '',
                qtd_estoque: item.qtd_estoque,
                quantidade: 1,
                id_top: dataSelectTop.id_top,
                preco_atacado: item.preco_atacado,
                qtd_atacado: item.qtd_atacado
            });
            onClose();
            focoQtd();
        }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false) && resultado[selectIndex].qtd_estoque >= 0 && (dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S')){
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
                subtotal: '',
                qtd_estoque: item.qtd_estoque,
                quantidade: 1,
                id_top: dataSelectTop.id_top,
                preco_atacado: item.preco_atacado,
                qtd_atacado: item.qtd_atacado
            });
            onClose();
            focoQtd();
        }else{
            console.log('passou direto')
        }
    };

    const EstoqueTrib = (item, index) =>{
        setInfoItem({
            qtd_estoque: item.qtd_estoque,
            qtd_estoque_reservado: item.qtd_estoque_reservado,
            qtd_estoque_di: item.qtd_estoque_di,
            id_regra_icms: item.id_regra_icms
        })
        validarPromocao(item);
        setSelectIndex(index);
    }

    //Filtro campo de busca de acordo com codigo ou descrição
    
    const [filtroEscolhido, setFiltroEscolhido] = useState('C');

    const resultado = Array.isArray(itens) && itens.filter((item) => {
        if(filtroEscolhido === 'C'){
            return item.id === Number(busca);
        }else if(filtroEscolhido === 'D')
            return item.descricaoPdv.toLowerCase().includes(busca);
    });

    const select = document.getElementById('opções');

    function FiltroCod(){
        if(select.value === '1'){
            setFiltroEscolhido('C');
        }else if(select.value === '2'){
            setFiltroEscolhido('D');
        }
    }

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
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                if(dataSelectTop.libera_itens_estoque_indisponivel === true || liberaEstoque === true ){
                    setDataSelectItem({
                    id_produto: resultado[selectIndex].id,
                    gtin_produto: resultado[selectIndex].gtin,
                    valor_unitario: resultado[selectIndex].valor_venda,
                    descricao_produto: resultado[selectIndex].descricaoPdv,
                    unidade_produto: resultado[selectIndex].unidade_produto_nome,
                    valor_icms_st: 0,
                    acrescimo: 0,
                    desconto: 0,
                    ncm: resultado[selectIndex].ncm,
                    ncmEx: resultado[selectIndex].ncmex,
                    subtotal: '',
                    qtd_estoque: resultado[selectIndex].qtd_estoque,
                    quantidade: 1,
                    preco_atacado: resultado[selectIndex].preco_atacado,
                    qtd_atacado: resultado[selectIndex].qtd_atacado
                });
                    onClose();
                    focoQtd();
                }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false) && resultado[selectIndex].qtd_estoque <= 0 && (dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S')){
                    alert('Produto com estoque indisponivel');
                }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false)  && (dataSelectTop.tipo_movimentacao === 'E' || tipoMovimentacao === 'E')){
                    setDataSelectItem({
                        id_produto: resultado[selectIndex].id,
                        gtin_produto: resultado[selectIndex].gtin,
                        valor_unitario: resultado[selectIndex].valor_venda,
                        descricao_produto: resultado[selectIndex].descricaoPdv,
                        unidade_produto: resultado[selectIndex].unidade_produto_nome,
                        valor_icms_st: 0,
                        acrescimo: 0,
                        desconto: 0,
                        ncm: resultado[selectIndex].ncm,
                        ncmEx: resultado[selectIndex].ncmex,
                        subtotal: '',
                        qtd_estoque: resultado[selectIndex].qtd_estoque,
                        quantidade: 1,
                        preco_atacado: resultado[selectIndex].preco_atacado,
                        qtd_atacado: resultado[selectIndex].qtd_atacado
                    });
                    onClose();
                    focoQtd();
                }else if((dataSelectTop.libera_itens_estoque_indisponivel === false || liberaEstoque === false) && resultado[selectIndex].qtd_estoque >= 0 && (dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S')){
                    setDataSelectItem({
                        id_produto: resultado[selectIndex].id,
                        gtin_produto: resultado[selectIndex].gtin,
                        valor_unitario: resultado[selectIndex].valor_venda,
                        descricao_produto: resultado[selectIndex].descricaoPdv,
                        unidade_produto: resultado[selectIndex].unidade_produto_nome,
                        valor_icms_st: 0,
                        acrescimo: 0,
                        desconto: 0,
                        ncm: resultado[selectIndex].ncm,
                        ncmEx: resultado[selectIndex].ncmex,
                        subtotal: '',
                        qtd_estoque: resultado[selectIndex].qtd_estoque,
                        quantidade: 1,
                        preco_atacado: resultado[selectIndex].preco_atacado,
                        qtd_atacado: resultado[selectIndex].qtd_atacado
                    });
                    onClose();
                    focoQtd();
                }
            }
        }
    }
    
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
                    <label>Buscar: </label>
                    <input className="search" id="search" placeholder="Buscar" value={busca} onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                </C.Filtro>
                {itens.length === 0 ? (
                    <div className="load">
                        <Loading/>
                    </div>
                ) : (
                <C.ListItens>
                    <table className="table"  ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0}>
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
                                { 
                                resultado.slice(0, 8).map( (item, index) => {
                                    return(
                                        <tr 
                                            id="produto" 
                                            key={item.id} 
                                            onClick={EstoqueTrib.bind(this, item, index)} 
                                            onDoubleClick={SelectedItem.bind(this, item)}
                                            style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                                <td>{item.id}</td>
                                                <td>{item.referencia}</td>
                                                <td>{item.gtin}</td>
                                                <td>{item.descricaoPdv}</td>
                                                <td>{parseFloat(item.qtd_estoque).toFixed(3).replace('.',',')}</td>
                                                <td></td>                                    
                                        </tr>
                                    );
                                }) 
                                }                                    
                            </tbody>
                    </table>
                </C.ListItens>
                )}
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
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,000</td>
                                </tr>
                                <tr>
                                    <td>Cartão</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,000</td>
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
                                    <td>{parseFloat(infoItem.qtd_estoque).toFixed(3).replace('.',',')}</td>
                                    <td>{parseFloat(infoItem.qtd_estoque_reservado).toFixed(3).replace('.',',')}</td>
                                    <td>{parseFloat(infoItem.qtd_estoque_di).toFixed(3).replace('.',',')}</td>
                                    <td>{parseFloat(parseFloat(infoItem.qtd_estoque) - parseFloat(infoItem.qtd_estoque_reservado)).toFixed(3).replace('.',',')}</td>
                                </tr>
                            </tbody>
                        </table>
                        <label>Estoque Disp. Total:  </label>
                        <input className="estoque-tot" value={parseFloat(infoItem.qtd_estoque) - parseFloat(infoItem.qtd_estoque_reservado)} readOnly/>
                    </C.Estoque>
                </C.Valores>
                <C.Footer>
                    <div>
                        <label> 0 - GRUPO DE ICMS </label>
                        <label> {infoItem.id_regra_icms} - REGRA DE ICMS </label>
                    </div>
                </C.Footer>
            </C.ContainerProdutos>
            
        </Modal>
    );
};