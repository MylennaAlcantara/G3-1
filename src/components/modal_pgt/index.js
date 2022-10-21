import React, {useEffect, useState} from "react";
import {Container, Header, Modal} from './../modal/modal.js';


export const Pgt = ({onClose = () =>{}}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.46:8090/clientes");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    return(
        <Modal>
            <Container>
            <Header>
                <label>Cadastro Tipo de Pagamento</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
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
                                <tr >
                                    <td>{user.id}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                    <td>{user.estado}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};