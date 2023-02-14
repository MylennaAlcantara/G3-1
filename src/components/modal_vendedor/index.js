import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Saler = ({onClose = () =>{}, setDataSelectSaler, setDataIdSelectSaler}) => {

    const [users, setUsers] = useState([]);
    const [selectSaler, setSelectSaler] = useState();
    const [selectIdSaler, setSelectIdSaler] = useState();
    const [busca, setBusca] = useState('');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8099/user/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedSaler = (user) => {
        setSelectSaler(user.nome);
        setSelectIdSaler(user.id);
        setDataSelectSaler(user.nome);
        setDataIdSelectSaler(user.id);
        onClose();
    };

    // Filtro de Busca
    const resultado = Array.isArray(users) && users.filter((user) => user.nome.toLowerCase().includes(busca))
    console.log(busca)

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
                        <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)}/>
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
                        {resultado.slice(0,10).map( (user) => {
                            return(
                                <tr key={user.id} onDoubleClick={SelectedSaler.bind(this, user)} >
                                    <td>{user.id}</td>
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