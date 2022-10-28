import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Emitente = ({onClose = () =>{}, setDataSelectEmitente, setDataIdSelectEmitente}) => {

    const [users, setUsers] = useState([]);
    const [selectEmitente, setSelectEmitente] = useState();
    const [selectIdEmitente, setSelectIdEmitente] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.46:8099/clientes");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedEmitente = (user) => {
        setSelectEmitente(user.nome);
        setSelectIdEmitente(user.id);
        setDataSelectEmitente(user.nome);
        setDataIdSelectEmitente(user.id);
        onClose();
        
    };

    return(
        <Modal>
            <Container>
            <Header>
                <label>Cadastro Emitente</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
                <Filtro>
                    <div className="div-checkbox">
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> Código </label>
                            <input type="radio" className="checkbox"/>
                            <label> R. Social </label>                            
                        </div>
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> N. Fantasia </label>
                            <input type="radio" className="checkbox"/>
                            <label> N.Documento </label>                            
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar"/>
                    </div>
                </Filtro>
                <table id="table" >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome Fantasia</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Município</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user) => {
                            return(
                                <tr key={user.id} onClick={SelectedEmitente.bind(this, user)}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.nome}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};