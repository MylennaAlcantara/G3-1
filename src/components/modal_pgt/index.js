import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Pgt = ({onClose = () =>{}, setDataSelectPgt, setDataIdSelectPgt}) => {

    const [users, setUsers] = useState([]);
    const [selectPgt, setSelectPgt] = useState();
    const [selectIdPgt, setSelectIdPgt] = useState();

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8092/tipoPagamento/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
    }, []);

    const SelectedPgt = (user) => {
        setSelectPgt(user.descricao);
        setSelectIdPgt(user.id);
        setDataSelectPgt(user.descricao);
        setDataIdSelectPgt(user.id);
        onClose();
    };

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
                        {users.slice(0, 10).map( (user) => {
                            return(
                                <tr key={user.id} onDoubleClick={SelectedPgt.bind(this, user)} >
                                    <td>{user.id}</td>
                                    <td>Sim</td>
                                    <td>{user.descricao}</td>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};