import React, { useEffect, useState } from "react";
import * as C from './modal.js';
import "../cadastro/index.js";
import { event } from "jquery";

export const Modal = ({ onClose = () => {} }) => {

    const [users, setUsers] = useState([]);
    const [select, setSelect] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://rickandmortyapi.com/api/character");
            const data = await response.json();
            setUsers(data.results);
        }
            fetchData();
    }, []);

    function Selected () {
        const item = event.target.value;
        setSelect(item);
    };

    return(
        <C.Modal>
            <C.Container>
                <C.Header>
                    <label>Cadastro Parceiros</label>
                    <button className="close" onClick={onClose}>X</button>
                </C.Header>
                <input/>
                
                <table id="table" >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data Cadastro</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Documento</th>
                            <th>Endereço</th>
                            <th>CEP</th>
                            <th>Município</th>
                            <th>Telefone</th>
                            <th>Celular</th>
                            <th>Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user) => {
                            return(
                                <tr key={user} onClick={Selected}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.status}</td>
                                    <td>{user.species}</td>
                                    <td>{user.type}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.status}</td>
                                    <td>{user.status}</td>
                                    <td>{user.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </C.Container>
        </C.Modal>
    );
};