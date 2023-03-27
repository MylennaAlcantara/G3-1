import React, { useContext, useEffect, useState } from "react";
import * as M from "../../modais/modal/modal";
import * as C from "../../cadastro/cadastro";
import * as CCL from "./consultaCliente";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/authContext";

export const ConsultarCliente = () => {
    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('nome');
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/clientes");
            const data = await response.json();
            setUsers(data);
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
            return user.id === Number(busca);
        }else if(filtro === 'municipio'){
            return user.municipio.toLowerCase().includes(busca);
        }else if(filtro === 'cpf'){
            return user.cpf_cnpj === Number(busca);
        }else if(filtro === 'nome'){
            return user.nome.toLowerCase().includes(busca);
        }else if(filtro === 'nome_fantasia'){
            return user.species.toLowerCase().includes(busca);
        }else if(filtro === 'rg'){
            return user.rg === Number(busca);
        }
    });

    const novo = () => {
        navigate('/cadastrarCliente')
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(         
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
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
                <div className="table-responsive">
                    <table id="table">
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
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.data_cadastro}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.nome_fantasia}</td>
                                        <td>{user.cpf_cnpj}</td>
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
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="/images/add.png"/>Novo</button>
                    <button><img src="/images/abrir.png"/>Abrir</button>
                    <button><img src="/images/voltar.png"/>Fechar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}