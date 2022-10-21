import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


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
                <label>Tipo Pagamento</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>                        
                <div className="div-search">
                    <label>Buscar: </label>                    
                    <input className="search" placeholder="Buscar"/>
                </div>                
            </Filtro>
                <table id="table" >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Ativo</th>
                            <th>Descrição</th>
                            <th>Raiz</th>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};