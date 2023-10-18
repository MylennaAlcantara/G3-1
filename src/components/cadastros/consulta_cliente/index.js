import React, { useContext, useEffect, useRef, useState } from "react";
import * as M from "../../modais/modal/modal";
import * as C from "../../cadastro/cadastro";
import * as CCL from "./consultaCliente";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/authContext";
import { Loading } from "../../loading";

export const ConsultarCliente = ({setCliente}) => {
    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('nome');
    const navigate = useNavigate();
    const {user, empresa, nivel, cnpjMask, dataMask, cepMask} = useContext(AuthContext);

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/clientes");
            const data = await response.json();
            setUsers(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

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
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }
    };

    const [codigoCliente, setCodigoCliente] = useState();
    const selecionado = (user, index) => {
        setCliente(user.id);
        setCodigoCliente(user.id);
        localStorage.setItem('idCliente', user.id);
        setSelectIndex(index);
    }
    const abrirEditar = async() => {
        if(nivel.cadastro_cliente_editar){
            const responseCliente = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+`/clientes/${codigoCliente}`); //http://10.0.1.10:8091/preVenda/id
            const cliente = await responseCliente.json();
            if(codigoCliente === undefined){
                console.log('nenhum cliente selecionado')
            }else{
            navigate(`/editarCliente/${codigoCliente}`);
            }
        }else{
            alert('Nivel de acesso negado!');
        }
    }
    const novo = () => {
        if(nivel.cadastro_cliente_incluir){
            navigate('/cadastrarCliente');
        }else{
            alert('Nivel de acesso negado!');
        }
    }

    return(         
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Clientes</h3>
            </C.Header>
            <M.Filtro>
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
                    <input className="search" id="search" onChange={e => setBusca(e.target.value)}/>
                </div>                    
            </M.Filtro>
            <CCL.Lista>
                {users.length == 0  && carregado === false ? (
                    <Loading/>
                ) : users.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tableRef={0}>
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
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tableRef={0}>
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
                                {Array.isArray(resultado) && resultado.map( (user, index) => {
                                    return(
                                        <tr key={user.id} onClick={selecionado.bind(this, user, index)} style={{background: index === selectIndex ? '#87CEFA' : ''}}>
                                            <td>{user.id}</td>
                                            <td>{dataMask(user.data_cadastro)}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.nome_fantasia}</td>
                                            <td>{cnpjMask(user.cpf_cnpj)}</td>
                                            <td>{user.endereco}</td>
                                            <td>{user.cep}</td>
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
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                    <button onClick={()=> navigate('/home')}><img src="/images/voltar.png"/>Fechar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}