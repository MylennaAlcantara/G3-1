import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";

export const ListaMunicipio = ({close, setDadosCidades}) => {
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
            const data = await response.json();
            setMunicipios(data);
        }
            fetchData();
    }, []);

    function selecionado (municipio){
        setDadosCidades({
            codigo: municipio.id,
            nome: municipio.nome
        })
        close();
    }

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Lista de Municípios</label>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div className="div-search">
                        <label>Buscar: </label>
                        <input className="search" id="search" placeholder="Buscar"/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>UF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {municipios.map((municipio) => {
                                return(
                                    <tr key={municipio.id} onDoubleClick={selecionado.bind(this, municipio)}>
                                        <td>{municipio.id}</td>
                                        <td>{municipio.nome}</td>
                                        <td>{municipio.microrregiao.mesorregiao.UF.sigla}</td>
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