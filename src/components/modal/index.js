import React, { useEffect, useState } from "react";
import * as C from './modal.js';
import "../cadastro/index.js";

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

    const Selected = (user) => {
        setSelect(user.name);
    };

    return(
        <C.Modal>
            <C.Container>
                <C.Header>
                    <label>Cadastro Parceiros</label>
                    <button className="close" onClick={onClose}>X</button>
                </C.Header>
                <C.Filtro>
                    <div className="div-checkbox">
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> Código </label>
                            <input type="radio" className="checkbox"/>
                            <label> Município </label>
                            <input type="radio" className="checkbox"/>
                            <label> CPF </label>
                        </div>
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> Nome </label>
                            <input type="radio" className="checkbox"/>
                            <label> Fantasia </label>
                            <input type="radio" className="checkbox"/>
                            <label> RG </label>
                        </div>
                    </div>
                    <div className="div-search">
                        <div>
                            <input type="radio" className="checkbox-search"/>
                            <label>Ativos</label>
                            <input type="radio" className="checkbox-search"/>
                            <label>Desativados</label>
                            <input type="radio" className="checkbox-search"/>
                            <label>Geral</label>
                        </div>
                        <input className="search" placeholder={select}/>
                    </div>                    
                </C.Filtro>
                
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
                                <tr key={user.id} onClick={Selected.bind(this, user)}>
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

