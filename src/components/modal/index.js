import React, { useEffect, useState, useRef } from "react";
import * as C from './modal.js';
import "../cadastro/index.js";


export const Modal = ({ onClose = () => {}, focoCampoSeguinte, setDataSelectPartner, setDataIdSelectPartner, setParceiroAlterado }) => {

    const [users, setUsers] = useState([]);
    const [selectPartner, setSelectPartner] = useState();
    const [selectIdPartner, setSelectIdPartner] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('nome');
    

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://rickandmortyapi.com/api/character");
            const data = await response.json();
            setUsers(data.results);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const Selected = (user) => {
        setSelectPartner(user.name);
        setSelectIdPartner(user.id)
        setDataSelectPartner(user.name);
        setDataIdSelectPartner(user.id);
        onClose();
        focoCampoSeguinte();
        setParceiroAlterado();
    };

    //Filtro de busca
    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'codigo'){
            return user.id === Number(busca);
        }else if(filtro === 'municipio'){
            return user.municipio.toLowerCase().includes(busca);
        }else if(filtro === 'cpf'){
            return user.type.toLowerCase().includes(busca);
        }else if(filtro === 'nome'){
            return user.name.toLowerCase().includes(busca);
        }else if(filtro === 'fantasia'){
            return user.species.toLowerCase().includes(busca);
        }else if(filtro === 'rg'){
            return user.type.toLowerCase().includes(busca);
        }
    });
    
    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (user, index) => {
        setSelectIndex(index);
    }

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
                setSelectPartner(resultado[selectIndex].name);
                setSelectIdPartner(resultado[selectIndex].id)
                setDataSelectPartner(resultado[selectIndex].name);
                setDataIdSelectPartner(resultado[selectIndex].id);
                onClose();
                focoCampoSeguinte();
                setParceiroAlterado();
            }
        }
    };

    return(
        <C.Modal>            
            <C.Container>
                <C.Header>
                    <label>Cadastro Parceiros</label>
                    <button className="close" onClick={onClose}>X</button>
                </C.Header>
                <C.Filtro>
                    <div className="div-checkbox">
                        <div>
                            <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange}/>
                            <label> Código </label>
                            <input type="radio" value="municipio" className="checkbox" name="checkbox" checked={filtro === 'municipio'} onChange={handleFiltroChange}/>
                            <label> Município </label>
                            <input type="radio" value="cpf" className="checkbox" name="checkbox" checked={filtro === 'cpf'} onChange={handleFiltroChange}/>
                            <label> CPF </label>
                        </div>
                        <div>
                            <input type="radio" value="nome" className="checkbox" name="checkbox" checked={filtro === 'nome'} onChange={handleFiltroChange}/>
                            <label> Nome </label>
                            <input type="radio" value="fantasia" className="checkbox" name="checkbox" checked={filtro === 'fantasia'} onChange={handleFiltroChange}/>
                            <label> Fantasia </label>
                            <input type="radio" value="rg" className="checkbox" name="checkbox" checked={filtro === 'rg'} onChange={handleFiltroChange}/>
                            <label> RG </label>
                        </div>
                    </div>
                    <div className="div-search">
                        <div>
                            <input type="radio" className="checkbox-search"/>
                            <label>Ativos</label>
                            <input type="radio" className="checkbox-search"/>
                            <label>Desativados</label>
                            <input type="radio" className="checkbox-search"/>
                            <label>Geral</label>
                        </div>
                        <input className="search" id="search" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>                    
                </C.Filtro>
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
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
                            {resultado.map( (user, index) => {
                                return(
                                    <tr 
                                        key={user.id} 
                                        onClick={selecionado.bind(this, user, index)}
                                        onDoubleClick={Selected.bind(this, user)}
                                        style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.status}</td>
                                            <td>{user.species}</td>
                                            <td>{user.type}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.status}</td>
                                            <td>{user.status}</td>
                                            <td>{user.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </C.Container>
        </C.Modal>
    );
    
};

