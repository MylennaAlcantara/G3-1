<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { EditarNivel } from "../modal_editar_nivel";
import { CadastrarNivel } from "../modal_cadastro_nivel";
import { Loading } from "../../loading";

export const Nivel = ({setNivel, close, cadastroNivel}) => {
    const [niveis, setNiveis] = useState([]);
    const [modalEditarNivel, setModalEditarNivel] = useState(false);
    const [modalCadastrarNivel, setModalCadastrarNivel] = useState(false);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/nivel/all');
            const data = await response.json();
            setNiveis(data);
        }
        fetchData();
    },[])
    
    const selecionado = (nivel) => {
        setNivel({
            codigo: nivel.id,
            nome: nivel.descricao
        });
        close();
    }

    const [nivelSelecionado, setNivelSelecionado] = useState();
    const [dadosNivel, setDadosNivel] = useState([]);
    const [indexNivel, setIndexNivel] = useState(0);

    const selecionadoEditar = (nivel, index) => {
        localStorage.setItem('idNivel', nivel.id);
        setNivelSelecionado(localStorage.getItem("idNivel"));
        setIndexNivel(index);
    }

    const abrirEditar = async () => {
        const responseNivel = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/nivel/${nivelSelecionado}`);
        const nivel = await responseNivel.json();
        if(nivelSelecionado === undefined || nivelSelecionado === null){
            console.log('nenhum nivel selecionado');
        }else{
            setDadosNivel(nivel);
            setModalEditarNivel(true);
        }
    }

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Nível de Acesso</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input type="radio" name="filtro"/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input type="radio" name="filtro" checked/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar.."/>
                    </div>
                </M.Filtro>
                {niveis.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(niveis) && niveis.map((nivel, index) => {
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
                        {cadastroNivel ? (
                            <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                        ) : null}
                    </div>
                </C.Footer>
                {modalEditarNivel ? <EditarNivel close={()=> setModalEditarNivel(false)} dadosNivel={dadosNivel}/> : null}
                {modalCadastrarNivel ? <CadastrarNivel close={()=> setModalCadastrarNivel(false)} /> : null}
            </M.Container>
        </M.Modal>
    )
=======
import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { EditarNivel } from "../modal_editar_nivel";
import { CadastrarNivel } from "../modal_cadastro_nivel";
import { Loading } from "../../loading";

export const Nivel = ({setNivel, close, cadastroNivel}) => {
    const [niveis, setNiveis] = useState([]);
    const [modalEditarNivel, setModalEditarNivel] = useState(false);
    const [modalCadastrarNivel, setModalCadastrarNivel] = useState(false);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/nivel/all');
            const data = await response.json();
            setNiveis(data);
        }
        fetchData();
    },[])
    
    const selecionado = (nivel) => {
        setNivel({
            codigo: nivel.id,
            nome: nivel.descricao
        });
        close();
    }

    const [nivelSelecionado, setNivelSelecionado] = useState();
    const [dadosNivel, setDadosNivel] = useState([]);
    const [indexNivel, setIndexNivel] = useState(0);

    const selecionadoEditar = (nivel, index) => {
        localStorage.setItem('idNivel', nivel.id);
        setNivelSelecionado(localStorage.getItem("idNivel"));
        setIndexNivel(index);
    }

    const abrirEditar = async () => {
        const responseNivel = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/nivel/${nivelSelecionado}`);
        const nivel = await responseNivel.json();
        if(nivelSelecionado === undefined || nivelSelecionado === null){
            console.log('nenhum nivel selecionado');
        }else{
            setDadosNivel(nivel);
            setModalEditarNivel(true);
        }
    }

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Nível de Acesso</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input type="radio" name="filtro"/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input type="radio" name="filtro" checked/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar.."/>
                    </div>
                </M.Filtro>
                {niveis.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(niveis) && niveis.map((nivel, index) => {
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
                        {cadastroNivel ? (
                            <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                        ) : null}
                    </div>
                </C.Footer>
                {modalEditarNivel ? <EditarNivel close={()=> setModalEditarNivel(false)} dadosNivel={dadosNivel}/> : null}
                {modalCadastrarNivel ? <CadastrarNivel close={()=> setModalCadastrarNivel(false)} /> : null}
            </M.Container>
        </M.Modal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}