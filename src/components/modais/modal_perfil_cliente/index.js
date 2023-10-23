import React, {useEffect, useRef, useState} from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { CadastroPerfil } from "../modal_cadastro_perfil/index";
import { Loading } from "../../loading/index";

export const PerfilCliente = ({close, cadastro, dadosCliente, setDadosCliente, minimizado, setMinimizado}) => {
    const [perfil, setPerfil] = useState([]);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [busca, setBusca] = useState('');

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/perfilRegra/all");
            const data = await response.json();
            setPerfil(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
        fetchData();
        document.getElementById("search").focus();
    }, []);


    function selected (perfil){
        setDadosCliente && setDadosCliente({
            ...dadosCliente,
            perfilRegra:{
                id: perfil.id,
                descricao: perfil.descricao
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
                setDadosCliente({
                    ...dadosCliente,
                    perfilRegra:{
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].descricao
                    }
                })
                close();
            }
        }
    };

    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.Modal style={{zIndex: minimizado && minimizado.perfil ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <label>Cadastro de Perfil</label>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, perfil: true})}}><div className="linha"/></button>
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
                {perfil.length === 0 && carregado === false ? (
                    <Loading/>
                ) : perfil.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
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
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
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
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=>setModalCadastro(true)}><img alt="" src="/images/add.png"/> Novo</button>
                        {cadastro && cadastro.perfil ? (
                            <button><img alt="" src="/images/abrir.png"/>Abrir</button>
                        ): null}
                        <button onClick={close}><img alt="" src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {modalCadastro ? <CadastroPerfil close = {()=> setModalCadastro(false)} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar}/> : null}
            </M.Container>
        </M.Modal>
    )
}