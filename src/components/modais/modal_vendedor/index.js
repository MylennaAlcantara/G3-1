import React, {useEffect, useState, useRef} from "react";
import { Loading } from "../../loading/index.js";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Saler = ({onClose = () =>{setIsModalFuncionario(false)},setIsModalFuncionario, focoCampoSeguinte, setDataSelectSaler, setDataIdSelectSaler, setVendedorAlterado, setDadosFornecedor, dadosFornecedor, dadosRotina, setDadosRotina}) => {

    const [users, setUsers] = useState([]);
    const [selectSaler, setSelectSaler] = useState();
    const [selectIdSaler, setSelectIdSaler] = useState();
    const [busca, setBusca] = useState('');

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/user/all");
            const data = await response.json();
            setUsers(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const SelectedSaler = (user) => {
        setSelectSaler(user.nome);
        setSelectIdSaler(user.id);
        setDataSelectSaler && setDataSelectSaler(user.nome);
        setDataIdSelectSaler && setDataIdSelectSaler(user.id);
        setDadosFornecedor && setDadosFornecedor({
            ...dadosFornecedor,
            id_comprador: user.id,
            nome_comprador: user.nome,
        });
        setDadosRotina && setDadosRotina({
            ...dadosRotina,
            vendedor: {
                id: user.id,
                descricao: user.nome
            }
        })
        onClose();
        focoCampoSeguinte();
        setVendedorAlterado(true);
    };

    

    // Filtro de Busca
    const resultado = Array.isArray(users) && users.filter((user) => user.nome.toLowerCase().includes(busca));

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (item,index) => {
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
                setSelectSaler(resultado[selectIndex].nome);
                setSelectIdSaler(resultado[selectIndex].id);
                setDataSelectSaler(resultado[selectIndex].nome);
                setDataIdSelectSaler(resultado[selectIndex].id);
                setDadosFornecedor && setDadosFornecedor({
                    ...dadosFornecedor,
                    id_comprador: resultado[selectIndex].id,
                    nome_comprador: resultado[selectIndex].nome,
                });
                setDadosRotina && setDadosRotina({
                    ...dadosRotina,
                    vendedor: {
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].nome
                    }
                })
                onClose();
                focoCampoSeguinte();
                setVendedorAlterado(true);
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
                    Buscar: 
                    <div className="div-search">
                        <input className="search" id='search' placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>                
            </Filtro>
            {users.length === 0 && carregado === false ? (
                <Loading/>
            ) : users.length === 0 && carregado ? (
                <div className="table-responsive">
                    <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Fone</th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold"}}>
                        Não Existem dados a serem exibidos!
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0} >
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
                                        onClick={selecionado.bind(this, user, index)}
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
                </div>
            )}
            </Container>
        </Modal>
    );
};