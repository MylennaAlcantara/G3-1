<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import * as M from "../../modal/modal";
import ncm from "../../../../ncm/Tabela_NCM.json";

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

    const [filtroEscolhido, setFiltroEscolhido] = useState('todos'); 
    const selectFiltro = document.getElementById('filtro');

    const resultado2 = ncm.filter((ncm)=>{
        if(filtroEscolhido === "AL"){
           return ncm.uf === "AL";
        }else if(filtroEscolhido === "PA"){
            return ncm.uf === "PA"; 
        }else if(filtroEscolhido === "PB"){
            return ncm.uf === "PB"; 
        }else if(filtroEscolhido === "PE"){
            return ncm.uf === "PE"; 
        }else if(filtroEscolhido === "RN"){
            return ncm.uf === "RN"; 
        }else{
            return ncm;
        }
    })
    
    const resultado = resultado2.filter((ncm)=> {
        if(filtroEscolhido === "todos"){
            return ncm;
        }else if(busca === ""){
            return resultado2;
        }else{
            return ncm.codigo === Number(busca);
        }
    })

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
                        <select id="filtro" onChange={()=> setFiltroEscolhido(selectFiltro.value)} style={{height: "24px"}}>
                            <option value="todos">Todos</option>
                            <option value="AL">AL</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PE">PE</option>
                            <option value="RN">RN</option>
                        </select>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar..." value={busca} onChange={(e)=> setBusca(e.target.value)}/>
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
                            {resultado.map((ncm, index)=>{
                                return(
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>{ncm.uf}</td>
                                        <td>{ncm.codigo}</td>
                                        <td>{ncm.ex}</td>
                                        <td>{ncm.descricao}</td>
                                        <td>{ncm.nacionalfederal}</td>
                                        <td>{ncm.importadosfederal}</td>
                                        <td>{ncm.estadual}</td>
                                        <td>{ncm.municipal}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </M.Container>
        </M.Modal>
    )
=======
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
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}