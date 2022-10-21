import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Top = ({onClose = () =>{}}) => {

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
                <label> Top</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>
            <div className="div-checkbox">
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> Código </label>
                        </div>
                        <div>
                            <input type="radio" className="checkbox"/>
                            <label> Descrição </label>
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
                            <th>Descrição</th>
                            <th>Nat. Operação</th>
                            <th>Mov. Est. reservado</th>
                            <th>MOv. Est. Real</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user) => {
                            return(
                                <tr >
                                    <td>{user.id}</td>
                                    <td>{user.cep}</td>
                                    <td>{user.cep}</td>
                                    <td>{user.cep}</td>
                                    <td>{user.cep}</td>                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};