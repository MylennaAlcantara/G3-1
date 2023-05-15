import React, { useContext, useEffect, useRef, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CF from "./consultarFuncionario";
import * as CCL from "../consulta_cliente/consultaCliente";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import {Loading} from "../../loading";

export const ConsultarFuncionario = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [busca, setBusca] = useState('');
    const {user, empresa, nivel, cnpjMask} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/user/all");
            const data = await response.json();
            setUsers(data);
        }
        async function fetchDataEmpresas (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2005/emitente/all");
            const data = await response.json();
            setEmpresas(data);
        }
        async function fetchDataSetores (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/all");
            const data = await response.json();
            setSetores(data);
        }
            fetchData();
            fetchDataEmpresas();
            fetchDataSetores();
            document.getElementById('search').focus();
    }, []);

    //Filtros de clientes
    const select = document.getElementById('op');
    const selectStatus = document.getElementById('status');
    const [filtroEscolhido, setFiltroEscolhido] = useState('nome');
    const [statusEscolhido, setStatusEscolhido] = useState("todos");
    const [filialEscolhido, setFilialEscolhido] = useState("0");
    const [motorista, setMotorista] = useState(false);
    const [setorEscolhido, setSetorEscolhido] = useState("0");

    function filtroTipo (){
        if(select.value === '1'){
            setFiltroEscolhido('nome');
        }else if(select.value === "2"){
            setFiltroEscolhido('codigo');
        }else if(select.value === '3'){
            setFiltroEscolhido('municipio');
        }else if(select.value === '4'){
            setFiltroEscolhido('cpf');
        }
    }
    function filtroStatus (){
        if(selectStatus.value === '0'){
            setStatusEscolhido('todos');
        }else if(selectStatus.value === "1"){
            setStatusEscolhido(true);
        }else if(selectStatus.value === '2'){
            setStatusEscolhido(false);
        }
    }

    const resultado5 = users.filter(item=>{
        if(setorEscolhido != "0"){
            return item.setorFuncionario.id === Number(setorEscolhido)
        }else if(setorEscolhido === "0"){
            return users;
        }
    })
    const resultado4 = resultado5.filter(item => {
        if(motorista=== true){
            return item.motorista
        }else if(motorista === false){
            return resultado5;
        }
    })
    const resultado3 = resultado4.filter(item=> {
        if(filialEscolhido != '0' && item.filial != null ){
            return item.filial.id === Number(filialEscolhido);
        }else if(filialEscolhido=== "0"){
            return resultado4;
        }
    })
    const resultado2 = resultado3.filter(item=> {
        if(statusEscolhido != "todos"){
            return item.ativo === statusEscolhido;
        }else if(statusEscolhido === "todos"){
            return resultado3;
        }
    })

    const resultado = Array.isArray(resultado2) && resultado2.filter((user) => {
        if(filtroEscolhido === 'codigo' ){
            return String(user.id).toLowerCase().includes(busca);
        }else if(filtroEscolhido === 'nome'){
            return user.nome.toLowerCase().includes(busca);
        }else if(filtroEscolhido === 'municipio'){
            return user.municipio.toLowerCase().includes(busca);
        }else if(filtroEscolhido === 'cpf'){
            return user.cpf.toLowerCase().includes(busca);
        }
    });

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
        if(nivel.cadastro_funcionario_editar){
            const responseFuncionario = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/user/${codigoFuncionario}`);
            const cliente = await responseFuncionario.json();
            if(codigoFuncionario === undefined){
                console.log('nenhum cliente selecionado')
            }else{
                navigate(`/editarFuncionario/${codigoFuncionario}`);
            }
        }else{
            alert("Nivel de acesso negado!");
        }
    }
    
    const novo = () => {
        if(nivel.cadastro_funcionario_incluir){
            navigate('/cadastrarFuncionario');
        }else{
            alert("Nivel de acesso negado!");
        }
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Funcionários</h3>
            </C.Header>
            <CF.Filtro>
                <div>
                    <select className="empresa" id="filial" onChange={(e)=> setFilialEscolhido(e.target.value)}>
                        <option value="0"> 0 - TODAS</option>
                        {empresas.map((empresa)=> {
                            return <option value={empresa.id}>{empresa.id} - {empresa.razao_social}</option>
                        })}
                    </select>
                    <input type="checkbox" onChange={()=> setMotorista(!motorista)}/>
                    <label>Motorista</label>
                    <label>Setor: </label>
                    <select className="setor-status" onChange={(e)=> setSetorEscolhido(e.target.value)}>
                        <option value="0"> 0 - Todos</option>
                        {setores.map((setor)=>{
                            return <option value={setor.id}>{setor.id} - {setor.descricao}</option>
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
                    <input className="search" id="search" placeholder="Buscar..." value={busca} onChange={(e)=> setBusca(e.target.value)}/>
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
                    <Loading/>
                ) : (
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
                                {resultado.map( (user, index) => {
                                    return(
                                        <tr key={user.id}
                                            onClick={selecionado.bind(this, user, index)}
                                            style={{background: index === selectIndex ? '#87CEFA' : ''}}>
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
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                    <button onClick={()=> navigate('/home')}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}