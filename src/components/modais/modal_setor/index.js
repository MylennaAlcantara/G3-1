import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { CadastroSetor } from "../modal_cadastro_setor";
import { EditarSetor } from "../modal_editar_setor";

export const Setor = ({setSetor, close, cadastroSetor}) => {
    const [setores, setSetores] = useState([]);
    const [modalNovoSetor, setModalNovoSetor] = useState(false);
    const [modalEditarSetor, setModalEditarSetor] = useState(false);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/all');
            const data = await response.json();
            setSetores(data);
        }
        fetchData();
    },[])
    
    const selecionado = (setor) => {
        setSetor({
            codigo: setor.id,
            nome: setor.descricao,
            operador: setor.operadorDeCaixa
        });
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

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Setor de Funcionário</h3>
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
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=> setModalNovoSetor(true)}><img src="/images/add.png"/>Novo</button>
                        {cadastroSetor ? (<button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>) : null}
                    </div>
                </C.Footer>
                {modalNovoSetor ? <CadastroSetor close={()=> setModalNovoSetor(false)}/> : null}
                {modalEditarSetor ? <EditarSetor close={()=> setModalEditarSetor(false)} dadosSetor={dadosSetor} /> : null}
            </M.Container>
        </M.Modal>
    )
}