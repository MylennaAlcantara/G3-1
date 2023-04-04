import React, { useContext, useEffect, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CF from "./consultarFuncionario";
import * as CCL from "../consulta_cliente/consultaCliente";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";

export const ConsultarFuncionario = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');
    const {user, empresa} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/user/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);
    
    const novo = () => {
        navigate('/cadastrarFuncionario');
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Funcionários</h3>
            </C.Header>
            <CF.Filtro>
                <div>
                    <select className="empresa">
                        <option> 0 - TODAS</option>
                    </select>
                    <input type="checkbox"/>
                    <label>Motorista</label>
                    <label>Setor: </label>
                    <select className="setor-status">
                        <option> 0 - Todos</option>
                    </select>
                </div>
                <div>
                    <select>
                        <option>Código</option>
                    </select>
                    <input className="search" id="search" placeholder="Buscar..."/>
                    <label>Status: </label>
                    <select className="setor-status">
                        <option>TODOS</option>
                    </select>
                </div>
            </CF.Filtro>
            <CCL.Lista>
                <div className="table-responsive">
                    <table id="table" style={{margin: "0"}}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Fone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map( (user, index) => {
                                return(
                                    <tr 
                                        key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.nome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button><img src="/images/abrir.png"/>Abrir</button>
                    <button><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}