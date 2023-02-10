import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Top = ({onClose = () =>{}, setDataSelectTop, setDataIdSelectTop}) => {

    const [users, setUsers] = useState([]);
    const [selectTop, setSelectTop] = useState();
    const [selectIdTop, setSelectIdTop] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8099/clientes");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedTop = (user) => {
        setSelectTop(user.cep);
        setSelectIdTop(user.id);
        setDataSelectTop(user.cep);
        setDataIdSelectTop(user.id);
        onClose();
    };

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
                        {users.slice(0, 10).map( (user) => {
                            return(
                                <tr key={user.id} onDoubleClick={SelectedTop.bind(this, user)} >
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