import React, { useEffect, useRef, useState } from "react";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading";
import * as M from "../modal/modal";
import { CadastrarNivel } from "../modal_cadastro_nivel";
import { EditarNivel } from "../modal_editar_nivel";

export const Nivel = ({setNivel, close, cadastro, minimizado, setMinimizado, setDadosFuncionario, dadosFuncionario}) => {
    const [niveis, setNiveis] = useState([]);
    const [modalEditarNivel, setModalEditarNivel] = useState(false);
    const [modalCadastrarNivel, setModalCadastrarNivel] = useState(false);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    async function fetchData (){
        const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/nivel/all');
        const data = await response.json();
        setNiveis(data);
        if( response.status === 200){
            setCarregado(true);
        }
    }
    useEffect(()=> {
        fetchData();
        document.getElementById("search").focus();
    },[])
    
    const selecionado = (nivel) => {
        setNivel && setNivel({
            codigo: nivel.id,
            nome: nivel.descricao
        });
        setDadosFuncionario && setDadosFuncionario({
            ...dadosFuncionario,
            nivelAcesso: {
                id: nivel.id,
                descricao: nivel.descricao
            }
        });
        close();
    }

    var nivelSelecionado = null;
    const [dadosNivel, setDadosNivel] = useState([]);
    const [indexNivel, setIndexNivel] = useState(-1);
    const [busca, setBusca] = useState(""); 
    const tableRef = useRef(null);
    const [filtro, setFiltro] =  useState("descricao");

    const resultado = Array.isArray(niveis) && niveis.filter((nivel)=> {
        if(filtro === "descricao"){
            return String(nivel.descricao).toLowerCase().includes(busca.toLowerCase());
        } else {
            return String(nivel.id).toLowerCase().includes(busca.toLowerCase());
        }
    })

    const handleFiltro = (e) => {
        setFiltro(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            e.preventDefault();
            if (indexNivel === null || indexNivel === 0) {
                return;
            }
            setIndexNivel(indexNivel - 1);
        } else if (e.keyCode === 40) {
            e.preventDefault();
            if (indexNivel === null || indexNivel === resultado.length - 1) {
                return;
            }
            setIndexNivel(indexNivel + 1);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if(niveis.length > 0){
                selecionadoEditar(resultado[indexNivel], indexNivel);
                abrirEditar();
            }else{
                fetchData();
            }
        }
    };

    const selecionadoEditar = (nivel, index) => {
        localStorage.setItem('idNivel', nivel.id);
        nivelSelecionado = nivel.id;
        setIndexNivel(index);
    }

    const abrirEditar = async () => {
        const responseNivel = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+`/nivel/${nivelSelecionado}`);
        const nivel = await responseNivel.json();
        if(nivelSelecionado === undefined || nivelSelecionado === null){
            console.log('nenhum nivel selecionado');
        }else{
            setDadosNivel(nivel);
            setModalEditarNivel(true);
        }
    }
    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.Modal style={{zIndex: minimizado && minimizado.nivel === true ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <h3>Nível de Acesso</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, nivel: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input type="radio" name="filtro" value="codigo" onChange={handleFiltro} checked={filtro === "codigo" ? true : false}/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input type="radio" name="filtro" value="descricao" onChange={handleFiltro} checked={filtro === "descricao" ? true : false}/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar.." value={busca} onChange={(e)=> setBusca(e.target.value)} onKeyDown={handleKeyDown} autoFocus/>
                    </div>
                </M.Filtro>
                {niveis.length === 0 && carregado === false ? (
                    <Loading/>
                ) : niveis.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table">
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
                        <table className="table" ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(resultado) && resultado.map((nivel, index) => {
                                    return(
                                        <tr key={nivel.id} 
                                            onDoubleClick={selecionado.bind(this, nivel)}
                                            onClick={selecionadoEditar.bind(this, nivel, index)}
                                            style={{background: index === indexNivel ? '#87CEFA' : ""}}>
                                            <td>{nivel.id}</td>
                                            <td>{nivel.descricao}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=> setModalCadastrarNivel(true)}><img src="/images/add.png"/>Novo</button>
                        {cadastro.nivel ? (
                            <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                        ) : null}
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {modalEditarNivel ? <EditarNivel close={()=> setModalEditarNivel(false)} dadosNivel={dadosNivel} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar}/> : null}
                {modalCadastrarNivel ? <CadastrarNivel close={()=> setModalCadastrarNivel(false)} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar} /> : null}
            </M.Container>
        </M.Modal>
    )
}