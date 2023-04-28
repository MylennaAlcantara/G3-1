import React, {useEffect, useRef, useState} from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { CadastroRamo } from "../modal_cadastro_ramo/index";
import { Loading } from "../../loading";

export const RamoAtividade = ({close, setDadosRamo, cadastroRamo}) => {
    const [ramos, setRamos] = useState([]);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/ramoAtividade/all");
            const data = await response.json();
            setRamos(data);
        }
            fetchData();
    }, []);

    function selected (ramo){
        setDadosRamo({
            id: ramo.id,
            descricao: ramo.descricao
        })
        close();
    }

    // Filtro de busca
    const [filtro, setFiltro] = useState('descricao');
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    const resultado = Array.isArray(ramos) && ramos.filter((ramo) => {
        if(filtro === 'descricao'){
            return ramo.descricao.toLowerCase().includes(busca);
        }else if(filtro === 'id'){
            return String(ramo.id).toLowerCase().includes(busca);
        }
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (index) => {
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
                setDadosRamo({
                    id: resultado[selectIndex].id,
                    descricao: resultado[selectIndex].descricao
                });
                close();
            }
        }
    };

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Ramo de Atividade</label>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input name="checkbox" type="radio" value="id" checked={filtro === "id"} onChange={handleFiltroChange}/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input name="checkbox" type="radio" value="descricao" checked={filtro === "descricao"} onChange={handleFiltroChange}/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={(e)=> setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                </M.Filtro>
                {ramos.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((ramo, index)=> {
                                    return(
                                        <tr key={ramo.id} 
                                            onDoubleClick={selected.bind(this, ramo)}
                                            onClick={selecionado.bind(this, index)}
                                            style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                            <td>{ramo.id}</td>
                                            <td>{ramo.descricao}</td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=> setModalCadastro(true)}><img src="/images/add.png"/> Novo</button>
                        {cadastroRamo ? (
                            <button><img src="/images/abrir.png"/>Abrir</button>
                        ): null}
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {modalCadastro ? <CadastroRamo close={()=> setModalCadastro(false)}/> : null}
            </M.Container>
        </M.Modal>
    )
}