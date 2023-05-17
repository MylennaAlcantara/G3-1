import React, {useEffect, useRef, useState} from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading/index";

export const PerfilMovimentacao = ({close, setDadosTop, dadosTop, minimizado, setMinimizado}) => {
    const [perfil, setPerfil] = useState([]);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [busca, setBusca] = useState('');

    
    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/perfilMov/all");
            const data = await response.json();
            setPerfil(data);
        }
        fetchData();
        document.getElementById("search").focus();
    }, []);


    function selected (perfil){
        setDadosTop && setDadosTop({
            ...dadosTop,
            perfilMovimentacao:{
                id: perfil.id,
                descricao: perfil.descricao,
                usado_norm_entre_filiais: perfil.usado_norm_entre_filiais
            }
        })
        close();
    }
    // Filtro de busca
    const [filtro, setFiltro] = useState('descricao');
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    const resultado = Array.isArray(perfil) && perfil.filter((perfil) => {
        if(filtro === 'descricao'){
            return perfil.descricao.toLowerCase().includes(busca);
        }else if(filtro === 'id'){
            return String(perfil.id).toLowerCase().includes(busca);
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
                setDadosTop({
                    ...dadosTop,
                    perfilRegra:{
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].descricao,
                        usado_norm_entre_filiais: resultado[selectIndex].usado_norm_entre_filiais
                    }
                })
                close();
            }
        }
    };

    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.Modal style={{zIndex: minimizado && minimizado.perfilMov ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <label>Cadastro de Perfil de Movimentação</label>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, perfilMov: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input name="checkbox" type="radio" value="id" checked={filtro==='id'} onChange={handleFiltroChange}/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input name="checkbox" type="radio" value="descricao" checked={filtro === 'descricao'} onChange={handleFiltroChange}/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                </M.Filtro>
                {perfil.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Usado entre filiais</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((perfil, index)=> {
                                    return(
                                        <tr key={perfil.id} 
                                            onDoubleClick={selected.bind(this, perfil)}
                                            onClick={selecionado.bind(this, index)}
                                            style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                            <td>{perfil.id}</td>
                                            <td>{perfil.descricao}</td>
                                            <td>{perfil.usado_norm_entre_filiais ? "SIM" : "NÃO"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=>setModalCadastro(true)}><img src="/images/add.png"/> Novo</button>
                        <button><img src="/images/abrir.png"/>Abrir</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.Modal>
    )
}