import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Emitente = ({onClose = () =>{}, setDataSelectEmitente, setDataIdSelectEmitente}) => {

    const [users, setUsers] = useState([]);
    const [selectEmitente, setSelectEmitente] = useState();
    const [selectIdEmitente, setSelectIdEmitente] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.94:8092/emitente/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedEmitente = (user) => {
        setSelectEmitente(user.razao_social);
        setSelectIdEmitente(user.id);
        setDataSelectEmitente(user.razao_social);
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
                        {users.slice(0, 20).map( (user) => {
                            return(
                                <tr key={user.id} onDoubleClick={SelectedEmitente.bind(this, user)}>
                                    <td>{user.id}</td>
                                    <td>{user.nome_fantasia}</td>
                                    <td>{user.razao_social}</td>
                                    <td>{user.cnpj}</td>
                                    <td>{user.municipio}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};