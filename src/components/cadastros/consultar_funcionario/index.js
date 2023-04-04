import React, { useContext, useEffect, useRef, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CF from "./consultarFuncionario";
import * as CCL from "../consulta_cliente/consultaCliente";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";

export const ConsultarFuncionario = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');
    const {user, empresa} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/user/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(1);
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
            if(selectIndex === null || selectIndex === users.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }
    };

    const [codigoFuncionario, setCodigoFuncionario] = useState();
    const selecionado = (user, index) => {
        setCodigoFuncionario(user.id);
        localStorage.setItem('idFuncionario', user.id);
        setSelectIndex(index);
    }

    const abrirEditar = async() => {
        const responseFuncionario = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/user/${codigoFuncionario}`);
        const cliente = await responseFuncionario.json();
        if(codigoFuncionario === undefined){
            console.log('nenhum cliente selecionado')
        }else{
            navigate(`/editarFuncionario/${codigoFuncionario}`);
        }
    }
    
    const novo = () => {
        navigate('/cadastrarFuncionario');
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Funcionários</h3>
            </C.Header>
            <CF.Filtro>
                <div>
                    <select className="empresa">
                        <option> 0 - TODAS</option>
                    </select>
                    <input type="checkbox"/>
                    <label>Motorista</label>
                    <label>Setor: </label>
                    <select className="setor-status">
                        <option> 0 - Todos</option>
                    </select>
                </div>
                <div>
                    <select>
                        <option>Código</option>
                    </select>
                    <input className="search" id="search" placeholder="Buscar..."/>
                    <label>Status: </label>
                    <select className="setor-status">
                        <option>TODOS</option>
                    </select>
                </div>
            </CF.Filtro>
            <CCL.Lista>
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tableRef={0} style={{margin: "0"}}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Fone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map( (user, index) => {
                                return(
                                    <tr key={user.id}
                                        onClick={selecionado.bind(this, user, index)}>
                                        <td>{user.id}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.nome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                    <button><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}