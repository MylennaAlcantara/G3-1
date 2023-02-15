import React, {useEffect, useState, useRef} from "react";
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
    const resultado = Array.isArray(users) && users.filter((user) => user.nome.toLowerCase().includes(busca));

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const handleKeyDown = (e) => {
        if(e.keyCode === 38){
            e.preventDefault();
            if(selectIndex === null || selectIndex === 0){
                return;
            }
            setSelectIndex(selectIndex-1);
        }else if (e.keyCode === 40){
            e.preventDefault();
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                setSelectSaler(resultado[selectIndex].nome);
                setSelectIdSaler(resultado[selectIndex].id);
                setDataSelectSaler(resultado[selectIndex].nome);
                setDataIdSelectSaler(resultado[selectIndex].id);
                onClose();
            }
        }
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
                        <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>                
            </Filtro>
                <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tableRef={0} >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Fone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.slice(0,10).map( (user, index) => {
                            return(
                                <tr 
                                    key={user.id} 
                                    onDoubleClick={SelectedSaler.bind(this, user)} 
                                    style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
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