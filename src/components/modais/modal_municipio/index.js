import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import { Loading } from "../../loading/index";

export const ListaMunicipio = ({close, setDadosCliente,dadosCliente}) => {
    const [municipios, setMunicipios] = useState([]);
    const [busca, setBusca] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
            const data = await response.json();
            setMunicipios(data);
        }
            fetchData();
    }, []);

    function selecionado (municipio){
        setDadosCliente({
            ...dadosCliente,
            cod_municipio: municipio.id,
            municipio: municipio.nome
        })
        close();
    }
    const resultado = Array.isArray(municipios) && municipios.filter((municipio) => municipio.nome.toLowerCase().includes(busca));

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
                        <input className="search" id="search" placeholder="Buscar" value={busca} onChange={(e)=> setBusca(e.target.value)}/>
                    </div>
                </M.Filtro>
                {municipios.length === 0 ? (
                    <Loading/>
                ) : (
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
                                {resultado.map((municipio) => {
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
                )}
            </M.Container>
        </M.Modal>
    )
}