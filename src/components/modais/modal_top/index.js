import React, {useEffect, useState, useRef} from "react";
import { Loading } from "../../loading/index.js";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Top = ({onClose = () =>{}, focoCampoSeguinte, setDataSelectTop, setTopAlterada}) => {

    const [top, setTop] = useState([]);
    const [selectTop, setSelectTop] = useState();
    const [selectIdTop, setSelectIdTop] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('codigo');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/top/all");//http://localhost:5000/tops
            const data = await response.json();
            setTop(data);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const SelectedTop = (top) => {
        setDataSelectTop({
            id_top: top.id,
            id_perfil_movimentacao:top.id_perfil_movimentacao,
            libera_itens_estoque_indisponivel: top.libera_itens_estoque_indisponivel,
            descricao: top.descricao,
            tipo_movimentacao: top.tipo_movimentacao,
            rotina_movimenta_estoque_reservado: top.rotina_movimenta_estoque_reservado,
            gera_financeiro: top.gera_financeiro,
            rotina_movimenta_estoque_real: top.rotina_movimenta_estoque_real,
            rotina_movimenta_estoque_deposito_interno: top.rotina_movimenta_estoque_deposito_interno,
            libera_editar_nome_do_consumidor_final: top.libera_editar_nome_do_consumidor_final,
            editar_preco_rotina: top.editar_preco_rotina,
            tipo_edicao_preco_rotina: top.tipo_edicao_preco_rotina
        });
        onClose();
        focoCampoSeguinte();
        setTopAlterada(true);
    };

    // Filtro de busca

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value)
    };

    const resultado = Array.isArray(top) && top.filter((top) => {
        if(filtro === 'codigo'){
            return top.id === Number(busca);
        }else if(filtro === 'descricao'){
            return top.descricao.toLowerCase().includes(busca);
        }
    });

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (top, index) => {
        setSelectIndex(index);
    }

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
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                setDataSelectTop({
                    id_top: resultado[selectIndex].id,
                    id_perfil_movimentacao:resultado[selectIndex].id_perfil_movimentacao,
                    libera_itens_estoque_indisponivel: resultado[selectIndex].libera_itens_estoque_indisponivel,
                    descricao: resultado[selectIndex].descricao,
                    tipo_movimentacao: resultado[selectIndex].tipo_movimentacao,
                    rotina_movimenta_estoque_reservado: resultado[selectIndex].rotina_movimenta_estoque_reservado,
                    gera_financeiro: resultado[selectIndex].gera_financeiro,
                    rotina_movimenta_estoque_real: resultado[selectIndex].rotina_movimenta_estoque_real,
                    rotina_movimenta_estoque_deposito_interno: resultado[selectIndex].rotina_movimenta_estoque_deposito_interno,
                    libera_editar_nome_do_consumidor_final: resultado[selectIndex].libera_editar_nome_do_consumidor_final,
                    editar_preco_rotina: resultado[selectIndex].editar_preco_rotina,
                    tipo_edicao_preco_rotina: resultado[selectIndex].tipo_edicao_preco_rotina
                });
                onClose();
                focoCampoSeguinte();
                setTopAlterada(true);
            }
        }
    };

    return(
        <Modal>
            <Container>
            <Header>
                <label> Top</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>
            <div className="div-checkbox">
                        <div>
                            <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange}/>
                            <label> Código </label>
                        </div>
                        <div>
                            <input type="radio" value="descricao" className="checkbox" name="checkbox" checked={filtro === 'descricao'} onChange={handleFiltroChange}/>
                            <label> Descrição </label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>                
            </Filtro>
            {top.length === 0 ? (
                <Loading/>
            ) : (
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0} >
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Mov. Est. reservado</th>
                                <th>MOv. Est. Real</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.slice(0, 10).map( (top, index) => {
                                return(
                                    <tr 
                                    key={top.id} 
                                    onClick={selecionado.bind(this, top, index)}
                                    onDoubleClick={SelectedTop.bind(this, top)}
                                    style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}} >
                                        <td>{top.id}</td>
                                        <td>{top.descricao}</td>
                                        <td>{top.rotina_movimenta_estoque_reservado === false ? ('Não') : ('Sim')}</td>
                                        <td>{top.rotina_movimenta_estoque_real === false ? ('Não') : ('Sim')}</td>                                   
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            </Container>
        </Modal>
    );
};