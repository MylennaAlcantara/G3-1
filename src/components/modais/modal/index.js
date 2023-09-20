import React, { useEffect, useState, useRef, useContext } from "react";
import * as C from '../modal/modal';
import "../../cadastro/index.js";
import { Loading } from "../../loading/index";
import { AuthContext } from "../../../contexts/Auth/authContext";


export const Modal = ({ onClose = () => {}, focoCampoSeguinte, setDataSelectPartner, setDataIdSelectPartner, setParceiroAlterado, dadosRotina, setDadosRotina }) => {
    const {dataMask, cnpjMask, cepMask} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectPartner, setSelectPartner] = useState();
    const [selectIdPartner, setSelectIdPartner] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('nome');
    
    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/clientes");
            const data = await response.json();
            setUsers(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
            fetchData();
            document.getElementById('search').focus();
        }, []);

    const Selected = (user) => {
        setSelectPartner(user.nome);
        setSelectIdPartner(user.id)
        setDataSelectPartner(user.nome);
        setDataIdSelectPartner(user.id);
        setDadosRotina && setDadosRotina({
            ...dadosRotina,
            parceiro: {
                id: user.id,
                descricao: user.nome
            }
        })
        onClose();
        focoCampoSeguinte();
        setParceiroAlterado(true);
    };

    //Filtro de busca
    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'codigo'){
            return String(user.id).toLowerCase().includes(busca);
        }else if(filtro === 'municipio'){
            return user.municipio.toLowerCase().includes(busca);
        }else if(filtro === 'cpf'){
            return String(user.cpf_cnpj).toLowerCase().includes(busca);
        }else if(filtro === 'nome'){
            return user.nome.toLowerCase().includes(busca);
        }else if(filtro === 'nome_fantasia'){
            return user.nome_fantasia.toLowerCase().includes(busca);
        }else if(filtro === 'rg'){
            return String(user.rg).toLowerCase().includes(busca);
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
                setSelectPartner(resultado[selectIndex].nome);
                setSelectIdPartner(resultado[selectIndex].id)
                setDataSelectPartner(resultado[selectIndex].nome);
                setDataIdSelectPartner(resultado[selectIndex].id);
                setDadosRotina && setDadosRotina({
                    ...dadosRotina,
                    parceiro: {
                        id: resultado[selectIndex].id,
                        descricao: resultado[selectIndex].nome
                    }
                })
                onClose();
                focoCampoSeguinte();
                setParceiroAlterado(true);
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
                {users.length === 0 && carregado === false ? (
                    <Loading/>
                ) : users.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
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
                        </table>
                        <div style={{height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold"}}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
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
                                {resultado.slice(0, 50).map( (user, index) => {
                                    return(
                                        <tr 
                                            key={user.id} 
                                            onClick={selecionado.bind(this, user, index)}
                                            onDoubleClick={Selected.bind(this, user)}
                                            style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                                <td>{user.id}</td>
                                                <td>{dataMask(user.data_cadastro)}</td>
                                                <td>{user.nome}</td>
                                                <td>{user.nome_fantasia}</td>
                                                <td>{cnpjMask(user.cpf_cnpj)}</td>
                                                <td>{user.endereco}</td>
                                                <td>{cepMask(user.cep)}</td>
                                                <td>{user.municipio}</td>
                                                <td>{user.telefone}</td>
                                                <td>{user.celular}</td>
                                                <td></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </C.Container>
        </C.Modal>
    );
    
};

