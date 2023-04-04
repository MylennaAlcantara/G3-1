import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";

export const Nivel = ({setNivel, close}) => {
    const [niveis, setNiveis] = useState([]);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch('http://8b38091fc43d.sn.mynetname.net:2003/nivel/all');
            const data = await response.json();
            setNiveis(data);
        }
        fetchData();
    },[])
    
    const selecionado = (setor) => {
        setNivel({
            codigo: setor.id,
            nome: setor.descricao
        });
        close();
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
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(niveis) && niveis.map((setor) => {
                                return(
                                    <tr key={setor.id} onDoubleClick={selecionado.bind(this, setor)}>
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
                        <button><img src="/images/add.png"/>Novo</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.Modal>
    )
}