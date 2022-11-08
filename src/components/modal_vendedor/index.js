import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Saler = ({onClose = () =>{}, setDataSelectSaler, setDataIdSelectSaler}) => {

    const [users, setUsers] = useState([]);
    const [selectSaler, setSelectSaler] = useState();
    const [selectIdSaler, setSelectIdSaler] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8099/clientes");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedSaler = (user) => {
        setSelectSaler(user.endereco);
        setSelectIdSaler(user.id);
        setDataSelectSaler(user.endereco);
        setDataIdSelectSaler(user.id);
        onClose();
    };

    return(
        <Modal>
            <Container>
            <Header>
                <label>Lista de Funcionários</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>
            <div className="div-checkbox">
                        <div>
                            <input type="radio" className="checkbox"/>
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
                            <th>Nome</th>
                            <th>Fone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user) => {
                            return(
                                <tr key={user.id} onClick={SelectedSaler.bind(this, user)} >
                                    <td>{user.id}</td>
                                    <td>{user.endereco}</td>
                                    <td>{user.endereco}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};