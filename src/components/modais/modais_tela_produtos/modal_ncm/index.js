import React, { useEffect, useState } from "react";
import * as M from "../../modal/modal";
import ncm from "../../../../ncm/Tabela_NCM_20230411.json";

export const Ncm = ({close}) => {
    const [busca, setBusca] = useState("");
    const [estados, setEstados] = useState([]);

    useEffect(()=> {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        fetchData();
    },[])

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Tabela NCM</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <label>Buscar: </label>
                        <select style={{height: "24px"}}>
                        </select>
                    </div>
                    <div className="div-search">
                    <input className="search" placeholder="Buscar..."/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>UF</th>
                                <th>NCM</th>
                                <th>Ex</th>
                                <th>Descrição</th>
                                <th>Ali1. Fed. Nac.</th>
                                <th>Aliq. Fed. Imp.</th>
                                <th>Aliq. Estadual</th>
                                <th>Aliq. Municipal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ncm.Nomenclaturas.map((ncm, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{ncm.index}</td>
                                        <td>{ncm.Descricao}</td>
                                        <td>{ncm.Codigo}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </M.Container>
        </M.Modal>
    )
}