import React, { useEffect, useRef, useState } from "react";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading";
import * as M from "../modal/modal";
import { CadastroSetor } from "../modal_cadastro_setor";
import { EditarSetor } from "../modal_editar_setor";

export const Setor = ({setSetor, close, cadastro, minimizado, setMinimizado, setDadosFuncionario, dadosFuncionario}) => {
    const [setores, setSetores] = useState([]);
    const [modalNovoSetor, setModalNovoSetor] = useState(false);
    const [modalEditarSetor, setModalEditarSetor] = useState(false);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    async function fetchData (){
        const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+'/setorFuncionario/all');
        const data = await response.json();
        setSetores(data);
        if( response.status === 200){
            setCarregado(true);
        }
    }
    useEffect(()=> {
        fetchData();
        document.getElementById("search").focus();
    },[])
    
    const selecionado = (setor) => {
        setSetor && setSetor({
            codigo: setor.id,
            nome: setor.descricao,
            operador: setor.operadorDeCaixa
        });
        setDadosFuncionario && setDadosFuncionario({
            ...dadosFuncionario,
            setorFuncionario: {
                id: setor.id,
                descricao: setor.descricao,
                operadorDeCaixa: setor.operadorDeCaixa
            }
        })
        close();
    }
    var setorSelecionado = null;
    const [dadosSetor, setDadosSetor] = useState([]);
    const [indexSetor, setIndexSetor] = useState(-1);
    const tableRef = useRef(null);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] =  useState("descricao");

    const resultado = Array.isArray(setores) && setores.filter((setor)=> {
        if(filtro === "descricao"){
            return String(setor.descricao).toLowerCase().includes(busca.toLowerCase());
        } else {
            return String(setor.id).toLowerCase().includes(busca.toLowerCase());
        }
    })

    const handleFiltro = (e) => {
        setFiltro(e.target.value);
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            e.preventDefault();
            if (indexSetor === null || indexSetor === 0) {
                return;
            }
            setIndexSetor(indexSetor - 1);
        } else if (e.keyCode === 40) {
            e.preventDefault();
            if (indexSetor === null || indexSetor === resultado.length - 1) {
                return;
            }
            setIndexSetor(indexSetor + 1);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if(setores.length > 0){
                selecionadoEditar(resultado[indexSetor], indexSetor);
                abrirEditar();
            }else{
                fetchData();
            }
        }
    };

    const selecionadoEditar = (setor, index) => {
        localStorage.setItem('idSetor', setor.id);
        setorSelecionado = setor.id;
        setIndexSetor(index);
    }

    const abrirEditar = async () => {
        const responseSetor = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+`/setorFuncionario/${setorSelecionado}`);
        const setor = await responseSetor.json();
        if(setorSelecionado === undefined || setorSelecionado === null){
            console.log('nenhum setor selecionado');
        }else{
            setDadosSetor(setor);
            setModalEditarSetor(true);
        }
    }
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.Modal style={{zIndex: minimizado && minimizado.setor === true ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <h3>Setor de Funcionário</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, setor: true})}}><div className="linha"/></button>
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
                {setores.length === 0 && carregado === false ? (
                    <Loading/>
                ) : setores.length === 0 && carregado ? (
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
                                {Array.isArray(resultado) && resultado.map((setor, index) => {
                                    return(
                                        <tr key={setor.id} 
                                            onDoubleClick={selecionado.bind(this, setor)}
                                            onClick={selecionadoEditar.bind(this, setor, index)}
                                            style={{background: index === indexSetor ? '#87CEFA' : ""}}>
                                            <td>{setor.id}</td>
                                            <td>{setor.descricao}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=> setModalNovoSetor(true)}><img src="/images/add.png"/>Novo</button>
                        {cadastro.setor ? (<button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>) : null}
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {modalNovoSetor ? <CadastroSetor close={()=> setModalNovoSetor(false)} listar={fetchData} minimizado={minimizado} setMinimizado = {setMinimizado} setMinimizar={setMinimizar} minimizar={minimizar}/> : null}
                {modalEditarSetor ? <EditarSetor close={()=> setModalEditarSetor(false)} listar={fetchData} dadosSetor={dadosSetor} minimizado={minimizado} setMinimizado = {setMinimizado} setMinimizar={setMinimizar} minimizar={minimizar}/> : null}
            </M.Container>
        </M.Modal>
    )
}