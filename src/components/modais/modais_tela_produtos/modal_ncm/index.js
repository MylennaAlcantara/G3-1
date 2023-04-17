import React, { useEffect, useState } from "react";
import * as M from "../../modal/modal";

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
                            {estados.map((estado)=>{
                                return <option value={estado.sigla}>{estado.sigla}</option>
                            })}
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
                        </tbody>
                    </table>
                </div>
            </M.Container>
        </M.Modal>
    )
}