import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Emitente = ({onClose = () =>{}, setDataSelectEmitente, setDataIdSelectEmitente}) => {

    const [users, setUsers] = useState([]);
    const [selectEmitente, setSelectEmitente] = useState();
    const [selectIdEmitente, setSelectIdEmitente] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('fantasia');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8092/emitente/all");
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

    // Filtro de busca
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'social'){
            return user.razao_social.toLowerCase().includes(busca);
        }else if(filtro === 'codigo'){
            return user.id === Number(busca);
        }else if(filtro === 'documento'){
            return user.cnpj === Number(busca);
        }else if(filtro === 'fantasia'){
            return user.nome_fantasia.toLowerCase().includes(busca);
        }
    })

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
                            <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange}/>
                            <label> Código </label>
                            <input type="radio" value="social" className="checkbox" name="checkbox" checked={filtro === 'social'} onChange={handleFiltroChange}/>
                            <label> R. Social </label>                            
                        </div>
                        <div>
                            <input type="radio" value="fantasia" className="checkbox" name="checkbox" checked={filtro === 'fantasia'} onChange={handleFiltroChange}/>
                            <label> N. Fantasia </label>
                            <input type="radio" value="documento" className="checkbox" name="checkbox" checked={filtro === 'documento'} onChange={handleFiltroChange}/>
                            <label> N.Documento </label>                            
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
                            <th>Nome Fantasia</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Município</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.slice(0, 20).map( (user) => {
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