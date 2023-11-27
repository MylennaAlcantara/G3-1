import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading";
import * as CCL from "../consulta_cliente/consultaCliente";
import * as CF from "./consultarFuncionario";

export const ConsultarFuncionario = () => {
    const navigate = useNavigate();
    const { user, empresa, nivel, cnpjMask } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [busca, setBusca] = useState('');

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);
    const [codigoFuncionario, setCodigoFuncionario] = useState();

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    //Filtros de clientes
    const select = document.getElementById('op');
    const selectStatus = document.getElementById('status');
    const [filtroEscolhido, setFiltroEscolhido] = useState('nome');
    const [statusEscolhido, setStatusEscolhido] = useState("todos");
    const [filialEscolhido, setFilialEscolhido] = useState("0");
    const [motorista, setMotorista] = useState(false);
    const [setorEscolhido, setSetorEscolhido] = useState("0");

    const resultado5 = users.filter(item => {
        if (setorEscolhido !== "0") {
            return item.setorFuncionario.id === Number(setorEscolhido)
        } else if (setorEscolhido === "0") {
            return users;
        } else {
            return null;
        }
    });

    const resultado4 = resultado5.filter(item => {
        if (motorista === true) {
            return item.motorista
        } else if (motorista === false) {
            return resultado5;
        } else {
            return null;
        }
    });

    const resultado3 = resultado4.filter(item => {
        if (filialEscolhido !== '0' && item.filial !== null) {
            return item.filial.id === Number(filialEscolhido);
        } else if (filialEscolhido === "0") {
            return resultado4;
        } else {
            return null;
        }
    });

    const resultado2 = resultado3.filter(item => {
        if (statusEscolhido !== "todos") {
            return item.ativo === statusEscolhido;
        } else if (statusEscolhido === "todos") {
            return resultado3;
        } else {
            return null;
        }
    });

    const resultado = Array.isArray(resultado2) && resultado2.filter((user) => {
        if (filtroEscolhido === 'codigo') {
            return String(user.id).toLowerCase().includes(busca);
        } else if (filtroEscolhido === 'nome') {
            return user.nome.toLowerCase().includes(busca);
        } else if (filtroEscolhido === 'municipio') {
            return user.municipio.toLowerCase().includes(busca);
        } else if (filtroEscolhido === 'cpf') {
            return user.cpf.toLowerCase().includes(busca);
        } else {
            return null;
        }
    });

    async function fetchData() {
        const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL + "/user/all");
        const data = await response.json();
        setUsers(data);
        if (response.status === 200) {
            setCarregado(true);
        }
    }
    async function fetchDataEmpresas() {
        const response = await fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR + "/emitente/all");
        const data = await response.json();
        setEmpresas(data);
    }
    async function fetchDataSetores() {
        const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL + "/setorFuncionario/all");
        const data = await response.json();
        setSetores(data);
    }
    useEffect(() => {
        fetchData();
        fetchDataEmpresas();
        fetchDataSetores();
        document.getElementById('search').focus();
    }, []);

    function filtroTipo() {
        if (select.value === '1') {
            setFiltroEscolhido('nome');
        } else if (select.value === "2") {
            setFiltroEscolhido('codigo');
        } else if (select.value === '3') {
            setFiltroEscolhido('municipio');
        } else if (select.value === '4') {
            setFiltroEscolhido('cpf');
        }
    }

    function filtroStatus() {
        if (selectStatus.value === '0') {
            setStatusEscolhido('todos');
        } else if (selectStatus.value === "1") {
            setStatusEscolhido(true);
        } else if (selectStatus.value === '2') {
            setStatusEscolhido(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            e.preventDefault();
            if (selectIndex === null || selectIndex === 0) {
                return;
            }
            setSelectIndex(selectIndex - 1);
        } else if (e.keyCode === 40) {
            e.preventDefault();
            if (selectIndex === null || selectIndex === users.length - 1) {
                return;
            }
            setSelectIndex(selectIndex + 1);
        } else if (e.keyCode === 13){
            e.preventDefault();
            if(users.length === 0 ){
                fetchData();
            }else{
                selecionado(resultado[selectIndex], selectIndex);
                abrirEditar();
            }
        }
    };

    const selecionado = (user, index) => {
        setCodigoFuncionario(user.id);
        localStorage.setItem('idFuncionario', user.id);
        setSelectIndex(index);
    }

    const abrirEditar = async () => {
        if (nivel.cadastro_funcionario_editar) {
            if (codigoFuncionario === undefined) {
                console.log('nenhum cliente selecionado')
            } else {
                console.log(codigoFuncionario)
                navigate(`/editarFuncionario/${codigoFuncionario}`);
            }
        } else {
            alert("Nivel de acesso negado!");
        }
    }

    const novo = () => {
        if (nivel.cadastro_funcionario_incluir) {
            navigate('/cadastrarFuncionario');
        } else {
            alert("Nivel de acesso negado!");
        }
    }

    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Funcionários</h3>
            </C.Header>
            <CF.Filtro>
                <div>
                    <select className="empresa" id="filial" onChange={(e) => setFilialEscolhido(e.target.value)}>
                        <option value="0"> 0 - TODAS</option>
                        {empresas.map((empresa) => {
                            return <option value={empresa.id} key={empresa.id}>{empresa.id} - {empresa.razao_social}</option>
                        })}
                    </select>
                    <input type="checkbox" onChange={() => setMotorista(!motorista)} />
                    <label>Motorista</label>
                    <label>Setor: </label>
                    <select className="setor-status" onChange={(e) => setSetorEscolhido(e.target.value)}>
                        <option value="0"> 0 - Todos</option>
                        {setores.map((setor) => {
                            return <option value={setor.id} key={setor.id}>{setor.id} - {setor.descricao}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select id="op" onChange={filtroTipo}>
                        <option value="1">Nome</option>
                        <option value="2">Código</option>
                        <option value="3">Municipio</option>
                        <option value="4">CPF</option>
                    </select>
                    <input className="search" id="search" placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    <label>Status: </label>
                    <select className="setor-status" id="status" onChange={filtroStatus}>
                        <option value="0">TODOS</option>
                        <option value="1">Ativo</option>
                        <option value="2">Desativado</option>
                    </select>
                </div>
            </CF.Filtro>
            <CCL.Lista>
                {users.length === 0 ? (
                    <Loading />
                ) : users.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table" ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Fone</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold" }}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0} style={{ margin: "0" }}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Fone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map((user, index) => {
                                    return (
                                        <tr key={user.id}
                                            onClick={selecionado.bind(this, user, index)}
                                            onDoubleClick={abrirEditar}
                                            style={{ background: index === selectIndex ? '#87CEFA' : '' }}>
                                            <td>{user.id}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.telefone}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img alt="" src="/images/add.png" />Novo</button>
                    <button onClick={abrirEditar}><img alt="" src="/images/abrir.png" />Abrir</button>
                    <button onClick={() => navigate('/home')}><img alt="" src="/images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}