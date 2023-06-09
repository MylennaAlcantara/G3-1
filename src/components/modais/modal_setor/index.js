import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { CadastroSetor } from "../modal_cadastro_setor";
import { EditarSetor } from "../modal_editar_setor";
import { Loading } from "../../loading";

export const Setor = ({setSetor, close, cadastro, minimizado, setMinimizado, setDadosFuncionario, dadosFuncionario}) => {
    const [setores, setSetores] = useState([]);
    const [modalNovoSetor, setModalNovoSetor] = useState(false);
    const [modalEditarSetor, setModalEditarSetor] = useState(false);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/all');
            const data = await response.json();
            setSetores(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
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
    const [setorSelecionado, setSetorSelecionado] = useState();
    const [dadosSetor, setDadosSetor] = useState([]);
    const [indexSetor, setIndexSetor] = useState(0);

    const selecionadoEditar = (setor, index) => {
        localStorage.setItem('idSetor', setor.id);
        setSetorSelecionado(localStorage.getItem("idSetor"));
        setIndexSetor(index);
    }

    const abrirEditar = async () => {
        const responseSetor = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/${setorSelecionado}`);
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
                            <input type="radio" name="filtro"/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input type="radio" name="filtro" checked/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar.."/>
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(setores) && setores.map((setor, index) => {
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
                {modalNovoSetor ? <CadastroSetor close={()=> setModalNovoSetor(false)} minimizado={minimizado} setMinimizado = {setMinimizado} setMinimizar={setMinimizar} minimizar={minimizar}/> : null}
                {modalEditarSetor ? <EditarSetor close={()=> setModalEditarSetor(false)} dadosSetor={dadosSetor} minimizado={minimizado} setMinimizado = {setMinimizado} setMinimizar={setMinimizar} minimizar={minimizar}/> : null}
            </M.Container>
        </M.Modal>
    )
}